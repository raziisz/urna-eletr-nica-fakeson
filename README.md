<h1 align="center">Urna Eletrônica Fakeson</h1>
<p align="center">Uma web solução para processamento de votos e controle.</p>

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [.Net Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1), [Node.js](https://nodejs.org/en/), [MySql8.0](https://dev.mysql.com/downloads/mysql/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Baixando projeto pelo git

```bash
# Clone este repositório em algum diretório
$ git clone <https://github.com/raziisz/urna-eletr-nica-fakeson.git>

```
### 🎲 Subindio API em .Net Core

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd backend

# Instale as dependências
$ dotnet restore

# Instale a ferramenta Entity Framework core para controle das migrations e subir banco no terminal/cmd
$ dotnet tool install --global dotnet-ef --version 3.1.3

# Acesse o arquivo appsettings.json na raiz da pasta backend com seu editor de código
$ "ConnectionStrings": {
    "DefaultConnection" : "Server=localhost; Database=urnabd; Uid=root; Pwd=123456"
  },
  na connection string altere a string connection com as credênciais de seu banco de dados Mysql

# Opcional - Para uma melhor experiência, altere o endereço de localhost para o seu ip de rede, assim compartilhando a API na sua rede.
# Acesse a pasta Properties na raiz da pasta backend e acesse o arquivo launchSettings.json
# Procure o seguinte objeto "backend" e altere o atributo applicationUrl pelo ip de rede da sua máquina, segue exemplo:
$"backend": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "weatherforecast",
      "applicationUrl": "http://172.16.13.27:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }

# Na pasta backend execute o comando no terminal para rodar as migrações e criar banco de dados urnabd no SBGD Mysql
$ dotnet ef database update

# Execute o comando no terminal para aplicação carregar em modo de desenvolvimento
$ dotnet start

# Um seed irá carregar um usuário padrão com credenciais admintest@gmail.com e senha 123456, para acesso admin de cadastro de candidatos

# O servidor inciará na porta:5000 - acesse <http://localhost:5000> 
```

### 🎲 Rodando o Web

```bash
# na pasta baixada pelo repositorio navegue no terminal/cmd
$ cd web

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000> ou ip da sua máquina na porta 3000 (melhor experiencia)
```

### 🛠 Tecnologias - WEB

As seguintes ferramentas foram usadas na construção do projeto na camada web:

- [React](https://pt-br.reactjs.org/)
- [Axios](https://github.com/axios/axios)
- [React-router-dom](https://reactrouter.com/web/guides/quick-start)
- [React-toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Material-Ui](https://material-ui.com/)


### 🛠 Tecnologias - API

As seguintes ferramentas foram usadas na construção do projeto na camada backend:

- [.NetCore](https://dotnet.microsoft.com/)
- [Entity Framework Core](https://docs.microsoft.com/pt-br/ef/)
- [Jwt](https://jwt.io/)
- [MySql](https://dev.mysql.com/downloads/mysql/)

### Autor
---

<a href="http://raziisz.github.io/">
 <img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/42245201?s=460&u=ce3bae80de213ad246855873906246051fba4458&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Luiz Felipe</b></sub></a> <a href="http://raziisz.github.io/" title="Dev">🚀</a>


Feito com ❤️ por Luiz Felipe 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Felipe-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/luiz-felipe-libertino-a87840170/)](https://www.linkedin.com/in/luiz-felipe-libertino-a87840170/) 
[![Outlook Badge](https://img.shields.io/badge/-raziel_libertino@hotmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:raziel_libertino@hotmail.com)](mailto:raziel_libertino@hotmail.com)

