# freeCodeCamp - Básico sobre Node e Express

O Node.js é um ambiente de execução em Javascript que permite que os desenvolvedores escrevam programas de back-end 
(no lado do servidor) em JavaScript. O Node.js vem com diversos módulos internos — pequenos programas independentes — 
que ajudam com isso. 

Alguns dos principais módulos incluem o HTTP, que atua como um servidor, e um sistema de arquivos, que atua como um 
módulo para ler e modificar arquivos.

Nos últimos cursos, você aprendeu a instalar e gerenciar pacotes a partir do npm, que são coleções de pequenos módulos. 

Estes pacotes podem ajudá-lo a construir aplicações maiores e mais complexas.

O Express é um framework leve para a criação de aplicações web, sendo um dos pacotes mais populares no npm. 
O Express torna muito mais fácil criar um servidor e lidar com o roteamento para seu aplicativo, lidando com coisas 
como direcionar as pessoas para a página correta quando elas visitam um determinado endpoint, como /blog.

Neste curso, você aprenderá o básico do Node e do Express, incluindo como criar um servidor, manusear arquivos 
diferentes e manipular diferentes solicitações de um navegador.


## Conhecer o console do Node
Durante o processo de desenvolvimento, é importante poder verificar o que está acontecendo no código.

O Node é apenas um ambiente JavaScript. Como o JavaScript lado do client, você pode usar o console para exibir 
informações úteis de depuração. Em sua máquina local, você veria a saída do console em um terminal. 
No Replit, um terminal está aberto no painel direito por padrão.

Recomendamos que o terminal continue aberto enquanto você trabalha nesses desafios. 
Ao ler a saída no terminal, você poderá ver os erros que podem ocorrer.

Modifique o arquivo myApp.js para registrar "Hello World" no console.

```javascript
let express = require('express');
let app = express();
console.log("Hello World");

module.exports = app;
```

Testes:
- "Hello World" deve estar no console


## Iniciar um servidor de Express funcional
Nas duas primeiras linhas do arquivo myApp.js, você pode ver como é fácil criar um objeto do aplicativo Express. 
Este objeto tem vários métodos e você aprenderá muitos deles nestes desafios. 
Um método fundamental é o `app.listen(port).`
Ele diz ao servidor para que escute em uma determinada porta, colocando-o em estado de execução. 
Para fins de teste, precisamos que o aplicativo esteja sendo executado em segundo plano para que adicionemos este método 
no arquivo server.js para você.

Vamos servir nossa primeira string! 
No Express, as rotas têm a seguinte estrutura: app.METHOD(PATH, HANDLER). 
METHOD é um método http em letras minúsculas. 
PATH é um caminho relativo no servidor (pode ser uma string ou até mesmo uma expressão regular). 
HANDLER é uma função que o Express chama quando a rota tem correspondência. 
Os manipuladores têm o formato function(req, res) {...}, onde req é o objeto solicitado, e res é o objeto de resposta. 

Por exemplo, o manipulador
```javascript
function(req, res) {
  res.send('Response String');
}
```
servirá a string 'Response String'.

**Use o método `app.get()` para servir a string "Hello Express" para solicitações de GET que correspondam ao 
caminho / (root).**

Certifique-se de que seu código funciona olhando os logs e, em seguida, veja os resultados na pré-visualização se você 
estiver usando o Replit.

```javascript
app.get('/', function(req, res){
    res.send("Hello Express");
});
```

Testes:
- Seu aplicativo deve servir a string 'Hello Express'


## Servir um arquivo HTML
Você pode responder às solicitações com um arquivo usando o método res.sendFile(path). 
Você pode colocá-lo dentro do manipulador de rota app.get('/', ...). 
Nos bastidores, este método definirá os cabeçalhos apropriados para instruir o navegador sobre como lidar com o arquivo 
que você deseja enviar, de acordo com o tipo. Então, ele lerá e enviará o arquivo. 
Este método precisa de um caminho de arquivo absoluto. 
Recomendamos que use a variável global __dirname do Node para calcular o caminho assim:
`absolutePath = __dirname + '/relativePath/file.ext'`

Envie o arquivo /views/index.html como uma resposta para solicitações de GET para o caminho /. 
Ao ver sua aplicação ao vivo, você deverá perceber um grande título em HTML (e um formulário, que usaremos mais tarde…), 
sem nenhum estilo aplicado.

