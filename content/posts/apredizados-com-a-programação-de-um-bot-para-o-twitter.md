---
title: Apredizados com a programação de um bot para o Twitter
date: 2021-04-13T14:49:16.800Z
categories:
  - Relatórios
  - Relatos
  - Twitter
tags:
  - twitter
  - bot
  - protestant-bot
  - problemas
keywords:
  - api
  - twitter
  - bot
  - reforma
  - protestante
  - páscoa
  - lutero
  - governo
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

Nessa fase, a estratégia adotada era chamar a API de tempos em tempos e começar a dar RT, exceto se o limite fosse estourado, onde o post era enviado para a fila, de onde era retirado após o devido recompartilhamento.

De certa forma, nessa primeira parte o bot funcionou relativamente bem, fazendo com que os retweets acontecessem normalmente, sem estourar o limite da API.

## Primeira leva de melhorias

No começo de novembro, uma das primeiras providências foi implementar, através do endpoint de stream de dados, um esquema para compartilhar os tweets assim que eles entrassem pelas regras configuradas na API do Twitter (hashtags ou termos).

A API deixa bem explícita que somente uma conexão ao endpoint de stream deve ser feito. Como bot se conecta de tempos em tempos, foi criada uma classe com o padrão Singleton. Caso já houvesse uma conexão ativa com o endpoint, ela seria retornada. Caso não, inicializaria a conexão e armazenaria numa propriedade estática.

Junto disso, foi criada uma classe pra tratar do funcionamento do rate limit localmente, de forma a não ficar acessando o endpoint somente para consultar essa informação.

Foi criada uma classe para trabalhar com lista de bloqueio, para garantir a privacidade daqueles que não queiram ter seus posts compartilhados pelo bot. Anteriormente, a única forma do bot não compartilhar os tweets de alguém seria se essa pessoa tivesse a conta protegida/trancada ou se ela bloqueasse a conta do robô.

Então veio a primeira prova de fogo: a Páscoa.

## Problemas na Páscoa

No Domingo de Páscoa, o bot foi colocado no ar novamente. Entre quinta e sábado, trabalhei em alguns bugs que ficaram pendentes em dezembro e, na madrugada de domingo, já próximo ao horário em que a tradição indica a ressurreição de Jesus, o sistema estava em funcionamento completo.

Algumas tags foram escolhidas para esse trabalho:

* \#JesusEstaVivo
* \#Ressurreicao
* \#Ressuscitou
* \#EleVive
* \#JesusVive
* \#JesusRessuscitou
* \#NaoEstaMaisAqui
* \#DomingoDaRessurreicao
* \#RessurectionSunday
* \#EleEstaVivo
* \#FelizPascoa

Daí surgiram as dificuldades. Enquanto ainda era de madrugada, não houveram tantas ocorrências. Mas a medida que o dia foi amanhecendo, elas foram surgindo.

A dificuldade que mais apareceu num primeiro momento foram as famigeradas fancams: posts que não tem nada a ver com o assunto da tag, que tem outras tags junto e que tem o único objetivo de dar views em um vídeo aleatório, geralmente de uma pessoa famosa, banda ou série.

Mas elas não seriam nada com o tsunami que estaria por vir: os bots pró-governo.

- - -

> Atenção: Nesse ponto, eu vou falar mal do governo. Se você discorda de toda e qualquer crítica possível ao governo federal, pule para a próxima seção, sem passar por aqui.

- - -

Não é segredo pra ninguém que no Twitter há milhares de bots falando sobre o mesmo tema, de forma a dar uma sensação de bolha e de apoio aos temas prioritários ao governo. Também não é segredo pra ninguém que estes mesmos bots se utilizam de uma ou duas tags que estão em alta para divulgar essas pautas, o que acaba inflando artificialmente os números de pessoas que possam participar dessas conversas (além do SPAM).

Assim, conforme o dia foi amanhecendo, tweets do mundo inteiro foram sendo retweetados pelo bot. Mas havia um certo *bullying* com uma das tags, a "**\#JesusVive**", muitas das quais pediam intervenção militar, continham palavras de ordem de apoio ao governo e que nada tinham a ver com a Páscoa.

