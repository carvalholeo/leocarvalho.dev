---
title: Apredizados com a programação de um bot para o Twitter
date: 2021-04-13T14:49:16.800Z
autoThumbnailImage: false
thumbnailImagePosition: top
thumbnailImage: /images/uploads/chatbot.svg
coverImage: ""
---
Ao considerar botar um sistema em produção, ainda que para hobby, vários pontos precisam ser levantados:

* custo
* tempo de desenvolvimento
* quanto tempo vai ficar no ar
* possíveis problemas
* correção em tempo real
* aprendizado com os erros e implementação de melhorias

Nesse texto, quero mostrar, de maneira técnica e não técnica, tudo que aconteceu com um bot que eu criei para ser usado com o Twitter.

## Sobre o bot

O [Protestant Bot](https://protestantbot.leocarvalho.dev) foi criado na intenção de retweetar todas as mensagens que contivessem algum termo relacionado com Martinho Lutero e a Reforma Protestante. Isso aconteceria pra ser um ponto de encontro entre os cristãos no Twitter e surgiu após sugestão de um seguidor meu naquela rede social.

Assim, o desenvolvimento começou a ser feito na tarde do dia 30/10/2020, numa corrida contra o tempo pra concluir antes da meia-noite (que é considerado o Dia da Reforma Protestante).

Apesar de ter feito alguns RTs no próprio dia 31, eles ocorreram por meio da minha conta pessoal, que não era o objetivo (já que esse é muito mais sobre conteúdo técnico e de amizade do que religioso).

Enquanto as chaves do Twitter para a conta do bot não foram liberadas, testes foram sendo realizados na minha conta pessoal.

## Problemas enfrentados em outubro

O primeiro e maior de todos os problemas, na minha opinião, é a documentação da API do Twitter, que é extremamente ruim. E quando falo disso, estou manifestamente me referindo à forma como foi escrita, seus exemplos de código, respostas recebidas e afins.

Além disso, ela possui um rate limit, o que é padrão. Pena que não informa o limite diretamente na chamada pra um endpoint. É obrigatório consultar outro endpoint pra consultar o limite da API. Esse endpoint também possui limite de uso 🤡🤡

Sabendo que há um limite para dar um retweet, uma das primeiras providências foi criar uma fila, adicionando o tweet que bata com os critérios especificados no banco de dados. Assim, após o reset do limite, esses tweets seriam retirados da fila e retweetados normalmente.

Outra dificuldade foi o tratamento diferente entre dois pedidos idênticos de liberação de acesso à API. Enquanto na minha conta pessoal, a liberação às chaves da API foi imediata, na conta recém-criada apenas para dar os retweets, com o mesmo texto e caso de uso, houve certo 'embaraço' para a liberação. Essas chaves chegaram somente após o dia da reforma protestante.