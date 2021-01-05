---
title: Usando a diretiva Do Not Track
date: '2021-01-04T19:08:07-03:00'
categories:
  - Privacidade
  - Segurança
tags:
  - do not track
  - don't track
  - dnt
  - tutorial
autoThumbnailImage: false
thumbnailImagePosition: right
thumbnailImage: /images/uploads/privacy.jpg
coverImage: /images/uploads/privacy.jpg
---
Estamos na era dos dados. Eles são considerados o [novo petróleo](https://cio.com.br/tendencias/se-os-dados-sao-o-novo-petroleo-o-que-voce-esta-fazendo-com-sua-fonte-de-riqueza), o [ouro digital](https://tiinside.com.br/17/07/2019/o-ouro-da-era-digital-os-dados/). Basta dar uma olhada mais com mais rigor no que é carregado pelos sites para fazer rastreamento.

No entanto, também estamos na era da proteção dos dados. No Brasil, está em vigor a [LGPD](https://www.lgpdbrasil.com.br/) (Lei Geral de Proteção de Dados), assim como outros dispositivos legais. Já na Europa, há a [GDPR](https://gdpr-info.eu/) (General Data Protection Regulation — Regulamento Geral sobre a Proteção de Dados), bem como a [CCPA](https://oag.ca.gov/privacy/ccpa) (California Consumer Privacy Act — Lei de Privacidade do Consumidor da Califórnia), do estado americano da Califórnia. Estes têm um objetivo em comum: dar ao usuário o poder de proteger seus dados pessoais.

Por isso, é essencial (ética e legalmente falando) que o usuário seja informado sobre o que você está fazendo no dispositivo dele e PEÇA autorização.

> "Mas Léo, não basta colocar um modal na tela pedindo pra ele confirmar os cookies?"

Sim e não.

Sim, porque você precisa avisá-lo disso. Como desenvolvedor, você não pode sair colocando cookies e armazenando dados se o usuário não permitir. E a responsabilidade de indicar que o usuário te autorizou é sua: você que precisa provar isso, não o usuário provar que não permitiu (presume-se que ele não autorizou nada, já que a LGPD determina que todas as configurações de privacidade venham habilitadas por padrão).

E não, porque você precisa confirmar, via código, que o navegador do usuário, se ele deseja ser rastreado ou não e, somente após isso, verificar se pode ou não ter permissão de rastrear o usuário.

Existem algumas formas de você tratar a privacidade do usuário. Nesse artigo, vamos falar sobre o [Do Not Track](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT). Em breve, pretendo escrever sobre o [Tk](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Tk).

## Entendendo o Do Not Track

O "Do Not Track" (DNT) é um cabeçalho de requisição, disponível no navegador do usuário. Para acessá-lo, usamos o objeto global _navigator_, que tem todas as propriedades do navegador.

Em sua implementação, o DNT tem três valores possíveis:

* **0** (zero/false): indica que o usuário PERMITE o rastreamento, e os cookies de personalização podem ser usados à vontade;
* **1** (um/true): indica que o usuário NÃO PERMITE o rastreamento, e os cookies não devem ser colocados no dispositivo do mesmo;
* **null**: indica que nenhuma preferência foi expressa pelo usuário. De acordo com as leis atuais, você deve entender isso como se o usuário NÃO PERMITISSE os cookies personalizados.
