# Brilho na Lata - Guia Final de Lançamento 🚀

Este projeto é um site profissional de estética automotiva em Cascais, construído com Next.js 15 e Firebase.

## Como colocar o site no ar AGORA

### Opção 1: Netlify (Fácil e Grátis)
Como você está usando o Netlify, preencha as configurações assim:
1. **Branch to deploy:** `main`
2. **Base directory:** (deixe em branco)
3. **Build command:** `npm run build`
4. **Publish directory:** `.next`

**⚠️ IMPORTANTE:** Vá em "Site settings" > "Environment variables" e adicione a chave `GEMINI_API_KEY` para a recomendação de IA funcionar.

### Opção 2: Firebase App Hosting (Recomendado)
1. No Console do Firebase, mude para o plano **Blaze** (fica de graça no início).
2. Vá em **Build** > **App Hosting** e conecte seu GitHub.
3. Adicione a variável `GEMINI_API_KEY` nas configurações do App Hosting.

### Opção 3: Vercel (Alternativa Grátis)
1. Conecte sua conta do GitHub na Vercel.
2. Importe o repositório `brilho-na-lata`.
3. Adicione a variável `GEMINI_API_KEY` e clique em Deploy.

## Acessar o Painel ADM
- Para ver os agendamentos: Acesse `seu-link.com/admin`.
- Faça o login com o seu e-mail e senha de administrador.

---
Desenvolvido para **Brilho na Lata - Cascais, Portugal**. O brilho que o seu carro merece!
