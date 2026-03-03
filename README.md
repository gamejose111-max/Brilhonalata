# 🚀 Brilho na Lata - Cascais, Portugal 🇵🇹

Seu site profissional está pronto para entrar no ar! Siga este guia rápido para hospedar gratuitamente no **Netlify**.

## 🛠️ Passo 1: Como lidar com o erro no Google Studio
Se você não conseguiu pegar a chave da IA (Gemini), não se preocupe. O site foi atualizado para **não quebrar** sem ela. Ele mostrará um botão para o cliente falar consigo no WhatsApp.

Se quiser tentar novamente mais tarde:
1. Acesse: **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Use uma conta de e-mail que não seja gerenciada por pais/escola.
3. Clique em **"Create API key"**.

## 🌐 Passo 2: Publicar no Netlify (Grátis)
No Netlify, ao conectar seu projeto do GitHub, preencha assim:

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Environment Variables (Variáveis de Ambiente):**
   - **Key:** `GEMINI_API_KEY`
   - **Value:** (Sua chave do Google, se tiver. Se não tiver, pode deixar em branco por agora).

## 🔐 Passo 3: Configurar o Admin (Muito Importante!)
Como agora usamos o banco de dados do Firebase para os agendamentos:
1. No Console do Firebase, vá em **Firestore Database**.
2. Crie uma coleção chamada `roles_owner`.
3. Adicione um documento onde o **ID do documento** é o seu **UID de usuário** (que você vê na aba Authentication após fazer o primeiro login).
4. Dentro do documento, coloque um campo `role` com valor `owner`.

Isso garante que só você possa ver os agendamentos dos clientes!

---
Desenvolvido com paixão para a estética automotiva em **Cascais**. 🏎️✨
