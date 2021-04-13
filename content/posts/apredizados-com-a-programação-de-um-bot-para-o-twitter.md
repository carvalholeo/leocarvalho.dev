---
title: Apredizados com a programação de um bot para o Twitter
date: 2021-04-13T14:49:16.800Z
autoThumbnailImage: false
thumbnailImagePosition: top
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