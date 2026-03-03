# Brilho na Lata - Guia Final de Lançamento 🚀

Este projeto é um site profissional de estética automotiva em Cascais, construído com Next.js 15 e Firebase.

## 🔑 Como pegar sua Chave da IA (Grátis)

Para que a recomendação inteligente funcione, você precisa de uma chave:

1. Acesse o **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Faça login com seu Gmail.
3. Clique em **"Create API key"**.
4. Copie o código gerado (ex: `AIza...`).

## 🌐 Como colocar o site no ar (Netlify)

Siga estes passos no Netlify:

1. **Configurações de Build:**
   - **Branch to deploy:** `main` (ou `master`)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

2. **Configuração da IA (IMPORTANTE):**
   - Clique em **"Add environment variables"**.
   - Escolha **"Add a single variable"**.
   - **Key:** `GEMINI_API_KEY`
   - **Value:** (Cole aqui a chave que você pegou no Google AI Studio).

3. **Finalizar:**
   - Clique em **"Deploy brilho-na-lata"**.

## 🛠️ Outras Opções de Hospedagem

### Opção 1: Vercel (Recomendado se o Netlify falhar)
1. Crie conta na Vercel com GitHub.
2. Importe o projeto `brilho-na-lata`.
3. Adicione a `GEMINI_API_KEY` nas "Environment Variables" antes do Deploy.

---
Desenvolvido para **Brilho na Lata - Cascais, Portugal**. O brilho que o seu carro merece!
