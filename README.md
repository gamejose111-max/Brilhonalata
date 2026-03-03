# Brilho na Lata - Guia Final de Lançamento 🚀

Este projeto é um site profissional de estética automotiva em Cascais, construído com Next.js 15 e Firebase.

## Como colocar o site no ar (Netlify - Sem Cartão)

Se o Netlify mostrar "No results found" na branch, siga estes passos:

1. **Branch to deploy:** 
   - Verifique no seu GitHub se a branch se chama `main` ou `master`.
   - Digite o nome exatamente como está lá. Se já estiver escrito `main` e ele não deixar passar, tente clicar fora do campo ou recarregar a página.
2. **Base directory:** Deixe vazio.
3. **Build command:** `npm run build`
4. **Publish directory:** `.next`

**⚠️ MUITO IMPORTANTE (IA):**
Após o deploy, a IA só funcionará se você fizer isso:
1. Vá em **Site settings** > **Environment variables**.
2. Clique em **Add a variable** > **Single variable**.
3. **Key:** `GEMINI_API_KEY`
4. **Value:** (Cole aqui a sua chave da Google AI Studio).

## Outras Opções de Hospedagem

### Opção 1: Vercel (Recomendado se o Netlify falhar)
1. Crie conta na Vercel com GitHub.
2. Importe o projeto `brilho-na-lata`.
3. Ele detecta tudo sozinho. Adicione a `GEMINI_API_KEY` nas "Environment Variables" antes de clicar em Deploy.

### Opção 2: Firebase App Hosting (Requer Plano Blaze/Cartão)
1. No Console do Firebase, mude para o plano **Blaze**.
2. Vá em **Build** > **App Hosting** e conecte seu GitHub.
3. Adicione a variável `GEMINI_API_KEY` nas configurações.

---
Desenvolvido para **Brilho na Lata - Cascais, Portugal**. O brilho que o seu carro merece!
