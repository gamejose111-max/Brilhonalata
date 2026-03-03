# Brilho na Lata - Guia de Deploy

Este projeto é um site profissional de estética automotiva (polimento e pintura) em Cascais, construído com Next.js 15 e Firebase.

## Como colocar o site no ar (Grátis)

Para colocar este site online e acessível para seus clientes, siga estes passos:

### 1. Preparar o código no GitHub
O Firebase App Hosting precisa que seu código esteja no GitHub para funcionar automaticamente.
1. Crie uma conta no [GitHub](https://github.com) se não tiver uma.
2. Crie um novo repositório chamado `brilho-na-lata`.
3. Suba os arquivos deste projeto para lá.

### 2. Configurar o Firebase App Hosting
Você pode fazer isso pelo navegador do seu celular ou computador:
1. Vá para o [Console do Firebase](https://console.firebase.google.com/).
2. Selecione o seu projeto.
3. No menu lateral, vá em **Construir (Build)** > **App Hosting**.
4. Clique em "Começar" e conecte sua conta do GitHub.
5. Escolha o repositório `brilho-na-lata` e a ramificação (geralmente `main`).
6. O Firebase criará automaticamente um link (URL) para o seu site.

### 3. Configurar Variáveis de Ambiente
Se você estiver usando o Google Gemini para a IA de recomendação:
1. No painel do App Hosting, vá em "Configurações".
2. Adicione uma variável chamada `GEMINI_API_KEY` com a sua chave da API do Google AI Studio.

## Gerenciando pelo Celular
- **Atualizações:** Sempre que você fizer uma mudança no código e enviar para o GitHub, o site atualizará sozinho em alguns minutos.
- **Admin:** Acesse `seusite.com/login` para ver os agendamentos.
- **WhatsApp:** Você pode adicionar um botão de link direto para o seu WhatsApp nas configurações.

---
Desenvolvido para Brilho na Lata - Cascais, Portugal.
# brilho-na-lata
