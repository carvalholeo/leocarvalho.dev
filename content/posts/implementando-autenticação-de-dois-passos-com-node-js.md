---
title: Implementando autenticação de dois passos com Node.JS
date: 2021-03-28T04:13:04.211Z
autoThumbnailImage: false
thumbnailImagePosition: top
thumbnailImage: /images/uploads/cadeados.webp
coverImage: /images/uploads/cadeados.webp
---
No [último texto sobre segurança](https://leocarvalho.dev/posts/porque-precisamos-de-seguranca-da-informacao/), meu foco foi especificamente em como proteger os seus dados, medidas preventivas de roubo de identidade e falei sobre [autenticação de dois passos](https://leocarvalho.dev/posts/porque-precisamos-de-seguranca-da-informacao/#autentica%c3%a7%c3%a3o-de-dois-fatores).

Hoje, a ideia é implementar uma biblioteca que possa ser integrada com o framework Express, gerando códigos que se alteram a cada 30 segundos e servem como um segundo fator de autenticação.

## Índice

* Ponto 1
* Ponto 2
* Ponto 3
* Ponto 4
* Ponto 5
* Ponto 6

## Relembrando sobre autenticação

A autenticação básica, tal qual conhecemos hoje, é sempre baseada em conhecimento, ou seja, naquilo que você sabe.

Você pode usar o conhecimento como autenticação com:

* nome de usuário
* senha
* perguntas de segurança (é considerado um segundo passo, mas continua sendo uma autenticação de conhecimento)
* datas, como nascimento ou casamento
* agência e conta
* senha adicional

A autenticação baseada no que você tem pode ser uma chave física, como uma YubiKey, um app que gera códigos temporários (ponto central desse texto), código enviado por email ou SMS, um cartão/grade de segurança... Enfim, ela é baseada em **propriedade**, seja ela física ou virtual.

E por fim, mas não menos importante, temos a autenticação baseado em quem você é. Essa é baseada somente em você e geralmente precisa de hardware específico, já que é reconhecimento biométrico. Entre os disponíveis (e mais comuns), temos a impressão digital e reconhecimento facial. Existem também a leitura da íris, batimentos cardíacos, jeito de andar, timbre vocal, escaneamento das veias. Ou seja, só você.

### Lembretes

Nunca é demais lembrar que tudo tem custo. Quanto mais segurança você quer implementar, maiores esses custos ficam. E o segundo aviso: mesmo com a biometria, a autenticação não é 100% segura (já que podem ser usados moldes de silicone na impressão digital ou fotos/modelos em 3D do seu rosto).

## O que vamos utilizar

Para esse artigo, vamos utilizar o ambiente do Node, com o framework Express, para ganhar velocidade na criação do projeto e vermos algo funcional. Então, o que vamos precisar aqui é:

* [Node.js 12](https://nodejs.org/en/) ou superior (dê preferência para LTS. Eu uso a versão 14, mas a partir da versão 12 já funciona)
* [Express](https://expressjs.com/), versão 4.x
* [otplib](https://www.npmjs.com/package/otplib) (para gerar a URL que será passada via QRCode, além de verificar se o código está correto)
* [Gerador de QRCode](https://www.npmjs.com/package/qrcode)
* Aplicativo no seu smartphone para ler o QRCode e interpretar que é um código temporário. Qualquer um destes vai servir

  * [Google Authenticator](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=pt-BR)
  * [Microsoft Authenticator](https://www.microsoft.com/pt-br/account/authenticator)
  * [LastPass Authenticator](https://lastpass.com/auth/)
  * [Authy](https://authy.com/)



- - -

##### Referências

[Autenticação](https://pt.wikipedia.org/wiki/Autentica%C3%A7%C3%A3o)

[Conheça os 3 tipos de métodos de autenticação](http://segurancaemsimplesatos.com.br/blog/conheca-os-3-tipos-de-metodos-de-autenticacao)