Observação: você pode editar a solução do desafio anterior ou criar uma nova. 
Se você criar uma nova solução, tenha em mente que o Express avalia rotas de cima para baixo e executa o manipulador 
para a primeira correspondência. 
Você tem que deixar comentada a solução anterior, ou o servidor continuará respondendo com uma string.

```javascript
app.get('/', function(req, res){
    let pathFile = __dirname + '/views/index.html'
    res.sendFile(pathFile);
});
```

Testes: 
- O aplicativo deve servir o arquivo views/index.html


## Servir ativos estáticos
Um servidor HTML geralmente tem um ou mais diretórios acessíveis pelo usuário. 
Você pode colocar lá os recursos estáticos necessários para a aplicação (folhas de estilos, scripts e imagens).

No Express, você pode colocar esta funcionalidade usando o middleware express.static(path), onde o parâmetro path é o 
caminho absoluto da pasta que contém os arquivos.

Se você não sabe o que é um middleware... não se preocupe. Discutiremos isso em detalhes mais tarde. 
Basicamente, middleware são funções que interceptam manipuladores da rota, adicionando algum tipo de informação. 
Um middleware precisa ser montado usando o método app.use(path, middlewareFunction). 
O primeiro argumento, path, é opcional. Se você não passar esse argumento, o middleware será executado em todas as 
solicitações.

**Monte o middleware `express.static()` para o caminho /public com `app.use()`.** 
O caminho absoluto para a pasta de arquivos é __dirname + /public.

Agora, seu aplicativo deve ser capaz de servir uma folha de estilos de CSS. 
Observe que o arquivo /public/style.css é referenciado em /views/index.html no boilerplate do projeto. 
A página inicial deve estar um pouco melhor agora!

```javascript
// app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));
```

Testes: 
- Seu aplicativo deve servir arquivos de ativos do diretório /public no caminho /public
- A aplicação não deve servir arquivos de outras pastas além do diretório /public


## Servir JSON em uma rota específica
Enquanto um servidor HTML serve arquivos em HTML, uma API serve dados. 
Uma API REST (Transferência de Estado Representacional) permite a troca de dados de uma maneira simples sem a 
necessidade de os clients saberem qualquer detalhe sobre o servidor. 
O client só precisa saber onde o recurso está (qual o seu URL) e a ação que quer realizar nele (o verbo). 
O verbo GET é usado quando você busca algumas informações, sem modificar nada.

Hoje em dia, o formato de dados preferencial para mover informações pela web é o JSON. 
Simplificando, JSON é uma maneira conveniente de representar um objeto JavaScript como uma string, que então pode ser 
facilmente transmitido.

Vamos criar uma API simples, gerando uma rota que responda com JSON no caminho /json. 
Você pode fazer isso como de costume, com o método app.get(). 
Dentro do manipulador de rota, use o método res.json(), passando um objeto como um argumento. 
Este método fecha o loop de solicitação-resposta, retornando os dados. Nos bastidores, ele converte um objeto JavaScript 
válido em uma string. 
Em seguida, define os cabeçalhos apropriados para dizer ao navegador que você está servindo JSON e envia os dados de 
volta. 

Um objeto válido tem a estrutura usual {key: data}. data pode ser um número, uma string, um objeto aninhado ou um array. 
data também podem ser uma variável ou o resultado de uma chamada de função. 
Nesse caso, ele será avaliado antes de ser convertido em uma string.

**Sirva o objeto {"message": "Hello json"} como uma resposta, no formato JSON, para solicitações de GET feitas 
à rota /json. 
Em seguida, aponte o navegador para your-app-url/json.**

Você deverá ver a mensagem na tela.
```javascript
app.get("/json", function(req, res){
    res.json({"message": "Hello json"});
});
```

Testes:
- O /json do endpoint deve servir o objeto JSON {"message": "Hello json"}


## Usar o arquivo .env
O arquivo .env é um arquivo oculto que é usado para passar variáveis de ambiente para seu aplicativo.
Este arquivo é secreto, ninguém além de você pode acessá-lo. 
Ele pode ser usado para armazenar dados que você deseja manter privados ou ocultos.
Por exemplo, você pode armazenar chaves da API de serviços externos ou o URI do seu banco de dados. 
Você também pode usá-lo para armazenar as opções de configuração. 
Ao definir as opções de configuração, você pode alterar o comportamento de sua aplicação sem a necessidade de reescrever 
algum código.

