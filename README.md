# Brilho na Lata - Guia Final de Lançamento 🚀

Este projeto é um site profissional de estética automotiva em Cascais, construído com Next.js 15 e Firebase.

## Como colocar o site no ar AGORA

### Opção 1: Firebase App Hosting (Recomendado)
Ideal para manter tudo no Google.
1. No Console do Firebase, clique em **Fazer upgrade do projeto** para o plano **Blaze**.
   - **Fica de graça?** Sim! Para o volume de acessos inicial, ele ficará na "Cota Gratuita" e você pagará **€ 0,00**. O cartão é apenas para verificação.
2. Vá em **Build** > **App Hosting** e conecte seu repositório do GitHub.
3. Adicione a variável `GEMINI_API_KEY` nas configurações do App Hosting para a IA funcionar.

### Opção 2: Vercel (100% Grátis sem Cartão)
Se você não quer inserir dados de pagamento agora:
1. Crie uma conta em [vercel.com](https://vercel.com) usando seu GitHub.
2. Clique em **"Add New"** > **"Project"** e importe o repositório `brilho-na-lata`.
3. Em **Environment Variables**, adicione:
   - Name: `GEMINI_API_KEY`
   - Value: Sua chave da API do Google AI Studio.
4. Clique em **Deploy**.

## Acessar o Painel ADM
- Para ver os agendamentos: Acesse `seu-link.com/login`.
- Faça o login com o seu e-mail e senha de administrador.

---
Desenvolvido para **Brilho na Lata - Cascais, Portugal**. O brilho que o seu carro merece!
