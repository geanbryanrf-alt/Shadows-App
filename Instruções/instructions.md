# Fortaleza — Documento de Produto

## Visão Geral

Fortaleza é um web app (PWA) de recuperação de vício em pornografia para homens de 18 a 35 anos.
O protocolo do app funciona por substituição de maus hábitos por bons hábitos organizados em blocos diários.
A abordagem combina psicologia comportamental com espiritualidade católica opcional.
O modelo de negócio é freemium com assinatura Pro de R$ 19,90/mês.

A referência visual e de produto é o app "Get a Grip" (iOS) — as imagens estão anexadas.
Replique a estrutura e o estilo visual do Get a Grip, mas com as adaptações descritas aqui.

---

## Stack Obrigatória

- Framework: Next.js 14 com App Router
- Estilização: Tailwind CSS (dark mode nativo)
- Banco de dados + Auth: Supabase
- Pagamento: Mercado Pago (assinatura recorrente)
- Deploy: Vercel
- Linguagem: TypeScript em todos os arquivos
- Ícones: Lucide React
- PWA: next-pwa para notificações push e instalação no celular

---

## Identidade Visual

Paleta de cores (variáveis CSS globais):
- --bg-primary: #080c14 (fundo principal)
- --bg-card: #0f1823 (cards e modais)
- --border: #1e2d42 (bordas sutis)
- --gold: #c9a84c (destaque, XP, conquistas)
- --gold-light: #e8c870 (texto dourado claro)
- --blue-deep: #0a3060 (botões primários)
- --blue-mid: #1a5ba0 (hover)
- --red-sos: #c0392b (botão SOS)
- --text-primary: #e8e8e8
- --text-muted: #7a8a9a

Tipografia:
- Fonte principal: Inter ou system-ui
- Títulos de nível/base: uppercase, letter-spacing amplo, peso 800
- Tom geral: sério, masculino, militar — sem emojis infantis

Estética geral:
- Dark mode total, sem modo claro
- Sensação de pedra, metal, fortaleza medieval
- Transições suaves mas rápidas (150ms)
- Tela mobile-first — o app é usado no celular

---

## Estrutura do Banco de Dados (Supabase)

### Tabela: profiles
- id (uuid, FK → auth.users)
- username (text)
- created_at (timestamp)
- catholic_mode (boolean, default false)
- current_streak (integer, default 0)
- longest_streak (integer, default 0)
- total_xp (integer, default 0)
- current_level (integer, default 1)
- onboarding_complete (boolean, default false)
- time_with_problem (text)
- motivation (text)

### Tabela: habits
- id (uuid)
- name (text)
- description (text)
- pillar (enum: BODY, SPIRIT, MIND, RELATIONS)
- block (enum: MORNING, ANYTIME, NIGHT)
- xp_value (integer)
- is_sos (boolean, default false)
- catholic_only (boolean, default false)
- created_at (timestamp)

### Tabela: user_habits
- id (uuid)
- user_id (uuid, FK → profiles)
- habit_id (uuid, FK → habits)
- is_active (boolean)
- added_at (timestamp)

### Tabela: daily_checkins
- id (uuid)
- user_id (uuid, FK → profiles)
- date (date)
- completed_habit_ids (uuid[])
- xp_earned (integer)
- relapse_registered (boolean, default false)
- relapse_trigger (text, nullable)
- created_at (timestamp)

### Tabela: accountability_partners
- id (uuid)
- user_id (uuid)
- partner_email (text)
- partner_id (uuid, nullable)
- status (enum: PENDING, ACTIVE)
- created_at (timestamp)

---

## Telas e Funcionalidades

### TELA 1 — Landing Page (não autenticado)

Conteúdo:
- Logo "FORTALEZA" em tipografia bold dourada
- Tagline: "Sua vida real é o jogo agora."
- Subtítulo: "Substitua maus hábitos por bons. Construa sua fortaleza. Torne-se o homem que você quer ser."
- Botão primário: "COMEÇAR AGORA" → redireciona para onboarding
- Botão secundário: "Já tenho conta → Entrar"
- Lista rápida de features (3 itens com ícones)
- Sem imagens pesadas — deve carregar em menos de 2 segundos

