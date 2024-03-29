---
title: Por que eu estou deixando o Google Analytics?
date: 2021-12-18T21:40:02.843Z
categories:
  - privacidade
  - LGPD
keywords:
  - google analytics
  - views
  - analise
  - google
  - analytics
  - dados
autoThumbnailImage: false
thumbnailImagePosition: top
coverImage: ""
---
**TL; DR:** O Google Analytics é muito invasivo, rastreia usuários em um nível obscuro; por isso estou trocando para um serviço hospedado em meu próprio servidor, que protege a privacidade e não rastreia os usuários por toda a internet.

- - -

## Introdução

“Não mate uma formiga usando um canhão”. Certamente, você já ouviu essa frase, que nos remete à nos manter simples e usar ferramentas certas nos momentos certos.

Em vários momentos, usamos serviços, sem questionarmos como as coisas estão acontecendo. Há uma velha máxima (que nem sei se concordo mais), que diz “se você não paga pelo produto, você é o produto”. Esse dito foi muito divulgado em razão dos problemas com Facebook e Google, sendo esta última empresa em que vou me ater mais nesse texto.

## Os fatos

Por muito tempo, em todos os projetos que criei (a maioria, pessoais), utilizei o Google Analytics (daqui em diante, chamarei *GA*, para facilitar) para entender o quais seriam as páginas mais acessadas, para onde eles vão, por quanto tempo permanecem nas páginas, etc.

Considero essas informações extremamente básicas. Com o apoio de ferramentas de backend, como o Wordpress, por exemplo, poderia ter acesso a algumas delas de forma muito mais fácil.

Além disso, o GA fornece detalhes extremos sobre o comportamento, além de recortes específicos dos usuários. Dá para visualizar detalhes demográficos de usuários que entram na página através de redes sociais, por exemplo.

## O problema

Se por um lado, temos muitas informações (anonimizadas, é verdade), por outro, as informações demográficas precisam ser conseguidas de alguma forma, como, por exemplo, cidade identificada, faixa etária, etc. E não fica claro, nem nos termos de uso sobre como o GA faz essa identificação dos dados.

