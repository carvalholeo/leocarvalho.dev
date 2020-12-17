---
author: leo
categories:
- Tutorial
- Técnico
- JS
date: "2020-10-06T00:00:00Z"
image: assets/images/variaveis-ambiente.webp
tags:
- sticky
- featured
- tutorial
- seguranca
- senhas
- deploy
- ambiente
title: Usando variáveis de ambiente
---

Quando estamos aprendendo a programar, é muito comum (e até mesmo esperado) que configuremos senhas de bancos de dados e serviços diretamente no código, para facilitar a aprendizagem e testar se alguma hipótese é válida. Mas essas senhas e tokens não poderão ficar pra sempre no código.

Surge então a dúvida: "se eu não posso deixar a senha no código, como eu posso colocar as senhas pro meu sistema enxergar e começar a usar?". A resposta é: VARIÁVEIS DE AMBIENTE. Tem algumas formas de fazer isso, mas vou falar sobre como chegar à solução usando uma biblioteca disponível no NPM, chamada dotenv. Extremamente conhecida pela galera do Laravel, o dotenv é uma biblioteca que permite que nós tenhamos as senhas e chaves de acesso num arquivo específico, que não será versionado.

Considerando que você está usando GitHub, imagine o seguinte cenário: você está dando manutenção num grande site, como o Mercado Livre, por exemplo. Imagine que as senhas do banco de dados de produção estão gravadas diretamente no código, portanto acessíveis a qualquer um que baixe o repositório do GitHub. Agora imagine que, por algum descuido ou desatenção, você coloque esse código, com senhas gravadas diretamente nele, em um repositório público. Desconsiderando possíveis barreiras de proteção existentes, qualquer pessoa poderia se conectar ao banco de dados deles e, enfim, executar os famosos ```DELETE ou UPDATE sem WHERE```. Um perigo enorme e desnecessário.

Pra resolver isso, vamos desenvolver, ao longo desse código, a solução com o dotenv. Vou usar um projeto em NodeJS, usando o framework Express.

## Configuração do ambiente

Para seguir nesse artigo, é importante que você baixe o projeto da biblioteca. Além disso, precisamos ter um banco de dados configurado. Recomendo o MySQL, pois o projeto foi configurado pra ele. Caso queira outro, basta apenas mudar no arquivo ```knexfile.js``` o dialeto do seu banco de dados, dentre a lista:

 - MySQL/MariaDB (mysql)
 - PostgreSQL (pg)
 - SQL Server (mssql)
 - Oracle (oracledb)

Crie um database e coloque o nome dele dentro desse mesmo arquivo.

Dê um clone no projeto, acessando o (repositório no GitHub)[github-biblioteca]. Após, digite ```npm install``` no seu terminal, pra ele baixar as dependências. Em seguida, pra ele configurar o banco de dados, com o comando ```npm run configurar```. Para este último comando é ESSENCIAL que você esteja com o seu servidor de banco de dados rodando.

Por fim, basta digitar ```npm start```, que você deve ver uma tabela, contendo 6 livros.

## Iniciando

Na versão incial do projeto, vocês podem visualizar que o arquivo que contém as configurações de senha do banco de dados (que espero que vocês tenham alterado para refletir o ambiente de vocês no passo anterior), as senhas estão em hard-coded e, como vimos, isso pode ser um problema. Então, sem mais delongas, vamos ver como resolver isso.

A primeira etapa é instalar o pacote (dotenv)[dotenv], que no momento da publicação desse artigo, estava na versão x.x.x, de xx/xx/xxxx.

Feito isso, vamos criar, na raiz do projeto, dois arquivos com nomes parecidos:

 - .env.example
 - .env

Os dois terão conteúdo bem semelhante, com a crucial diferença que o primeiro não recebe dados reais e pode ser commitado, enquanto que o arquivo .env é colocado dentro do .gitignore e tem as senhas e dados reais do ambiente.

Como o nome sugere, o .env.example é um arquivo que deve servir de exemplo, pois os nomes das constantes que vamos definir aqui devem ser as mesmas que iremos utilizar ao longo do sistema. Podemos definir tantas variáveis quantas forem necessárias, não há um limite formal para elas.


{{< ads >}}
{{< browser-update >}}