---

### TELA 2 — Onboarding (5 etapas, sem autenticação ainda)

Etapa 1 — Tela de boas-vindas
- Texto: "Bem-vindo, guerreiro."
- Subtexto curto sobre o propósito do app
- Botão: "CONTINUAR"

Etapa 2 — Pergunta 1
- "Há quanto tempo isso é um problema pra você?"
- Opções (cards clicáveis): Menos de 1 ano / 1 a 3 anos / Mais de 3 anos
- Salvar resposta em estado local

Etapa 3 — Pergunta 2
- "O que te trouxe aqui hoje?"
- Campo de texto livre (textarea)
- Botão: "CONTINUAR"

Etapa 4 — Modo Católico
- Título: "Você quer ativar o Modo Católico?"
- Descrição: "Adiciona orações, santos do dia, frases de São João Paulo II e reflexões espirituais ao seu protocolo."
- Toggle visual grande com opções SIM / NÃO
- Texto pequeno: "Você pode alterar isso nas configurações a qualquer momento."

Etapa 5 — Criar Conta
- Título: "Crie sua conta para salvar seu progresso"
- Formulário: email + senha + confirmar senha
- Botão: "CRIAR CONTA E COMEÇAR"
- Link: "Já tenho conta"
- Após criar conta: salvar todos os dados do onboarding no perfil via Supabase

---

### TELA 3 — Dashboard Principal (Home)

Esta é a tela central do app. Modelar com base nas imagens do Get a Grip.

Header (fixo no topo):
- Lado esquerdo: chama de fogo + número do streak atual ("42 dias")
- Centro: nome do app "FORTALEZA"
- Lado direito: nível atual ("NÍV 5") + XP em barra pequena

Seção central — A Fortaleza:
- Arte/ilustração da fortaleza no nível atual (usar CSS art ou SVG como placeholder)
- Nome do nível em texto uppercase e bold (ex: "MURALHA")
- Barra de progresso de XP para próximo nível

Seção de progresso do dia:
- Texto: "HOJE — X/Y tarefas concluídas"
- Barra de progresso colorida (verde quando completo)

Seções de hábitos do dia (colapsáveis, idênticas ao Get a Grip):
- 🌅 ROTINA DA MANHÃ (expandida por padrão)
- ⚡ A QUALQUER HORA
- 🌙 RITUAL DA NOITE

Cada item de hábito dentro das seções:
- Checkbox quadrado à esquerda (quando marcado, linha riscada e ✓ animado)
- Nome do hábito
- XP que vai ganhar (+25 XP) em texto pequeno dourado
- Botão "..." à direita (opções: ver detalhes, remover da rotina)

