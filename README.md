# 🚀 Brilho na Lata - Cascais, Portugal 🇵🇹

Seu site profissional está pronto para entrar no ar! Siga este guia rápido para hospedar gratuitamente no **Netlify**.

## 🛠️ Passo 1: Configuração no Netlify (Pelo Celular)
Na tela que você abriu, preencha os campos assim:

1.  **Branch to deploy:** `main`
2.  **Base directory:** (deixe vazio)
3.  **Build command:** `npm run build`
4.  **Publish directory:** `.next` (se o Netlify pedir)

## 🤖 Passo 2: E a Inteligência Artificial (Gemini)?
Se você não conseguiu pegar a chave no Google AI Studio (por causa de erro na conta ou região), **não se preocupe**. O site foi programado para ser "inteligente":
- **Sem a chave:** O site mostrará uma mensagem profissional convidando o cliente para conversar pelo WhatsApp ou fazer um agendamento manual.
- **Com a chave:** Se conseguir a chave mais tarde, vá em **Site Settings > Environment Variables** no Netlify e adicione `GEMINI_API_KEY`. O site ativará a IA sozinho!

## 🔐 Passo 3: Configurar o Admin (Segurança)
Como usamos o Firebase para salvar os agendamentos na nuvem:
1. No Console do Firebase, vá em **Firestore Database**.
2. Crie uma coleção chamada `roles_owner`.
3. Adicione um documento onde o **ID do documento** é o seu **UID de usuário** (que você vê na aba Authentication após o primeiro login).
4. No campo, coloque `role` com o valor `owner`.

Isso garante que apenas você veja as mensagens e agendamentos dos seus clientes!

---
Desenvolvido com foco na perfeição automotiva em **Cascais**. 🏎️✨
