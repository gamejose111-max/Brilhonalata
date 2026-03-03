# 🚀 Brilho na Lata - Cascais, Portugal 🇵🇹

O seu site profissional está pronto para ser publicado! Recomendamos a **Vercel** por ser a plataforma mais rápida e simples para este projeto.

## 🛠️ Passo 1: Publicar na Vercel (Pelo Telemóvel)
1.  Aceda a [vercel.com](https://vercel.com) e entre com a sua conta do **GitHub**.
2.  Clique em **"Add New"** e depois em **"Project"**.
3.  Encontre o seu repositório `brilho-na-lata` e clique em **"Import"**.
4.  **Não precisa de preencher nada!** A Vercel já sabe que é um site Next.js.
5.  (Opcional) Se tiver a chave da IA, abra a seção **"Environment Variables"**, coloque `GEMINI_API_KEY` no nome e cole o seu código no valor.
6.  Clique em **"Deploy"** e aguarde 2 minutos. O site estará online com um link seguro!

## 🤖 Passo 2: E a Inteligência Artificial (Gemini)?
Se não conseguiu a chave no Google AI Studio (por erro de conta ou região), **não se preocupe**:
- **Sem a chave:** O site deteta a ausência e mostra automaticamente um botão profissional convidando o cliente para o WhatsApp ou agendamento manual.
- **Com a chave:** Se conseguir a chave mais tarde, vá às definições do projeto na Vercel, adicione `GEMINI_API_KEY` e faça um novo deploy.

## 🔐 Passo 3: Configurar o Admin (Segurança do Firestore)
Como usamos o Firebase para salvar os agendamentos na nuvem:
1.  No Console do Firebase, vá a **Firestore Database**.
2.  Crie uma coleção chamada `roles_owner`.
3.  Adicione um documento onde o **ID do documento** é o seu **UID de utilizador** (visível na aba Authentication após o seu primeiro login).
4.  No campo, coloque `role` com o valor `owner`.

Isso garante que apenas o dono do "Brilho na Lata" consiga gerir os agendamentos dos clientes em Cascais!

---
Desenvolvido com foco na perfeição automotiva. 🏎️✨