As variáveis de ambiente podem ser acessadas pelo aplicativo usando `process.env.VAR_NAME`. 
O objeto process.env é um objeto global do Node e suas variáveis são passadas como strings. 
Por convenção, os nomes de variáveis ficam todos em letras maiúsculas, com palavras separadas por um sublinhado. 
O .env é um arquivo shell. Assim, você não precisa encapsular nomes ou valores entre aspas. 
Também é importante notar que não pode haver espaço em torno do sinal de igual quando você estiver atribuindo valores às 
suas variáveis, como, por exemplo, VAR_NAME=value. 
Normalmente, você colocará cada definição de variável em uma linha separada.

Vamos adicionar uma variável de ambiente como uma opção de configuração.

**Crie um arquivo .env na raiz do diretório do seu projeto e armazene a variável `MESSAGE_STYLE=uppercase` nele.**

Depois, no manipulador da rota GET /json que você criou no último desafio, acesse process.env.MESSAGE_STYLE e 
transforme a message do objeto de resposta em letras maiúsculas se a variável for igual a uppercase. 

O objeto de resposta deve ser {"message": "Hello json"} ou {"message": "HELLO JSON"}, dependendo do valor de 
MESSAGE_STYLE. 
Observe que você deve ler o valor de process.env.MESSAGE_STYLE dentro do manipulador de rota, não fora dela, devido ao 
modo como nossos testes são executados.

Observação: se você estiver usando o Replit, você não poderá criar um arquivo .env. 
Em vez disso, use a aba embutida SECRETS para adicionar a variável.

Se você estiver trabalhando localmente, precisará do pacote dotenv. 
Ele carrega as variáveis de ambiente do seu arquivo .env em process.env. 
O pacote dotenv já foi instalado e está no arquivo package.json do projeto. 

**Na parte superior do seu arquivo myApp.js, adicione `require('dotenv').config()` para carregar as variáveis de 
ambiente.**

```
MESSAGE_STYLE=uppercase
```

```javascript
let dotenv = require('dotenv').config();

app.get("/json", function(req, resp){
    if(process.env.MESSAGE_STYLE=="uppercase"){
        res.json({"message": "HELLO JSON"});
    } else{
        res.json({"message": "Hello json"});
    }
});
```

Testes:
- A resposta do endpoint /json deve ser alterada de acordo com a variável de ambiente MESSAGE_STYLE


## Implementar um middleware de solicitação ao nível de root
Anteriormente, apresentamos a você a função de middleware `express.static()`. 
Agora é hora de ver o que é o middleware, em mais detalhes. 

As funções de middleware são funções que recebem 3 argumentos: o objeto de solicitação, o objeto de resposta e a 
próxima função no ciclo de solicitação e resposta do aplicativo. 
Estas funções executam algum código que pode ter efeitos colaterais no aplicativo. 

Geralmente, elas adicionam informações aos objetos de solicitação ou resposta. 
Elas também podem acabar com o ciclo enviando uma resposta quando alguma condição é satisfeita. 
Se elas não enviarem a resposta quando terminarem, iniciam a execução da próxima função na pilha. 
Isso dispara o chamado do terceiro argumento, `next()`.

Observe o exemplo abaixo:
```javascript
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```
Vamos supor que você montou esta função em uma rota. 
Quando uma solicitação corresponde à rota, ela exibe a string "I'm a middleware…" e então executa a próxima função na 
pilha. 

Neste exercício, você vai criar um middleware ao nível de root. 
Como você viu no desafio 4, para montar uma função de middleware no nível de root, você pode usar o método 
`app.use(<mware-function>)`. 
Neste caso, a função será executada para todas as solicitações, mas você também pode definir condições mais específicas. 
Por exemplo, se você quiser que uma função seja executada somente para solicitações de POST, você poderia usar 
`app.post(<mware-function>)`. Existem métodos análogos para todos os verbos de HTTP (GET, DELETE, PUT, …).

**Crie um registrador simples.**
Para cada solicitação, ele deve registrar no console uma string com o seguinte formato: method path - ip. 
Um exemplo ficaria assim: GET /json - ::ffff:127.0.0.1. 
Note que há um espaço entre method e path e que o traço separando o path e ip está cercado por um espaço de ambos 
os lados. 

Você pode obter o método de solicitação (verbo do http), o caminho da rota relativo e o IP de quem fez a chamada a 
partir do objeto de solicitação usando `req.method`, `req.path` e `req.ip`. 
Lembre-se de chamar `next()` quando você estiver pronto, ou o servidor ficará travado para sempre. 
Certifique-se de que os 'Logs' estejam abertos e veja o que acontece quando algumas solicitações chegarem.

Observação: o Express avalia as funções na ordem em que elas aparecem no código. 
Isto se aplica também ao middleware. 
Se você quer que ele funcione para todas as rotas, é preciso montá-lo antes delas.

