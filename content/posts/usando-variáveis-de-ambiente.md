---
title: Usando variáveis de ambiente
date: '2020-12-28T19:20:32-03:00'
categories:
  - Por onde começar
  - Segurança
tags:
  - dicas
  - segurança
  - senhas
  - ambiente
  - variáveis
autoThumbnailImage: true
thumbnailImagePosition: top
coverImage: /images/uploads/variaveis-ambiente.webp
---
Quando estamos aprendendo a programar, é muito comum (e até mesmo esperado) que configuremos senhas de bancos de dados e serviços diretamente no código, para facilitar a aprendizagem e testar se alguma hipótese é válida. Mas essas senhas e tokens não poderão ficar pra sempre no código.

Surge então a dúvida: "se eu não posso deixar a senha no código, como eu posso colocar as senhas pro meu sistema enxergar e começar a usar?". A resposta é: VARIÁVEIS DE AMBIENTE. Tem algumas formas de fazer isso, mas vou falar sobre como chegar à solução usando uma biblioteca disponível no NPM, chamada dotenv. Extremamente conhecida pela galera do Laravel, o dotenv é uma biblioteca que permite que nós tenhamos as senhas e chaves de acesso num arquivo específico, que não será versionado.

Considerando que você está usando GitHub, imagine o seguinte cenário: você está dando manutenção num grande site, como o Mercado Livre, por exemplo. Imagine que as senhas do banco de dados de produção estão gravadas diretamente no código, portanto acessíveis a qualquer um que baixe o repositório do GitHub. Agora imagine que, por algum descuido ou desatenção, você coloque esse código, com senhas gravadas diretamente nele, em um repositório público. Desconsiderando possíveis barreiras de proteção existentes, qualquer pessoa poderia se conectar ao banco de dados deles e, enfim, executar os famosos `DELETE ou UPDATE sem WHERE`. Um perigo enorme e desnecessário.

Pra resolver isso, vamos desenvolver, ao longo desse código, a solução com o dotenv. Vou usar um projeto em NodeJS, usando o framework Express.

## Configuração do ambiente

Para seguir nesse artigo, é importante que você baixe o projeto da biblioteca. Além disso, precisamos ter um banco de dados configurado. Recomendo o MySQL, pois o projeto foi configurado pra ele. Caso queira outro, basta apenas mudar no arquivo `knexfile.js` o dialeto do seu banco de dados, dentre a lista:

* MySQL/MariaDB (mysql)
* PostgreSQL (pg)
* SQL Server (mssql)
* Oracle (oracledb)

Crie um database e coloque o nome dele dentro desse mesmo arquivo.