Botão SOS (SEMPRE VISÍVEL):
- Fixo no rodapé, acima da navegação
- Fundo vermelho escuro (#c0392b)
- Texto: "⚠ PRECISA DE AJUDA?"
- Largura total da tela
- Nunca some, nunca é coberto por outros elementos

Bottom Navigation:
- 3 abas: Base (home) | Recursos | Perfil

---

### TELA 4 — Botão SOS (Tela de Emergência)

Acessada ao clicar em "PRECISA DE AJUDA?". Cobre a tela toda (full-screen modal).

Conteúdo:
- Título grande: "SEGURA FIRME."
- Subtítulo: "O impulso vai passar. Ele sempre passa."
- Timer visual regressivo de 10 minutos (círculo animado)
- Texto embaixo do timer: "Aguenta esses 10 minutos."

Seção de ações rápidas (escolha uma):

AÇÃO 1 — Respiração 4-7-8:
- Guia animado: círculo que expande/contrai
- Instrução: "Inspira 4s → Segura 7s → Solta 8s"
- 4 ciclos automáticos
- Feedback ao final: "Feito. Você ficou mais forte."

AÇÃO 2 — 20 Flexões:
- Contador de flexões manual (apertar para contar)
- Timer de execução
- Meta: 20 flexões

AÇÃO 3 — Rezar uma Ave Maria:
- Texto completo da oração em fonte legível
- Instrução: "Leia em voz alta, devagar."

AÇÃO 4 — Chat com IA (apenas Pro):
- Textarea para escrever o que está sentindo
- Resposta da IA via API do Claude com system prompt focado em suporte emocional masculino e espiritual
- Tom: firme, paternal, sem julgamento

Botão para fechar: "Estou bem agora" (no topo)

---

### TELA 5 — Recursos (aba central)

Dividida em abas ou seções:

PROTOCOLO DOS 90 DIAS:
- Visão geral das 13 semanas
- Cada semana tem: nome, foco da semana, hábitos recomendados, reflexão
- Semanas bloqueadas para usuários free (libera gradualmente com Pro)

Semanas do protocolo:
- Semana 1: Consciência — entender o ciclo do vício
- Semana 2: Primeiros hábitos — manhã blindada
- Semana 3: O corpo como aliado — academia, banho frio
- Semana 4: Mente ocupada — leitura, projeto pessoal
- Semana 5: Espiritualidade — oração como escudo
- Semana 6: Relações — sair do isolamento
- Semana 7: Identidade — quem você está se tornando
- Semana 8: Gatilhos — mapear e antecipar
- Semana 9: Resiliência — como lidar com recaídas
- Semana 10: Consolidação — hábitos que ficam para sempre
- Semana 11: Liderança — ajudar outros homens
- Semana 12: Gratidão — reconhecer o progresso
- Semana 13: O novo homem — plano de manutenção

BIBLIOTECA DE HÁBITOS:
- Todos os hábitos organizados por pilar (CORPO / ESPÍRITO / MENTE / RELAÇÕES)
- Usuário pode adicionar qualquer hábito à sua rotina diária
- Cada hábito tem: nome, descrição, XP, dica de execução

MODO CATÓLICO (visível apenas se ativado):
- Oração do dia (rotacionada automaticamente, banco de 30 orações)
- Santo do dia com breve bio e conexão com fortaleza interior
- Frase do dia de São João Paulo II (banco de 30 frases)
- Reflexão semanal baseada no tema da semana do protocolo

---

### TELA 6 — Perfil

Seção superior:
- Avatar com inicial do nome em círculo dourado
- Nome do usuário
- "Nível X — [Nome do Nível]" (ex: "Nível 5 — Muralha")

Estatísticas (cards em grid 2x2):
- Streak atual (dias)
- Maior streak histórico
- XP total acumulado
- Hábitos completados total

Calendário de atividade:
- Grid mensal mostrando dias com check-in (verde), recaída (vermelho), sem atividade (cinza)

Parceiro de accountability:
- Card para adicionar um parceiro via email
- Se tiver parceiro: mostra nome, nível e streak do parceiro
- Botão: "Enviar mensagem de incentivo"

Botão de recaída:
- "Registrar uma recaída" — discreto, texto pequeno, sem destaque visual excessivo
- Ao clicar: abre modal de reflexão (ver abaixo)

Configurações:
- Toggle Modo Católico
- Configurar horário de notificações
- Alterar email/senha
- Ver plano atual
- Fazer upgrade para Pro
- Sair da conta

---

### MODAL — Registro de Recaída

Acessado via botão no perfil. Não deve ser assustador ou punitivo.

Mensagem inicial:
"Isso faz parte da jornada. O que importa não é cair — é o que você faz depois."

3 campos de reflexão:
1. "O que aconteceu?" (textarea)
2. "Qual foi o gatilho?" (textarea)
3. "O que você vai fazer diferente?" (textarea)

Se modo católico ativo, adicionar:
"Lembre-se: a misericórdia de Deus é maior que qualquer queda. Considere se confessar."

Botão: "RECOMEÇAR — DIA 1"

Comportamento ao confirmar:
- Streak zerado
- XP: perde 20% do XP acumulado no nível atual (mas nunca cai de nível)
- Reflexão salva no banco para consulta futura no mapa de gatilhos

---

### TELA 7 — Paywall / Upgrade Pro

Ativado ao tentar acessar feature exclusiva.

Layout:
- Título: "FORTALEZA PRO"
- Subtítulo: "Para quem quer mudar de verdade."
- Lista de features inclusas no Pro
- Preço: R$ 19,90/mês
- Botão: "ASSINAR AGORA" → Mercado Pago
- Texto pequeno: "Cancele quando quiser."

Features do plano free (listadas no paywall):
- Contador de streak
- Check-in diário
- Botão SOS (sem IA)
- 3 hábitos por bloco

Features exclusivas Pro:
- Protocolo completo de 90 dias
- Biblioteca completa de hábitos (ilimitados)
- IA no botão SOS
- Parceiro de accountability
- Mapa de gatilhos
- Modo Católico completo
- Notificações personalizadas

---

## Sistema de Níveis e XP

Níveis da Fortaleza (baseados em dias sem recaída + XP):
1. RUÍNAS         — dias 0–7
2. ACAMPAMENTO    — dias 8–14
3. CABANA         — dias 15–21
4. TORRE          — dias 22–30
5. MURALHA        — dias 31–45
6. QUARTEL        — dias 46–60
7. FORTALEZA      — dias 61–75
8. CIDADELA       — dias 76–90
9. BASTIÃO        — dias 91–120
10. CASTELO        — dias 121+

Cada nível tem uma representação visual CSS diferente (de ruínas para castelo imponente).

XP por hábito:
- Fazer a cama: 5 XP
- Café da manhã saudável: 10 XP
- Beber 2L de água: 10 XP
- Caminhada: 15 XP
- Banho frio: 15 XP
- Dormir antes da meia-noite: 15 XP
- Leitura: 15 XP
- Oração matinal: 20 XP
- Celular fora do quarto: 20 XP
- Exame de consciência: 20 XP
- Trabalhar em projeto pessoal: 20 XP
- Academia: 25 XP
- Rezar o Terço: 30 XP
- Missa: 35 XP
- Confissão: 50 XP
- Dia completo sem recaída (bônus): 50 XP
- Sequência de 7 dias (bônus): 100 XP
- Sequência de 30 dias (bônus): 300 XP

---

## Banco de Hábitos Pré-Cadastrados

### CORPO (BODY)
1. Academia — MORNING — 25 XP — "Treino de força ou cardio. Mínimo 30 minutos."
2. Banho frio — MORNING — 15 XP — "Mínimo 3 minutos de água fria. Sem negociar."
3. Fazer a cama — MORNING — 5 XP — "Sua primeira vitória do dia. Leva 2 minutos."
4. Café da manhã saudável — MORNING — 10 XP — "Sem ultraprocessados. Proteína e gordura boa."
5. Caminhada — ANYTIME — 15 XP — "Mínimo 20 minutos ao ar livre."
6. Beber 2L de água — ANYTIME — 10 XP — "Hidratação ao longo do dia."
7. Alimentação saudável — ANYTIME — 10 XP — "Sem junk food no dia todo."
8. Celular fora do quarto — NIGHT — 20 XP — "Remove o principal gatilho físico."
9. Dormir antes da meia-noite — NIGHT — 15 XP — "Privação de sono aumenta a vulnerabilidade."
10. Alongamento noturno — NIGHT — 10 XP — "10 minutos antes de dormir."

### ESPÍRITO (SPIRIT)
11. Oração matinal — MORNING — 20 XP — "Oferecer o dia a Deus. Pode ser o Ato de Oferecimento."
12. Rezar o Terço — ANYTIME — 30 XP — "O escudo espiritual mais poderoso do dia."
13. Leitura bíblica — ANYTIME — 20 XP — "Um trecho do Evangelho do dia."
14. Missa — ANYTIME — 35 XP — "Presença física ou transmissão ao vivo."
15. Exame de consciência — NIGHT — 20 XP — "5 minutos revisando o dia com Deus."
16. Oração noturna — NIGHT — 15 XP — "Pai Nosso + Ave Maria antes de dormir."
17. Confissão — ANYTIME — 50 XP — "Sacramento da reconciliação. Recomendado semanalmente."

### MENTE (MIND)
18. Leitura (livro) — MORNING — 15 XP — "Mínimo 20 páginas. Livro físico ou e-reader."
19. Reflexão do dia — MORNING — 10 XP — "Escrever 1 intenção clara para o dia."
20. Sem redes sociais antes do meio-dia — MORNING — 20 XP — "Proteger a manhã é proteger a mente."
21. Aprender algo novo — ANYTIME — 15 XP — "Curso, vídeo educativo, artigo relevante."
22. Trabalhar em projeto pessoal — ANYTIME — 20 XP — "Foco em construir algo que importa."
23. Gratidão (3 coisas) — NIGHT — 10 XP — "Escrever 3 coisas boas que aconteceram hoje."
24. Journaling — NIGHT — 15 XP — "Registro livre dos seus pensamentos e sentimentos."

### RELAÇÕES (RELATIONS)
25. Ligar ou mandar mensagem pra alguém — ANYTIME — 10 XP — "Conexão humana real. Quebra o isolamento."
26. Ajudar alguém — ANYTIME — 15 XP — "Qualquer ato de serviço, por menor que seja."
27. Check-in com parceiro de accountability — ANYTIME — 20 XP — "Conversa honesta sobre como está indo."

---

## Notificações PWA

Horários padrão (configuráveis pelo usuário):
- 07h00 → "Bom dia, guerreiro. Sua fortaleza está esperando."
- 21h00 (se não fez check-in) → "Você ainda não completou suas tarefas hoje. Ainda dá tempo."
- Horário de risco (configurável) → "Fique firme. Você chegou longe demais para recuar agora."

---

## Integração Mercado Pago

- Usar Mercado Pago Subscriptions API
- Webhook para atualizar campo "is_pro" na tabela profiles quando pagamento confirmado
- Cancelamento: usuário perde acesso às features Pro no próximo ciclo
- Armazenar subscription_id no perfil do usuário

---

## API de IA (Claude) no Botão SOS

Endpoint interno: /api/sos-ai (POST)
System prompt para a IA:
"Você é um conselheiro masculino, firme e empático. O usuário está em momento de impulso relacionado ao vício em pornografia e precisa de suporte imediato. Responda de forma direta, sem julgamento, com tom paternal e encorajador. Se o usuário tiver modo católico ativo, você pode incluir perspectiva espiritual cristã. Máximo 3 parágrafos curtos. Nunca seja condescendente."
Adicionar campo catholic_mode no body do POST para personalizar o tom.

---

## Regras de Negócio

1. Streak zerado apenas quando o usuário REGISTRA uma recaída manualmente
2. Check-in diário não é obrigatório — hábitos podem ser marcados a qualquer hora do dia
3. Hábitos não completados no dia simplesmente não somam XP — sem punição automática
4. Botão SOS sempre visível em TODAS as telas, fixo no rodapé
5. Modo católico começa DESATIVADO — usuário ativa no onboarding ou nas configurações
6. Usuário free: acesso ao streak, SOS sem IA, máximo de 3 hábitos por bloco
7. Usuário Pro: acesso irrestrito a tudo
8. Recaída: perde 20% do XP atual (nunca cai de nível, nunca zera XP total)
9. Progresso de nível baseado em DIAS SEM RECAÍDA (critério principal) + XP como critério secundário
10. Parceiro de accountability: máximo 1 por usuário (intimidade > quantidade)