```javascript
app.use("/reg", function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});
```

Testes:
- O middleware do registrador de root deve estar ativo


## Encadear middleware para criar um servidor de tempo
O middleware pode ser montado em uma rota específica usando `app.METHOD(path, middlewareFunction)`. 
O middleware também pode ser encadeado nas definições de rota.

Observe o exemplo abaixo:
```javascript
app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});
```

Esse método é útil para separar as operações de servidor em pedaços menores. 
Isso fornece uma melhor estrutura de aplicativo, além da possibilidade de reusar código em partes diferentes. 
Esse método também pode ser usado para realizar algumas validações de dados. 
Em cada ponto da pilha de middleware, você poderá bloquear a execução da cadeia atual e passar o controle para funções 
específicas criadas especificamente para gerenciar erros.
Você também pode passar o controle para a próxima rota correspondente, para gerenciar casos especiais. 
Veremos como fazer isso na seção avançada do Express.

**Na rota `app.get('/now', ...)`, encadeie uma função middleware e o handler final.**
**Na função middleware, você deverá adicionar o tempo atual no objeto de requisição na chave req.time.** 
Você pode usar `new Date().toString()`. 
No gerenciador, responda com um objeto JSON, pegando a estrutura `{time: req.time}`.

Observação: o teste não vai passar se você não encadear o middleware. 
Se você montar a função em algum outro lugar, o teste vai falhar, mesmo que o resultado final esteja correto.

```javascript
app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.json({"time": req.time});
});
```

Testes:
- O endpoint (URL) /now deve ter o middleware montado
- O endpoint /now deve retornar a hora atual.


## Obter a entrada do parâmetro de roteamento do client
Ao construir uma API, temos que permitir que os usuários nos comuniquem o que querem obter com o nosso serviço. 
Por exemplo, se o client estiver solicitando informações sobre um usuário armazenado no banco de dados, ele precisa de 
um modo de nos informar em qual usuário ele está interessado. 

Uma maneira possível de alcançar este resultado é utilizando parâmetros de roteamento. 
Parâmetros de roteamento são segmentos nomeados do URL, delimitados por barras (/). 
Cada segmento captura o valor da parte do URL que corresponde à sua posição. 
Os valores capturados podem ser encontrados no objeto `req.params`.
```
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```

Crie um servidor de eco, montado na rota `GET /:word/echo`. Responda com um documento JSON, pegando a estrutura
`{echo: word}`. Você pode encontrar a palavra a ser repetida em `req.params.word`. 
Você pode testar sua rota através da barra de endereços do seu navegador, visitando algumas rotas correspondentes, 
como, por exemplo, `your-app-rootpath/freecodecamp/echo`.

```javascript
app.post("/:word/echo", function(req, resp){
    const {word} = req.param.word;
    res.json({"echo": word});
});

```

Testes:
- Teste 1: o servidor de eco deve repetir palavras corretamente
- Teste 2: o servidor de eco deve repetir palavras corretamente


## Obter a entrada do parâmetro da consulta do client
Outro jeito usual de obter a entrada do client é ao codificar os dados após o caminho da rota, usando uma string de 
consulta.
A string de consulta é delimitada por um símbolo de interrogação (?) e inclui pares campo=valor. 
Cada par é separado por um e comercial(&). 
O Express pode analisar os dados da string de consulta e preencher o objeto `req.query`. 
Alguns caracteres, como o de porcentagem (%), não podem estar nos URLs e tem de ser codificados em um formato diferente
antes que você os envie. 
Se você usa a API do JavaScript, você pode usar métodos específicos para codificar/decodificar esses caracteres.
```
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```
**Faça uma API de endpoint (URL), montada em `GET /name`.**
Responda com um documento JSON, pegando a estrutura `{ name: 'firstname lastname'}`. 

O parâmetros primeiro e último nome devem ser codificados em uma string de consulta como, por exemplo: 
`?first=firstname&last=lastname`.

Observação: no exercício seguinte, você vai receber dados de uma requisição POST, no mesmo caminho de rota `/name`. 
Se você quiser, poderá usar o método `app.route(path).get(handler).post(handler)`. 
Essa sintaxe permite a você encadear diferentes manipuladores do tipo verb no mesmo caminho de rota.
Você vai economizar na digitação e ter um código mais limpo.

```javascript
app.get("/name", function(req, res){
    const {first: firstname, last: lastname} = req.query;
    const fullname = firstname + " " + lastname;
    res.json({ name: fullname});
});
```

