"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Habit {
    id: string; // no Supabase é UUID
    name: string;
    emoji: string;
    pillar: "SPIRIT" | "BODY" | "MIND" | "RELATIONS"; // Atualizado de acordo com schema
    completions: boolean[]; // Array de estado local (7 dias)
}

interface AppContextValue {
    // Auth
    user: User | null;
    isLoadingAuth: boolean;

    // Hábitos
    habits: Habit[];
    setHabits: (h: Habit[] | ((prev: Habit[]) => Habit[])) => void;
    toggleHabitDay: (habitId: string, dayIndex: number, dateISO: string) => void;
    addHabit: (h: { name: string; emoji: string; pillar: string; block: string; xp_value: number }) => void;
    editHabit: (id: string, updates: Partial<Habit>) => void;
    deleteHabit: (habitId: string) => void;

    // Progresso
    currentDayIndex: number;
    completedToday: number;
    totalHabits: number;
    progressToday: number;
    loadLogsForDate: (date: Date) => Promise<void>;

    // Reboot
    rebootDays: number;
    rebootStartDate: string | null;
    startReboot: () => void;
    resetReboot: () => void;

    // Onboarding
    onboardingComplete: boolean;
    completeOnboarding: (data: { age: number; faith_level: string; time_with_problem: string; motivation: string }) => Promise<void>;
    faithLevel: string | null;
    age: number | null;
    motivation: string | null;
    timeWithProblem: string | null;

    // Pilar mais fraco (para Alfred)
    weakestPillar: string;
}

