# Brilho na Lata - Guia Final de Lançamento 🚀

Este projeto é um site profissional de estética automotiva em Cascais, construído com Next.js 15 e Firebase.

## Como colocar o site no ar (Netlify - Sem Cartão)

Siga estes passos conforme a tela que você está vendo:

1. **Configurações de Build:**
   - **Branch to deploy:** `main` (ou `master`)
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

2. **Configuração da IA (VARIÁVEIS DE AMBIENTE):**
   - Na tela que você está, clique em **"Add environment variables"**.
   - Escolha **"Add a single variable"**.
   - **Key:** `GEMINI_API_KEY`
   - **Value:** (Cole aqui a sua chave da Google AI Studio).
   - *Isso é necessário para que a recomendação inteligente funcione.*

3. **Finalizar:**
   - Clique no botão azul **"Deploy brilho-na-lata"**.

## Outras Opções de Hospedagem

### Opção 1: Vercel (Recomendado se o Netlify falhar)
1. Crie conta na Vercel com GitHub.
2. Importe o projeto `brilho-na-lata`.
3. Adicione a `GEMINI_API_KEY` nas "Environment Variables" antes de clicar em Deploy.

### Opção 2: Firebase App Hosting (Requer Plano Blaze/Cartão)
1. No Console do Firebase, mude para o plano **Blaze**.
2. Vá em **Build** > **App Hosting** e conecte seu GitHub.
3. Adicione a variável `GEMINI_API_KEY` nas configurações do backend.

---
Desenvolvido para **Brilho na Lata - Cascais, Portugal**. O brilho que o seu carro merece!
