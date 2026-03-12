import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from './lib/supabase-server';

export async function middleware(req: NextRequest) {
    // Inicializar o cliente do Supabase que pega os cookies da requisição
    const supabase = await createClient();

    // Obter os dados do usuário autenticado a partir dos cookies
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Lógica simples de Guard de Rota:
    // 1. Se tentou acessar /login mas já está logado, manda para / (Dashboard)
    if (user && req.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // 2. Se tentou acessar qualquer coisa (Dashboard, Perfil...) sem logar, manda pro /login
    if (!user && !req.nextUrl.pathname.startsWith('/login') && !req.nextUrl.pathname.startsWith('/api') && !req.nextUrl.pathname.startsWith('/_next')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Se estiver tudo OK, deixa a requisição prosseguir    
    return NextResponse.next();
}

export const config = {
    // Aplica o middleware em todas as rotas da aplicação exceto arquivos estáticos
    matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.json|icons/).*)'],
};