## Usar o body-parser para analisar solicitações de POST
Além do GET, existe um outro verbo comum de HTTP, o POST. 
POST é o método padrão usado para enviar dados do client com formulários HTML. 
Na convenção de REST, POST é usado para enviar dados para criar novos itens no banco de dados (um novo usuário, ou um 
nova publicação no blog). 
Você não tem um banco de dados neste projeto, mas vai aprender como lidar com solicitações de POST, mesmo assim.

Nesse tipo de solicitação, os dados não aparecem no URL. Eles estão ocultos no corpo da solicitação. 
O corpo (body) é uma parte da solicitação do HTTP, também chamada de payload. 
Mesmo que os dados não sejam visíveis no URL, isso não significa que sejam privados. 
Para saber o porquê, consulte o conteúdo bruto de uma solicitação de POST de HTTP:
```
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25 
```
Como você pode ver, o body é codificado como a string de consulta. 
Este é o formato padrão usado pelos formulários de HTML. 
Com o Ajax, você também pode usar JSON para tratar os dados tendo uma estrutura mais complexa. 
Existe também um outro tipo de codificação: multipart/form-data. Esta é usada para enviar arquivos binários.
Neste exercício, você usará um body codificado do URL. 
Para analisar os dados provenientes de solicitações de POST, você deve instalar o pacote body-parser. 
Este pacote permite que você use uma série de middleware, que pode decodificar os dados em diferentes formatos.

`body-parser` já está instalado e está no arquivo package.json do projeto. 
Faça o require na parte superior do arquivo `myApp.js` e armazene-o em uma variável chamada bodyParser. 

O middleware para manipular dados com codificação do URL é retornado por `bodyParser.urlencoded({extended: false})`. 
Passe a função retornada pela chamada do método anterior para `app.use()`. 
Como sempre, o middleware deve ser montado antes de todas as rotas que dependem dele.

Observação: extended é uma opção de configuração que informa ao body-parser que a análise (parsing) precisa ser usada. 
Quando `extended=false` ele usa a biblioteca clássica de codificação, querystring. 
Quando `extended=true` ele usa a biblioteca qs para a análise.

Ao usar `extended=false`, os valores podem ser apenas strings ou arrays. 
O objeto retornado ao usar querystring não herda prototipicamente do Object de JavaScript padrão, o que significa que 
funções como `hasOwnProperty` e `toString` não estarão disponíveis. 
A versão estendida permite mais flexibilidade aos dados, mas é superada por JSON.

```javascript
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

Testes:
- O middleware 'body-parser' deve estar montado


## Obter dados de solicitações de POST
**Monte um handler POST no caminho `/name`.** 
É o mesmo caminho de antes. 
Nós preparamos um formulário na página inicial html. 
Ele vai enviar os mesmos dados do exercício 10 (string de consulta). 
Se o body-parser estiver configurado corretamente, você deverá encontrar os parâmetros do objeto req.body. 
Dê uma olhada no exemplo habitual da biblioteca:
```
route: POST '/library'
urlencoded_body: userId=546&bookId=6754
req.body: {userId: '546', bookId: '6754'}
```

**Responda com o mesmo objeto JSON usado antes: {name: 'firstname lastname'}.** 
Teste se seu endpoint (URL) funciona usando o formulário html que fornecemos na página inicial do aplicativo.

Dica: existem vários outros métodos http além de GET e POST. 
Por convenção, existem correspondências entre o verbo http e a operação que você vai executar no servidor.
O mapeamento convencional é:
- POST (às vezes, PUT) – Cria um novo recurso usando a informação enviada com a requisição,
- GET - Lê um recurso existente sem modificá-lo,
- PUT ou PATCH (às vezes, POST) – Atualiza um recurso usando os dados enviados,
- DELETE - Exclui um recurso.

Existem também alguns outros métodos que são usados para estabelecer uma conexão com o servidor. 
Com a exceção de GET, todos os outros métodos listados acima podem ter uma payload(carga) 
(exemplo: os dados enviados no corpo da requisição). O middleware body-parser também funciona com esses métodos.

```javascript
app.post("/name", function(req, res){
    const fullname = req.body.firstname + " " + req.body.lastname;
    res.json({ name: fullname});
});
```


## Referências
https://www.freecodecamp.org/portuguese/learn/back-end-development-and-apis/#basic-node-and-express 
, acessado em 02/02/2023.

https://github.com/freeCodeCamp/boilerplate-express/ , acessado em 02/02/2023.