// ─── Datas Auxiliares ────────────────────────────────────────────────────────
function getTodayColumnIndex(): number {
    const dayOfWeek = new Date().getDay();
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

function calcRebootDays(startDateISO: string | null): number {
    if (!startDateISO) return 0;
    const start = new Date(startDateISO);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const supabase = createClient();
    
    // Auth State
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    // Data State
    const [habits, setHabitsState] = useState<Habit[]>([]);
    const [rebootStartDate, setRebootStartDate] = useState<string | null>(null);
    const [profileId, setProfileId] = useState<string | null>(null);
    const [onboardingComplete, setOnboardingComplete] = useState<boolean>(true); // Default true para evitar flash em quem já fez
    const [faithLevel, setFaithLevel] = useState<string | null>(null);
    const [age, setAge] = useState<number | null>(null);
    const [motivation, setMotivation] = useState<string | null>(null);
    const [timeWithProblem, setTimeWithProblem] = useState<string | null>(null);

    // ─── Autenticação Inicial ────────────────────────────────────────::::
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setIsLoadingAuth(false);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    // ─── Fetching (Quando Usuário Logar) ──────────────────────────────::::
    useEffect(() => {
        if (!user) {
            setHabitsState([]);
            setRebootStartDate(null);
            return;
        }

        const loadData = async () => {
            try {
                // 1. Pegar Perfil Atual (Para Reboot e Configurações)
                let { data: profile, error: profileErr } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                // 1.5 AUTO-REPAIR: Se o perfil não existe, cria agora (Fix para contas antigas)
                if (profileErr || !profile) {
                    const { data: newProfile, error: createErr } = await supabase
                        .from('profiles')
                        .insert([
                            { 
                                id: user.id, 
                                username: user.user_metadata?.username || user.email?.split('@')[0] || 'Guerreiro' 
                            }
                        ])
                        .select()
                        .single();
                    
                    if (!createErr && newProfile) {
                        profile = newProfile;
                    }
                }

                if (profile) {
                    setProfileId(profile.id);
                    setRebootStartDate(profile.created_at); // Simplificação provisória
                    setOnboardingComplete(profile.onboarding_complete || false);
                    setFaithLevel(profile.faith_level || null);
                    setAge(profile.age || null);
                    setMotivation(profile.motivation || null);
                    setTimeWithProblem(profile.time_with_problem || null);
                }

                // 2. Pegar Hábitos Ativos do Usuário
                let { data: userHabits } = await supabase
                    .from('user_habits')
                    .select(`
                        habit_id,
                        habits (
                            id, name, emoji, pillar
                        )
                    `)
                    .eq('user_id', user.id)
                    .eq('is_active', true);

                let fetchedHabits = userHabits || [];

                // 2.5 INJEÇÃO DO HÁBITO FIXO NOFAP (RETENÇÃO)
                const hasNoFap = fetchedHabits.some((uh: any) => uh.habits?.name?.toLowerCase().includes("nofap") || uh.habits?.name?.toLowerCase().includes("retenção"));
                
                if (!hasNoFap) {
                    // Busca um NoFap global existente
                    let { data: globalNoFap } = await supabase.from('habits').select('id, name, emoji, pillar').ilike('name', '%nofap%').limit(1).single();
                    
                    // Se não existe, tenta criar
                    if (!globalNoFap) {
                        const { data: newNoFap } = await supabase.from('habits').insert({
                            name: 'NoFap (Retenção)',
                            emoji: '🛡️',
                            pillar: 'SPIRIT',
                            block: 'ANYTIME',
                            xp_value: 20
                        }).select().single();
                        globalNoFap = newNoFap;
                    }

                    if (globalNoFap) {
                        const { error: linkErr } = await supabase.from('user_habits').insert({
                            user_id: user.id,
                            habit_id: globalNoFap.id,
                            is_active: true
                        });
                        
                        if (!linkErr) {
                            (fetchedHabits as any[]).push({
                                habit_id: globalNoFap.id,
                                habits: globalNoFap
                            });
                        }
                    }
                }

                if (fetchedHabits.length > 0) {
                    const initialHabits: Habit[] = fetchedHabits.map((uh: any) => ({
                        id: uh.habits.id,
                        name: uh.habits.name,
                        emoji: uh.habits.emoji,
                        pillar: uh.habits.pillar,
                        completions: new Array(7).fill(false)
                    }));
                    
                    // Definimos os hábitos primeiro para que o pre-render mostre a lista
                    setHabitsState(initialHabits);
                    
                    // Carregamos os logs passando a lista inicial para evitar depender do estado que ainda não atualizou
                    await loadLogsForDate(new Date(), initialHabits);
                }
            } catch (error) {
                console.error("Falha ao carregar dados", error);
            }
        };

        loadData();
    }, [user, supabase]); // Removido loadLogsForDate da dependência para evitar loops se mudarmos a função

    // ─── Mutações (Optimistic UI) ────────────────────────────────────────::::
    
    // SetHaboits manual
    const setHabits = useCallback((updater: Habit[] | ((prev: Habit[]) => Habit[])) => {
        setHabitsState(updater as any);
    }, []);

    // Marcar hábito como concluído
    const toggleHabitDay = useCallback(async (habitId: string, dayIndex: number, dateISO: string) => {
        if (!user) return;
        
        // 1. Atualizar UI imediatamente
        let localStateAtMomento = false;
        
        setHabitsState(prev => prev.map(h => {
            if (h.id !== habitId) return h;
            const nc = [...h.completions];
            nc[dayIndex] = !nc[dayIndex];
            localStateAtMomento = nc[dayIndex];
            return { ...h, completions: nc };
        }));

        // 2. Tentar atualizar Banco
        try {
            if (localStateAtMomento) {
                // Inserir registro no log
                await supabase.from('daily_logs').insert({
                    user_id: user.id,
                    habit_id: habitId,
                    date: dateISO.split('T')[0],
                    completed: true,
                    completed_at: new Date().toISOString()
                });
            } else {
                // Remover registro no log
                await supabase.from('daily_logs')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('habit_id', habitId)
                    .eq('date', dateISO.split('T')[0]);
            }
        } catch (error) {
            console.error('Erro ao syncar diário.', error);
            // Reverter local em caso de falha (Rollback - Futuro)
        }
    }, [user, supabase]);

    // Criar Hábito
    const addHabit = useCallback(async (newHabit: { name: string; emoji: string; pillar: string; block: string; xp_value: number }) => {
        if (!user) return;

        // 1. Inserir Hábito Global
        const { data: insertedHabit, error: hErr } = await supabase.from('habits').insert({
            name: newHabit.name,
            emoji: newHabit.emoji,
            pillar: newHabit.pillar,
            block: newHabit.block,
            xp_value: newHabit.xp_value
        }).select().single();

        if (hErr || !insertedHabit) return console.error(hErr);

        // 2. Vincular ao usuário
        const { error: uhErr } = await supabase.from('user_habits').insert({
            user_id: user.id,
            habit_id: insertedHabit.id,
            is_active: true
        });

        if (uhErr) return console.error(uhErr);

        // 3. Update Tela (UUID local)
        setHabitsState(prev => [
            ...prev,
            { 
                id: insertedHabit.id, 
                name: insertedHabit.name, 
                emoji: insertedHabit.emoji || "✨", 
                pillar: insertedHabit.pillar as any,
                completions: new Array(7).fill(false) 
            }
        ]);
    }, [user, supabase]);

    const loadLogsForDate = useCallback(async (baseDate: Date, currentHabits?: Habit[]) => {
        if (!user) return;
        
        const dow = baseDate.getDay();
        const mondayOffset = dow === 0 ? -6 : 1 - dow;
        const monday = new Date(baseDate);
        monday.setDate(baseDate.getDate() + mondayOffset);
        monday.setHours(0, 0, 0, 0);

        const nextMonday = new Date(monday);
        nextMonday.setDate(monday.getDate() + 7);

        const { data: logs } = await supabase
            .from('daily_logs')
            .select('habit_id, date, completed')
            .eq('user_id', user.id)
            .gte('date', monday.toISOString().split('T')[0])
            .lt('date', nextMonday.toISOString().split('T')[0]);

        const logMap: Record<string, boolean[]> = {};
        logs?.forEach(log => {
            const logDate = new Date(log.date + 'T00:00:00');
            const diff = Math.floor((logDate.getTime() - monday.getTime()) / (1000 * 60 * 60 * 24));
            if (diff >= 0 && diff < 7) {
                if (!logMap[log.habit_id]) logMap[log.habit_id] = new Array(7).fill(false);
                logMap[log.habit_id][diff] = log.completed;
            }
        });

        const updater = (prev: Habit[]) => {
            const listToUse = currentHabits || prev;
            return listToUse.map(h => ({
                ...h,
                completions: logMap[h.id] || new Array(7).fill(false)
            }));
        };

        setHabitsState(updater);
    }, [user, supabase]);

    // Editar Hábito
    const editHabit = useCallback(async (id: string, updates: Partial<Habit>) => {
        if (!user) return;

        // Optimistic
        setHabitsState(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));

        // Cloud
        await supabase.from('habits').update({
            name: updates.name,
            emoji: updates.emoji,
            pillar: updates.pillar
        }).eq('id', id);
    }, [user, supabase]);

    // Deletar Hábito
    const deleteHabit = useCallback(async (id: string) => {
        if(!user) return;
        
        const habitToDel = habits.find(h => h.id === id);
        if (habitToDel && (habitToDel.name.toLowerCase().includes("nofap") || habitToDel.name.toLowerCase().includes("retenção"))) {
            return; // Bloqueia a deleção silenciosamente (Hábito Fixo)
        }
        
        // Optimistic
        setHabitsState(prev => prev.filter(h => h.id !== id));
        
        // Nuvem
        await supabase.from('user_habits')
            .update({ is_active: false })
            .eq('user_id', user.id)
            .eq('habit_id', id);

    }, [user, supabase, habits]);

    // Operações de Reboot
    const startReboot = useCallback(() => {
        // (Será expandido futuramente: requer tabela no Supabase que rastreia quedas)
        const now = new Date().toISOString();
        setRebootStartDate(now);
    }, []);

    const resetReboot = useCallback(() => {
        const now = new Date().toISOString();
        setRebootStartDate(now);
    }, []);

    // Onboarding
    const completeOnboarding = useCallback(async (data: { age: number; faith_level: string; time_with_problem: string; motivation: string }) => {
        if (!user) return;

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...data,
                    onboarding_complete: true
                })
                .eq('id', user.id);

            if (error) throw error;
            setOnboardingComplete(true);
        } catch (error) {
            console.error("Erro ao completar onboarding", error);
            throw error;
        }
    }, [user, supabase]);

    // ─── Computed ────────────────────────────────────────────────────────────
    const currentDayIndex = getTodayColumnIndex();
    const completedToday = habits.filter(h => h.completions[currentDayIndex]).length;
    const totalHabits = habits.length;
    const progressToday = totalHabits > 0 ? completedToday / totalHabits : 0;
    const rebootDays = calcRebootDays(rebootStartDate);

    // Pilar mais fraco: menor taxa de conclusão no dia de hoje
    const pillarScore = (pillar: string) => {
        const ph = habits.filter(h => h.pillar === pillar);
        if (ph.length === 0) return 1;
        return ph.filter(h => h.completions[currentDayIndex]).length / ph.length;
    };
    const pillars = ["SPIRIT", "BODY", "MIND", "RELATIONS"];
    const weakestPillar = pillars.reduce((worst, p) => pillarScore(p) < pillarScore(worst) ? p : worst, pillars[0]);

    return (
        <AppContext.Provider value={{
            user, isLoadingAuth,
            habits, setHabits, toggleHabitDay, addHabit, editHabit, deleteHabit,
            currentDayIndex, completedToday, totalHabits, progressToday, loadLogsForDate,
            rebootDays, rebootStartDate, startReboot, resetReboot,
            onboardingComplete, completeOnboarding, faithLevel, age, motivation, timeWithProblem,
            weakestPillar,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp(): AppContextValue {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp deve ser usado dentro de <AppProvider>");
    return ctx;
}