Bom para anunciantes, que podem segmentar melhor seus anúncios; ruim para a privacidade dos usuários, que podem não querer ser segmentados de maneira tão específica (mesmo no caso do *[FLoC](https://tecnoblog.net/437966/o-que-e-floc/)* — Federated Learning of Cohorts, que cria segmentos mais “gerais”).

### Usuários querem privacidade

Evidentemente, essa afirmação é uma generalização. Mas trago dados para apoiar esta tese e não deixar que a afirmação seja baseada em “vozes da minha cabeça”.

Segundo a *[Consumer Privacy Survey](https://www.cisco.com/c/dam/global/en_uk/products/collateral/security/cybersecurity-series-2019-cps.pdf)*, da Cisco, realizada em 2019, cerca de 84% dos respondentes se preocupam com sua privacidade e querem mais controle sobre seus dados. Também, segundo a mesma pesquisa, 48% dos respondentes trocaram de fornecedor de produtos ou serviços em função de suas políticas de privacidade, ou de práticas de compartilhamento de dados.

Conforme indica a pesquisa *[Americans and Privacy: Concerned, Confused and Feeling Lack of Control Over Their Personal Information](https://www.pewresearch.org/internet/2019/11/15/americans-and-privacy-concerned-confused-and-feeling-lack-of-control-over-their-personal-information/)*, da Pew Research Center, de 2019, 79% dos participantes estão preocupados um pouco ou muito preocupados sobre como as empresas utilizam os dados coletados dos usuários. A mesma preocupação atinge 64% das pessoas quando se trata do governo usando os dados dos seus cidadãos.

Assim, podemos logicamente concluir que uma parcela significativa de cada um dos participantes das pesquisas está realmente preocupada com sua privacidade. Por consequência, é dever de todos que de alguma forma processam dados de usuários.

### Bloqueios

Dependendo do seu nível de preocupação com a quantidade de anúncios atrapalhando sua experiência de navegação, é provável que você tenha um bloqueador de anúncios. E você não está sozinho: conforme informa a [Statista](https://www.statista.com/statistics/804008/ad-blocking-reach-usage-us/), 27% dos usuários dos Estados Unidos também utilizam algum *ad blocker.*

Além dos anúncios, estas extensões para navegadores também prestam um grande serviço aos usuários, bloqueando rastreadores de acesso, como o GA, Facebook Analytics e outros clientes de *analytics*.

Então, nesse site, por exemplo, além de você não visualizar os anúncios, que estarão devidamente bloqueados, eu perdia a oportunidade de saber quais páginas estão sendo acessadas, visto que também são bloqueados. Ou seja, sem saber como melhorar o site ou o conteúdo.

## Leitor X Cliente

Indiscutivelmente, a fatia de mercado do GA é enorme. Para ser mais exato, domina 73% dos sites, segundo o [Datanyze](https://www.datanyze.com/market-share/web-analytics--1). São milhões e milhões de sites, que possuem dezenas, centenas e até mesmo milhares de pontos de coletas em cada um deles. Essa maçaroca de dados faz com que o GA seja o maior fornecedor do gênero.

Enquanto o serviço é gratuito para os usuários e donos de sites, o ditado deve ser lembrado: “não existe almoço grátis”. E não há mesmo. Todos esses dados sendo repassados para a gigante de Moutain View a torna poderosa, podendo traçar perfis extremamente precisos de grupos de usuários, mesmo que a empresa fale que estão anônimos.

Sinto-me extremamente desconfortável com a ideia de que vocês, leitores do site, sejam considerados clientes e produtos de uma empresa, que não se sabe como perfilará.

Ou seja, quero que você continue lendo os textos aqui (sim, eu sei que estou falhando em publicar mais regularmente, mas isso é outra história) e quero saber quais páginas e categorias de texto você mais acessa. Mas você **NÃO** é meu cliente, é meu leitor.

Não estou disposto a vender esta página para alguém que não o respeite. Esse é um princípio intrínseco meu, que não pretendo desfazer-me.

## Solução: troca de fornecedor

Com tudo isso em mente, comecei a me questionar se não seria o momento ideal de trocar o fornecedor do serviço de *analytics*. Pesquisando, encontrei algumas opções interessantes, sendo que todas são *open source*.

Aliás, esta era uma das premissas: um sistema que me permitisse auditar a maneira como os dados são coletados. Também queria que não fosse intrusivo e, de preferência, passasse incólume pelos *ad blockers*.

Nessa pesquisa, encontrei algumas opções, como o [Matomo](https://matomo.org/), o [Plausible](https://plausible.io/), o [Hypercable](https://learnsql.io/) e o escolhido, o [Ackee Analytics](https://ackee.electerious.com/).

### Ackee, uma solução equilibrada

No Ackee, eu achei uma solução bem interessante. É um script que tem menos possibilidade de ser bloqueado, já que está hospedado em meu próprio domínio. Também, é foi pensado para trabalhar sem a necessidade de um backend, podendo até mesmo ser colocado em serviços exclusivos de frontend, como Netlify e Vercel.

Além dessas vantagens, o Ackee não utiliza cookies. Ou seja, o rastreamento acontece somente no site, não sendo repassado para outras empresas. Mesmo se você acessar outros sites sob meu controle, eu não saberei que ambos os acessos são da mesma pessoa (embora eu consiga saber se você retornou ao site antes do prazo de 24h). Logo, se não há cookies de terceiros, há menos desafios para superar em relação à LGPD e Marco Civil da Internet.

Outros pontos extremamente positivos:

* Ele é pensado para ter a privacidade por padrão: o desenvolvedor/dono do site é o responsável por ativar opções mais “invasivas” (se é que o Ackee tem isso)
* Interface de gerenciamento de fácil entendimento e muito intuitiva: os relatórios estão a dois cliques de distância, no máximo
* Indicadores padrão que são simples, com a possibilidade de criar os suas próprias métricas
* Integra bem não só na web, como com PWAs e aplicativos feitos com React Native e Flutter

## Conclusão

Sim, eu sei: nem tudo é perfeito. O GA é complexo, porque foi pensado em atender uma comunidade gigante de usuários e diferentes necessidades, que precisam de controle extremamente fino do comportamento de seus usuários. Não é o meu caso.

Enquanto a discussão de privacidade tem aumentado e ganhado corpo no mundo todo, é essencial que todos repensemos nossas atitudes enquanto sociedade, sobre como queremos que nossos dados e informações pessoais, anônimos ou não, são repassados para empresas que nem sempre tem atitudes transparentes sobre o tratamento deles.

- - -

E qual a sua opinião sobre o assunto? Você acredita que reduzir a vigilância é uma boa ou é do time “não me importo”? Deixa aqui nos comentários!