Dê um clone no projeto, acessando o [repositório no GitHub](https://github.com/carvalholeo/biblioteca). Após, digite `npm install` no seu terminal, pra ele baixar as dependências. Em seguida, pra ele configurar o banco de dados, com o comando `npm run configurar`. Para este último comando é ESSENCIAL que você esteja com o seu servidor de banco de dados rodando.

Por fim, basta digitar `npm start`, e entrar no navegador, em <http://localhost:3000>, que você deve ver uma tabela, contendo 6 livros.

## Iniciando

Na versão incial do projeto, vocês podem visualizar que o arquivo que contém as configurações de senha do banco de dados (que espero que vocês tenham alterado para refletir o ambiente de vocês no passo anterior), as senhas estão em hard-coded e, como vimos, isso pode ser um problema. Então, sem mais delongas, vamos ver como resolver isso.

A primeira etapa é instalar o pacote [dotenv](https://www.npmjs.com/package/dotenv), que no momento da publicação desse artigo, estava na versão 8.2.0, de 08/02/2020.

Feito isso, vamos criar, na raiz do projeto, dois arquivos com nomes parecidos:

* .env.example
* .env

Os dois terão conteúdo bem semelhante, com a crucial diferença que o primeiro não recebe dados reais e pode ser commitado, enquanto que o arquivo .env é colocado dentro do .gitignore e tem as senhas e dados reais do ambiente, sendo que não é commitado **em hipótese alguma.**

Como o nome sugere, o .env.example é um arquivo que deve servir de exemplo, pois os nomes das constantes que vamos definir aqui devem ser as mesmas que iremos utilizar ao longo do sistema. Podemos definir tantas variáveis quantas forem necessárias, não há um limite para elas.

Crie um arquivo chamado `.env.example` na raiz do projeto e, em seguida, insira nele o seguinte conteúdo:

```
NODE_ENV=development
DB_CLIENT=mysql
DB_SCHEMA=biblioteca
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=
```

Para começar, fazemos uma cópia do .env.example e renomeamos para `.env`. Em seguida, fazemos as alterações para ter os dados reais do nosso ambiente.

## Primeira alteração

Sabendo-se que para pegar um valor que está no escopo do processo do servidor do Node, precisamos usar um valor, método, função ou variável global que o contenha.

Todas as variáveis de ambiente ficam dentro de `process.env` e podem ser buscadas colocando um . e usando o nome que queremos. Se você executar `console.log(process.env)` e pedir pro Node executar, verá uma quantidade imensa de informações do sistema operacional e, por enquanto, nada do que está no .env.

Vamos buscá-lo no arquivo `knexfile.js`. Antes da exportação padrão do objeto, vamos declarar algumas constantes:

```javascript
const client = process.env.DB_CLIENT; // aqui vai o dialeto, o seu tipo de banco de dados
const database = process.env.DB_SCHEMA; //coloque aqui o nome do seu banco de dados
const host = process.env.DB_HOST; //o endereço do servidor, no meu exemplo, é localhost
const username = process.env.DB_USERNAME; //o usuário do banco de dados
const password = process.env.DB_PASSWORD; //como o nome sugere, coloque a senha do usuário do banco de dados
```

Caso troque o nome das variáveis dentro do .env, lembre-se de trocar em todos os pontos do sistema que fazem uso dele.

Agora, tiramos os valores fixos de dentro do knexfile.js e colocamos as constantes que acabamos de declarar:

```javascript
module.exports = {
  development: {
    client: client,
    connection: {
      database: database,
      host: host,
      user: username,
      password: password
    }
//restante do código
```

Tem outros lugares que podemos fazer alterações, mas deixo esse desafio pra você fazer sozinho 🤭.

Se tentarmos executar esse código agora, teremos dois problemas, um aparente e outro que é mais difícil de identificar numa primeira olhada.

### Primeiro erro

O primeiro, é porque, apesar de termos configurado o .env e alterado o knexfile.js, em nenhum momento do nosso código nós dissemos pro Node que os dados do .env deveriam ser usados em algum lugar. Isso deve ser feito no arquivo principal e que vai ser carregado de início no sistema. Por que? Para que todos os pontos do código que necessitem daquelas variáveis estejam com elas disponíveis. Não apenas a importação, como a execução da função devem ser executadas o mais breve possível no sistema.

No nosso exemplo, apesar do servidor chamar o arquivo para o servidor diferente (`/bin/www`), dentro dele, o primeiro arquivo a ser chamado é o `app.js`. Sendo assim, é lá que faremos a importação/execução do dotenv.

Posso (e vou) fazer isso desde a primeira linha, para garantir que nada possa interferir na execução desse código:

```javascript
const dotenv = require('dotenv');
dotenv.config();
//resto do arquivo app.js
```

Como o arquivo .env está na raiz do nosso projeto, nenhuma configuração ou opção adicional é necessária. Agora, se você voltar ao navegador o seu código deve continuar funcionando como antes, sem nenhuma alteração aparente. Mas agora a senha do banco de dados (e qualquer outra informação sensível) não está mais disponível no código, e sim em um arquivo que não está disponível aberto à todos.

### Segundo erro

Se você seguiu esse blog até agora, não deve ter ocorrido nenhum erro. No entanto, considere os seguintes cenários:

* Ao recriar o ambiente, você esqueceu de criar o .env baseado no .env.example ou não personalizou ele;
* Alguém da sua equipe não alterou uma das variáveis de ambiente ao executar o projeto;

Por exemplo, do jeito que o projeto está atualmente, se nós não tivermos o .env no projeto, o erro que será lançado na sua cara será como se você não tivesse colocado passado os parâmetros.

Esse tipo de erro só será aparente no futuro e, acredite em mim, ele é mais difícil de localizar. Então, como podemos evitar?

Sabe as constantes que declaramos anteriormente no knexfile.js? Então, vamos fazer uma pequena alteração:

```javascript
const client = process.env.DB_CLIENT || 'mysql'; 
const database = process.env.DB_SCHEMA || 'biblioteca';
const host = process.env.DB_HOST || 'localhost'; 
const username = process.env.DB_USERNAME || 'root'; 
const password = process.env.DB_PASSWORD || '';
```

Qual a diferença? Agora, sempre que o Node não tiver as variáveis de ambiente dentro do obejto `process.env`, aqueles valores não serão nulos e não vai ter erro/exceção lançada como erro de sintaxe, mas sim de parâmetros incorretos, que facilita de sobremaneira na hora de executar processos de debug.

_"Mas Léo, com isso não deixamos novamente senha fixa no código?"_

Não, porque colocamos aqui valores padrão, iguais os que se tem no .env.example.

_"Então por que temos o .env.example?"_

Porquê lá ficam todas as variáveis espalhadas pelo sistema, enquanto o que acabamos de fazer é garantir que haja valores padrão para que, durante o processo de debug, você não fique procurando erros "inexistentes" em seu código.

## Aviso

No exemplo do projeto tem apenas variáveis do tipo `string`, então você não vai encontrar maiores dificuldades. No entanto, se você precisar os outros tipos primitivos do Javascript, como `Number` ou `Boolean`, você precisa fazer a conversão explicíta, já que quando o dotenv faz a importação das variáveis pra dentro do `process.env`, são todas colocadas como string. Tenha atenção nisso, para não causar bugs inesperados/inexplicáveis no sistema.

## Conclusão

O dotenv é um pacote opensource para ser usado com o Node.js. Mas também tem sua [versão para o PHP](https://packagist.org/packages/vlucas/phpdotenv), através do Packagist.

Ele não é essencial para colocar variáveis dentro do processo do Node, apesar de ser o mais fácil. Dentro do sistema operacional, você pode colocar atráves do PATH e das variáveis de ambiente (nos três principais, Windows, Linux e MacOS), e pegar da mesma forma dentro do código.

No Heroku, na área de configurações, você pode também inserir, uma por uma, cada variável, com seu respectivo valor.

O que não falta são alternativas ao pacote para que você não precise deixar informações sensíveis do ambiente expostas ao mundo.

Se você quiser ver o código final como ficou, no mesmo repositório tem uma branch chamada `variaveis`, contendo o código final do que concluímos aqui (e com a solução para o problema que propus para você resolver anteriormente. Basta dar um `git checkout variaveis`.
