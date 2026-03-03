# 🚀 Brilho na Lata - Guia de Lançamento (Netlify)

Seu site está pronto para Cascais! Siga estes passos finais para colocá-lo no ar de graça.

## 🔑 1. Pegar sua Chave da IA (Grátis)
A IA precisa de um "combustível" para funcionar:
1. Acesse: **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Clique em **"Create API key"**.
3. Copie o código (ex: `AIza...`).

## 🌐 2. Configurar no Netlify
Na tela de Deploy que você abriu:
1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Environment Variables (Variáveis de Ambiente):**
   - Clique em **Add variable**.
   - **Key:** `GEMINI_API_KEY`
   - **Value:** (Cole a chave que você copiou do Google).

## 🛠️ 3. Se o site der erro de "Build"
O Netlify às vezes precisa saber que é um projeto Next.js. Se o botão de Deploy não funcionar, tente a **Vercel.com**, que é automática para Next.js e também é grátis.

---
Desenvolvido para **Brilho na Lata - Cascais, Portugal**. 🇵🇹
