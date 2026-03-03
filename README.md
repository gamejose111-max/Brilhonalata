# Brilho na Lata - Guia de Deploy

Este projeto é um site profissional de estética automotiva (polimento e pintura) em Cascais, construído com Next.js 15 e Firebase.

## Como colocar o site no ar (Grátis)

Siga estes passos para colocar seu site online. Você pode fazer tudo pelo navegador do seu celular.

### 1. Preparar o código no GitHub
O Firebase App Hosting precisa que seu código esteja no GitHub para funcionar.
1. Crie uma conta no [GitHub](https://github.com).
2. Crie um novo repositório chamado `brilho-na-lata` (mantenha como **Público** para facilitar).
3. No terminal do seu estúdio, execute estes comandos exatamente nesta ordem:

```bash
# 1. Prepare os arquivos
git add .
git commit -m "Site Completo Brilho na Lata"

# 2. Defina o caminho (Se der erro de "already exists", apenas siga para o próximo passo)
git remote add origin https://github.com/SEU_USUARIO/brilho-na-lata.git

# 3. Envie para o GitHub
git push -u origin main
```

**Dica para o Erro do Print:** Se aparecer `remote origin already exists`, ignore e rode direto o `git push -u origin main`.

### 2. Configurar o Firebase App Hosting
1. Vá para o [Console do Firebase](https://console.firebase.google.com/).
2. Selecione o seu projeto.
3. No menu lateral, vá em **Construir (Build)** > **App Hosting**.
4. Clique em "Começar" e conecte sua conta do GitHub.
5. Escolha o repositório `brilho-na-lata` e a ramificação `main`.
6. O Firebase criará automaticamente um link (URL) seguro para o seu site.

### 3. Configurar Variáveis de Ambiente (IA)
Se você estiver usando a IA de recomendação:
1. No painel do App Hosting, vá em "Configurações".
2. Adicione uma variável chamada `GEMINI_API_KEY` com a sua chave da API.

---
Desenvolvido para Brilho na Lata - Cascais, Portugal.