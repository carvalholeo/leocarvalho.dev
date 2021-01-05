---
title: Usando a diretiva Do Not Track
date: '2021-01-04T19:08:07-03:00'
categories:
  - Privacidade
  - Segurança
  - Front-end
tags:
  - dnt
  - tutorial
  - código
  - javascript
keywords:
  - dnt
  - privacidade
  - lgpd
  - tutorial
  - autorizacaoo
  - anuncios
  - analytics
  - trackers
  - pixel
  - do not track
  - don't track
  - front-end
  - javascript
  - js
  - navegador
  - w3c
  - mdn
  - browser
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

Existem algumas formas de você tratar a privacidade do usuário. Nesse artigo, vamos falar sobre o [Do Not Track](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT). Em breve, pretendo escrever sobre o [Tk](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Tk). Ao final dele, teremos uma classe com tudo que precisamos para fazer o gerenciamento do 'Do Not Track'.

## Entendendo o Do Not Track

O "Do Not Track" (DNT) é um cabeçalho de requisição, disponível no navegador do usuário. Para acessá-lo, usamos o objeto global _navigator_, que tem todas as propriedades do navegador.

Em sua implementação, o DNT tem três valores possíveis:

* **0** (zero/false): indica que o usuário PERMITE o rastreamento, e os cookies de personalização podem ser usados à vontade;
* **1** (um/true): indica que o usuário NÃO PERMITE o rastreamento, e os cookies não devem ser colocados no dispositivo do mesmo;
* **null**: indica que nenhuma preferência foi expressa pelo usuário. De acordo com as leis atuais, você deve entender isso como se o usuário NÃO PERMITISSE os cookies personalizados.

Implementando o DNT

De acordo com o '[Can I Use?](https://caniuse.com/?search=do%20not%20tr)', os diferentes navegadores implementam o DNT de forma diferente entre si. E não vamos fazer vários blocos `if` ou `switch/case` para verificar cada um deles. Outro ponto a se observar é a falta de suporte do Safari ao DNT, desde a versão 12.1 até as mais atuais.

Sabendo-se que há diferentes implementações entre os browsers, podemos, então, usar lógica booliana para que cada um dos padrões adotados possam ser verificados, um por um.

```javascript
const dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack) ?? "1";
```

1. Na condição `navigator.doNotTrack`, o JavaScript está procurando pela implementação padrão, com o objeto _navigator_.
2. Já em `window.doNotTrack` e `navigator.msDoNotTrack`, procura-se pelo DNT nas implementações fora do padrão do W3C e da MDN.
3. Por fim, o `?? "1"` é o operador que garante que, se nada der certo, você ainda tem a privacidade protegida, já que "ativa" o DNT. E sim, ele fica como string, já que esse é o padrão.

Para poder usar em validações de função ou `if`, vamos, mais uma vez recorrer à lógica booliana para gravar em uma variável. Isso acontece porque, mais uma vez, há diferentes implementações do que deveria ser um padrão.

```javascript
const doNotTrack = (dnt === "1" || dnt === "yes") ?? true;
```

Nesse caso, ele faz a comparação nos parênteses e retorna um booliano. Caso haja qualquer falha nessa verificação, vai cair no true por padrão. O primeiro, `dnt === "1"` é a validação do padrão. Já o segundo, `dnt === "yes"` confirma se no Firefox (que usa "yes" e "no") está assim. Se nenhum dos dois for possível de confirmar, lembre-se que estamos falando de respeitar a privacidade do usuário e de cumprir a Lei: dizemos que será `true`.

Agora basta fazer um `if`, onde colocamos o nosso código que terá o rastreamento liberado.

```javascript
if (!doNotTrack) {
    //código aqui
}
```

Até aqui, já temos um código funcional para tratar do DNT. Agora vamos descer um pouco o nível e melhorar esse código.

## Gerenciando o DNT

