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
git init
git add .
git commit -m "Primeiro upload do site"
git branch -M main
# Se o comando abaixo der erro de "remote already exists", apenas pule para o próximo
git remote add origin https://github.com/SEU_USUARIO/brilho-na-lata.git
git push -u origin main
```

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

## Dicas para o Dono
- **Atualizações:** Sempre que você mudar algo no código e der um `git push`, o site atualizará sozinho em minutos.
- **Acesso Admin:** Acesse `seusite.com/admin` para ver seus agendamentos (você precisará fazer login).
- **Suporte:** Este site foi otimizado para o padrão de Cascais, Portugal (Euros e datas locais).

---
Desenvolvido para Brilho na Lata - Cascais, Portugal.# brilho-na-lata
