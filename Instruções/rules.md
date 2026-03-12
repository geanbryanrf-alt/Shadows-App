# Regras do Agente — Projeto Fortaleza

## Regras Absolutas (nunca violar)

1. TypeScript em TODOS os arquivos — zero JavaScript puro
2. Nunca hardcodar chaves de API, URLs ou segredos — sempre em .env.local
3. Nunca usar cores fora da paleta definida em instructions.md
4. Nunca criar modo claro (light mode) — o app é dark mode total
5. Nunca usar emojis no UI exceto os já definidos nos blocos (🌅⚡🌙) e pilares (⚔️🙏📖🤝)
6. O botão SOS deve estar presente e visível em TODAS as telas autenticadas
7. Todas as chamadas ao Supabase e APIs externas devem ter try/catch
8. Todo botão que faz chamada assíncrona deve ter loading state visual

## Regras de Código

- Componentes máximo de 150 linhas — se passar, dividir em subcomponentes
- Nomeação em inglês no código (variáveis, funções, tipos)
- Textos da interface sempre em PT-BR
- Usar Supabase client via singleton em /lib/supabase.ts
- Server Components do Next.js para páginas, Client Components só onde necessário
- Hooks customizados em /hooks/ para lógica reutilizável
- Tipos TypeScript em /types/ (nunca usar "any")

## Estrutura de Arquivos

/app
  /(auth)
    /login/page.tsx
    /cadastro/page.tsx
  /(app)
    /layout.tsx          ← layout com bottom nav + botão SOS
    /page.tsx            ← dashboard principal
    /recursos/page.tsx
    /perfil/page.tsx
  /onboarding
    /page.tsx
  /api
    /sos-ai/route.ts
    /webhook/mercadopago/route.ts
/components
  /ui/                   ← componentes genéricos (Button, Card, Modal, etc)
  /habits/               ← HabitItem, HabitBlock, HabitCheckbox
  /sos/                  ← SOSButton, SOSModal, BreathingGuide, AveMariaCard
  /fortress/             ← FortressArt, LevelBadge, StreakCounter, XPBar
  /onboarding/           ← cada etapa do onboarding em componente separado
/lib
  /supabase.ts
  /mercadopago.ts
  /claude.ts
/hooks
  /useStreak.ts
  /useHabits.ts
  /useProfile.ts
/types
  /index.ts

## Regras de Design

- Mobile-first SEMPRE — começar pelo mobile, depois desktop
- Mínimo 48px de área de toque em todos os elementos interativos
- Feedback visual imediato em todo checkbox (animação de check)
- Skeleton loaders em vez de spinners para carregamento de listas
- Transições: 150ms ease-out como padrão

## Ordem de Construção (NÃO pular etapas)

FASE 1 — Fundação
  → Configurar Next.js + Tailwind + Supabase + TypeScript
  → Criar schema completo do banco de dados
  → Configurar variáveis de ambiente
  → Testar conexão com Supabase

FASE 2 — Autenticação
  → Fluxo de cadastro (onboarding 5 etapas)
  → Login / logout
  → Proteção de rotas autenticadas
  → Salvar dados do onboarding no perfil

FASE 3 — Core do App
  → Dashboard com hábitos do dia
  → Sistema de check-in (marcar hábito como concluído)
  → Cálculo de streak em tempo real
  → Sistema de XP e níveis
  → Botão SOS básico (sem IA)

FASE 4 — Features Completas
  → Tela de Recursos + Protocolo de 90 dias
  → Tela de Perfil + calendário
  → Modal de recaída
  → Parceiro de accountability

FASE 5 — Pro + Extras
  → Integração Mercado Pago
  → IA no SOS via Claude API
  → Modo Católico completo
  → PWA + notificações push

FASE 6 — Polimento
  → Animações e transições
  → Arte CSS da fortaleza por nível
  → Testes em mobile
  → Preparar deploy no Vercel
  