Nesse momento, a atitude tomada foi a de retirar aquela tag. Isso fez cair MUITO a quantidade de conteúdo que considero inadequado. Aquilo que acabou sendo retweetado, foi desfeito (manualmente, pela interface web do Twitter).

Além disso, nessa atualização implementada, foi criada uma rotina que consulta periodicamente o endpoint de rate limit da API, para garantir que realmente os tweets vão para a fila caso o limite tenha sido atingido.

Mas a vida... Ah, a vida, essa, sim, é uma caixinha de surpresas! E na manhã daquele domingo, as chaves da API foram bloqueadas, por excesso de tweets (2.300).

Mas, enquanto escrevo esse artigo (final de abril de 2021), não há nem 1200 tweets feitos. Mesmo se fossem colocados de volta os retweets de conteúdo duvidoso, teria, no máximo, 1500 tweets. Então, qual foi o problema?

Acredito que tenha sido as requisições em paralelo com o endpoint de limites da API, que pela manhã estava executando a cada 10 segundos.

Sendo assim, uma correção foi executada na hora, de aumentar o tempo entre essas requisições. De todo modo, a conta do bot estaria bloqueada por cerca de 3 a 4 horas. E ainda eram 8h30m da manhã.

Desliguei o bot e fui dormir, já que passei a noite trabalhando para garantir que o sistema desse os retweets.

Meio-dia, religuei o bot, que foi travado novamente antes das 13h. Desligado. Após novos reajustes, servidor reativado às 15h, dessa vez sem bloqueios. O bot funcionou normalmente até às 20h, quando o sistema foi fechado manualmente.

## Lições aprendidas 2

Agora, o que aprendi com essa nova entrada em funcionamento?

* Monitore (ainda mais) ativamente o uso do bot
* Tenha uma tag exclusiva ou de conteúdo confiável
* Avalie servidores com antecedência, para não precisar rodar no ambiente local (ou seja, dependente de serviço de internet residencial e de que o computador continue funcionando corretamente)

## Próximos passos

Nesse momento, o bot está parado para manutenção (o que impediu o uso com a tag **\#AzusaDay**, em comemoração ao avivamento pentecostal na Rua Azusa).

Entre as melhorias previstas, estão:

* Implementar o Design Pattern "Filter". O objetivo é que somente tweets que correspondam a determinados critérios (além dos enviados à API) sejam retweetados ou enfileirados
* Enfileirar tweets recebidos por stream por padrão. Assim, os tweets serão executados a cada período, conforme a fila disponível. O objetivo é diminuir a quantidade de requisições à API do Twitter, para evitar novos bloqueios
* Bloqueio de usuários por administrador. Se um usuário for bloqueado por um administrador (ou seja, para que seu conteúdo não seja repostado pelo bot), a ideia é que o usuário não consiga se auto-desbloquear, diferente da funcionalidade padrão, que é permitir o bloqueio e debloqueio em auto-atendimento
* Desfazer retweets pelo próprio bot. O ponto central é não precisar sair de dentro do bot para monitorar as interações e apagar conteúdos impróprios, segundo os termos de uso ou segundo o critério do administrador responsável no momento.
* Mostrar, quase em tempo real, os retweets feitos pelo bot na interface
* Atualizar o pacote que cuida do stream de conteúdo atualmente, para suportar a versão 2 da API do Twitter. Mesmo considerando que a API da rede social é uma porcaria, ainda assim preciso manter a conexão atualizada.
* Talvez, permitir interação do bot via DM, com respostas direto pela interface administrativa

Uma das coisas que tenho pensado se vale a pena, é mudar o bot de JavaScript puro para TypeScript, para ter tipagem estática e as vantagens dela. Mas são apenas planos, que estão ainda  em estudo e podem nem se concretizar.

## Ideias

Algo que gostaria de fazer no futuro, seria a criação de bots semelhantes, mas focados nas outras redes sociais, como Facebook, Instagram, Pinterest e, quem sabe, até mesmo no TikTok.

- - -

Muito obrigado pela sua leitura até aqui. Se você tem alguma sugestão, deixe aqui nos comentários ou mande pra mim, diretamente por uma das redes que estão disponíveis na [página principal do site](https://leocarvalho.dev).



Até mais!