Pensando na legislação (e na experiência do usuário), o usuário deve ser capaz de dar/revogar essa permissão. Para isso, vamos criar uma classe para trabalhar com todos esses aspectos e também para deixar as funções bem separadas. Não vou entrar nos pormenores da implementação dela. Se você quiser ter mais detalhes do que cada coisa faz, deixa nos comentários (necessário ter conta no GitHub).

```javascript
class DoNotTrack {
  constructor() {
    this.doNotTrack = (this.#getLocalStorage() || this.getDoNotTrackFromBrowser());
    this.dnt = this.isDntActive();
  }

  getDoNotTrackFromBrowser() {
    return (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack) ?? "1";
  }

  isDntActive() {
    return (this.doNotTrack === "1" ? 1 : 0 || this.doNotTrack === "yes" ? 1 : 0) ?? 1;
  }

  grantPermission() {
    this.dnt = 0;
    this.#setLocalStorage();

    return this.#getLocalStorage();
  }

  revokePermission() {
    this.dnt = 1;
    this.#setLocalStorage();

    return this.#getLocalStorage();
  }

  #setLocalStorage() {
    localStorage.setItem("dnt", this.dnt.toString());
  }

  #getLocalStorage() {
    return Boolean(Number(localStorage.getItem("dnt")));
  }
}
```

Num resumo, com o código acima agora nós temos a verificação do DNT e guardamos esse valor dentro do LocalStorage, para não precisarmos verificar diretamente o cabeçalho a cada nova renderização do HTML.

1. No `constructor`, são inicializadas as propriedades padrão para a Classe.
2. O método `getDoNotTrackFromBrowser` pega o cabeçalho de dentro do objeto _navigator_.
3. Na função `isDntActive`, podemos saber se o usuário ativou ou não o DNT.
4. Em `grantPermission`, o usuário desativa o DNT no seu site e permite que seja rastreado.
5. Já em `revokePermission`, a permissão ativa é revogada e o usuário deixa claro que não quer ser rastreado.
6. Os métodos `#setLocalStorage` e `#getLocalStorage` são privados, usados apenas internamente pela classe e responsáveis por guardar o estado do DNT no LocalStorage do navegador.

## Uso prático

Assim, podemos separar bem as responsabilidades e podemos consultar, de forma centralizada, o status do DNT do resto do seu código, onde ficam os trackers e anúncios.

```javascript
const dnt = new DoNotTrack(); //inicializa a classe
console.log(dnt); // mostra os valores iniciais
dnt.grantPermission(); //desativa o DNT para você, apenas, e retorna false
dnt.revokePermission(); // ativa o DNT para você e retorna true
dnt.isDntActive(); // função que retorna um booliano sobre o status atual do DNT
```

Sabendo-se que `dnt.isDntActive()` retorna `true/false`, basta usá-lo num `if`, em que dentro ficará o seu código de Analytics, Pixel e Ads.

```javascript
if (!dnt.isDntActive()) {
    //códigos de rastreamento variados aqui
}
```

Você deve ter percebido que fiz, tanto no exemplo procedural, quanto no orientado a objetos, um `if` com negação. Isso acontece porque quando o DNT está ativado, o método `isDntActive` vai retornar `true` (indicando que o usuário não permite o rastreamento). Já quando o usuário permitir o rastreamento, o DNT estará desativado, e `isDntActive` vai retornar `false`, indicando que o usuário permite o rastreio. 

Se não fosse feita a negação, o `if` e o rastreamento iriam funcionar normalmente quando o usuário não permite, e não o faria quando o usuário tivesse dado a autorização.

## Conclusão

A partir de agora, fica muito mais simples, prático e centralizada a gestão do DNT, garantindo que você, desenvolvedor, possa dar ao seu usuário, um controle, ainda muito rudimentar, sobre trackers e anúncios personalizados.

Me diz, o que você achou desse artigo? Comenta aí!
