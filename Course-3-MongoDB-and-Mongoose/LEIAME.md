# freeCodeCamp - MongoDB e Mongoose

O MongoDB é uma aplicação de banco de dados que armazena documentos JSON (ou registros) que podem ser usados em sua
aplicação.
Ao contrário do SQL, outro tipo de banco de dados, o MongoDB é um banco de dados não relacional ou "NoSQL".
Isto significa que o MongoDB armazena todos os dados associados dentro de um registro, em vez de armazená-los em muitas
tabelas predefinidas, como em um banco de dados SQL.

O `Mongoose` é um pacote popular do npm para a interação com o MongoDB.
Com o Mongoose, você pode usar objetos JavaScript simples em vez de JSON, o que torna mais fácil trabalhar com o MongoDB.
Além disso, ele permite que você crie projetos para seus documentos, chamados schemas, para que você não salve
acidentalmente o tipo errado de dados e cause bugs mais tarde.

Nos cursos de MongoDB e Mongoose, você aprenderá os fundamentos de trabalhar com dados persistentes, incluindo como
configurar um modelo, salvar, excluir e buscar documentos no banco de dados.


## Instalar e configurar o Mongoose
Neste desafio, você vai configurar um banco de dados do MongoDB Atlas e importar os pacotes necessários para se 
conectar a ele.

Siga este tutorial para configurar um banco de dados hospedado no MongoDB Atlas.

`mongoose@^5.11.15` foi adicionado ao arquivo package.json do projeto. 
Primeiro, solicite o mongoose como mongoose no myApp.js. 
Depois, crie um arquivo .env e adicione uma variável MONGO_URI a ele. 
Esse valor deve ser o URI de banco de dados do MongoDB Atlas. 
Não se esqueça de cercar o URI com aspas simples ou duplas. 
Lembre-se de que você não pode usar espaços ao redor de = em variáveis de ambiente. 
Por exemplo, MONGO_URI='VALUE'.

Observação: se você estiver usando o Replit, você não poderá criar um arquivo .env. 
Em vez disso, use a aba embutida SECRETS para adicionar a variável. Não circule os valores com aspas ao usar a aba SECRETS.

Quando terminar, conecte-se ao banco de dados chamando o método connect dentro do seu arquivo myApp.js usando a seguinte sintaxe:
```javascript
mongoose.connect("<Your URI>", { useNewUrlParser: true, useUnifiedTopology: true });
```

```
MESSAGE_STYLE=uppercase
```

```json
{
  "name" : "fcc-mongo-mongoose-challenges",
  "version": "0.01",
  "author": "Leonardo Simões",
  "description": "project with javascript, MongoDB, Mongoose",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^5.11.15"
  }
}
```

```javascript
require('dotenv').config();

const express = require("express");
const mongoose = require("mongooose");

const app = express();
const port = 3000;
const connection_url = process.env.MONGO_URI;

mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });
```

Testes:
- A dependência "mongoose version ^5.11.15" deve estar no package.json
- O "mongoose" deve estar conectado a um banco de dados


## Criar um modelo
CRUD I Parte I - CREATE

Em primeiro lugar, precisamos de um schema. 
Cada schema mapeia para uma coleção do MongoDB. 
Ele define a forma dos documentos dentro daquela coleção. 
Os schemas são os blocos que compõem os modelos. 
Eles podem ser aninhados para criar modelos complexos, mas, neste caso, vamos simplificar as coisas. 
Um modelo permite que você crie instâncias de seus objetos, chamados documentos.

O Replit é um servidor real. 
Em servidores reais, as interações com o banco de dados acontecem em funções de manipulador.
Estas funções são executadas quando algum evento acontece (por exemplo, alguém atinge um endpoint na sua API). 
Seguiremos a mesma abordagem nestes exercícios. 

A função `done()` é um callback que nos diz que podemos prosseguir após concluir uma operação assíncrona, como inserir, 
pesquisar, atualizar ou excluir. 
Ela segue a convenção do Node e deve ser chamada como `done(null, data)` quando houver sucesso, ou `done(err)` quando 
houver erro.

Aviso - Ao interagir com serviços remotos, podem ocorrer erros!

```javascript
/* Example */

const someFunc = function(done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
```

Crie um schema de pessoa chamado personSchema com o seguinte formato:
- Um campo obrigatório `name` do tipo String
- Um campo `age` do tipo Number
- Um campo `favoriteFoods` do tipo [String]
- 
Use os tipos de schemas básicos de Mongoose. 
- Se você quiser, também pode adicionar mais campos, usar validadores simples, como required ou unique, e definir 
- valores padrão. Veja nosso artigo sobre o Mongoose.

Agora, crie um modelo a partir de personSchema e atribua-o à variável Person existente.

```javascript
const personSchema = {
    name : String,
    age: Number,
    favoriteFoods : [String]
};

const Person = mongoose.model('Person', personSchema);
```


## Criar e salvar um registro de um modelo
Neste desafio, você terá que criar e salvar um registro de um modelo.

**Dentro da função createAndSavePerson, crie uma instância de documento usando o construtor de modelo Person que você 
criou antes.**
Passe para o construtor um objeto que tenha os campos name, age e favoriteFoods. 
Seus tipos devem estar em conformidade com os que estão no personSchema. 
Em seguida, chame o método document.save() na instância do documento retornado. 
Passe a ele um callback usando a convenção do Node. Este é um padrão comum. 
Todos os métodos CRUD a seguir recebem uma função de callback como essa como o último argumento.

```javascript
/* Example */

// ...
person.save(function(err, data) {
  //   ...do your stuff here...
});
```

```javascript
const createAndSavePerson = (done) => {
    let person = new Person({"name": "João", "age": 25, "favoriteFoods": ["pizza", "hambúrguer", "sorvete"]});
    person.save((err, data) => {
        if (err) {
            return console.error(err);
        }
        done(null, data);
    });
};

exports.createAndSavePerson = createAndSavePerson;
```

Testes:
- Você deve ter sucesso na criação e no salvamento de itens do banco de dados


## Criar muitos registros com model.create()
Às vezes, você precisa criar muitas instâncias dos seus modelos. 
Por exemplo, ao fazer o seeding de um banco de dados com os dados iniciais. 
`Model.create()` recebe um array de objetos como [{name: 'John', ...}, {...}, ...] como o primeiro argumento e o salva 
no banco de dados.

Modifique a função createManyPeople para criar muitas pessoas usando `Model.create()` com o argumento `arrayOfPeople.`

Observação: você pode reutilizar o modelo que você instanciou no exercício anterior.

```javascript
const arrayOfPeople =[
    {"name": "João", "age": 25, "favoriteFoods": ["pizza", "hambúrguer", "sorvete"]},
    {"name": "Maria", "age": 30, "favoriteFoods": ["sushi", "macarrão", "chocolate"]},
    {"name": "Pedro", "age": 20, "favoriteFoods": ["churrasco", "batata frita", "lasanha"]}
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function(err, people){
        if (err) {
            return console.error(err);
        }
        done(null, people);
    });
};

exports.createManyPeople = createManyPeople;
```

Testes
- Você deve ter sucesso na criação de muitos itens de banco de dados ao mesmo tempo


## Usar model.find() para procurar no seu banco de dados
Em seu uso mais simples, `Model.find()` aceita um documento de consulta (um objeto JSON) como o primeiro argumento e 
depois um callback. 
Ele retorna um array de correspondências. 
Ele dá suporte a uma variedade extremamente ampla de opções de pesquisa.
Leia mais na documentação.

Modifique a função findPeopleByName para encontrar todas as pessoas que tenham um determinado nome, 
usando `Model.find() -> [Person]`

Use o argumento `personName` da função como chave de pesquisa.

```javascript
const personName = "João";
const findPeopleByName = (personName, done) => {
    Person.find({name : personName}, function(err, personFound){
        if(err) {
            return console.error(err);
        }
        done(null, personFound);
    });
};

exports.findPeopleByName = findPeopleByName;
```

Testes:
- Localize todos os itens correspondentes a um critério com sucesso


## Usar model.findOne() para retornar um único documento correspondente a partir do seu banco de dados
`Model.findOne()` se comporta como `Model.find()`, mas retorna apenas um documento (não um array), mesmo que existam 
vários itens.
É especialmente útil ao pesquisar por propriedades que você declarou como exclusivas.

Modifique a função `findOneByFood` para encontrar apenas uma pessoa que tenha uma certa comida nos seus favoritos, 
usando o modelo `Model.findOne() -> Person`. Use o argumento food da função como chave de pesquisa.

```javascript
const favoriteFood = "pizza";
const findOneByFood = (favoriteFood, done) => {
    Person.findOne({food : favoriteFood}, function(err, personFound){
        if(err){
            return console.error(err);
        }
        done(null, personFound);
    });
};

exports.findOneByFood = findOneByFood;
```

Testes:
- Você deve ter sucesso em encontrar um item


## Usar model.findById() para procurar no seu banco de dados por _id
Ao salvar um documento, o MongoDB adiciona automaticamente o campo `_id`, e define-o como uma chave alfanumérica única. 
Procurar por `_id` é uma operação extremamente frequente, então o Mongoose fornece um método dedicado para isso.

Modifique `findPersonById` para encontrar a única pessoa com um `_id` dado, usando `Model.findById() -> Person`. 
Use o argumento personId da função como chave de pesquisa.

```javascript
const personId = "6586daaf0ca46f4ddfbc6654";
const findPersonById = (personId, done) => {
    Person.findById({_id : personId}, function(err, personFound){
        if(err){
            return console.error(err);
        }
        done(null, personFound);
    });
};

exports.findPersonById = findPersonById;
```

Testes:
- Você deve ter sucesso em encontrar um item por Id


## Realizar atualizações clássicas executando Find, Edit e Save
Nos bons e velhos tempos, era isso que você precisava fazer se você quisesse editar um documento e ser capaz de usá-lo 
de algum modo (ou seja, enviando o documento de volta em uma resposta do servidor). 

O Mongoose tem um método dedicado à atualização: `Model.update()`. 
Ele está vinculado ao driver do mongo de nível mais baixo. 
Ele pode editar em massa muitos documentos que correspondem a certos critérios, mas não envia de volta o documento 
atualizado, apenas uma mensagem de 'status'. 
Além disso, ele dificulta as validações de modelo, porque apenas chama diretamente o driver do mongo.

Modifique a função `findEditThenSave` para encontrar uma pessoa por `_id` (use qualquer um dos métodos acima) com o 
parâmetro `personId` como chave de pesquisa. 
Adicione "hamburger" à lista dos favoriteFoods da pessoa (você pode usar `Array.push())`. 
Em seguida, dentro do callback de find, use `save()` para salvar a Person atualizada.

Observação: isso pode ser complicado, se em seu Schema você declarou as favoriteFoods como um array, sem especificar 
o tipo (por exemplo, [String]). 
Nesse caso, favoriteFoods tem como padrão o tipo Mixed e você precisa marcá-lo manualmente como editado usando 
`document.markModified('edited-field')`. 
Veja nosso artigo sobre o Mongoose.

```javascript
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById({_id: personId}, function (err, personUpdated) {
        if (err) {
            return console.error(err);
        }
        personUpdated.favoriteFoods.push(foodToAdd);

        personUpdated.save(function (err, data) {
            if (err) {
                return console.error(err);
            }
            done(null, data);
        });
    });
};

exports.findEditThenSave = findEditThenSave;
```
Testes:
- Você deve ter sucesso em encontrar, editar e atualizar um item


## Executar novas atualizações em um documento usando model.findOneAndUpdate()
Versões recentes do Mongoose possuem métodos para simplificar a atualização dos documentos. 
Alguns recursos mais avançados (como os hooks pre/post, validação, entre outros) se comportam de modo diferente com 
esta abordagem. 
Assim, o método clássico ainda é útil em muitas situações.
`findByIdAndUpdate()` pode ser usado na busca por id.

Modifique a função findAndUpdate para encontrar uma pessoa por Name e defina a idade da pessoa como 20. 
Use o parâmetro personName da função como chave de pesquisa.

Observação: você deve retornar o documento atualizado. 
Para fazer isso, você precisa passar o documento de opções `{ new: true }` como o terceiro argumento 
para `findOneAndUpdate()`. 
Por padrão, esses métodos retornam o objeto não modificado.

```javascript
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({_id: personName}, {age: ageToSet}, { new: true }, function(err, personUpdated){
        if(err){
            console.error(err);
        }
        done(null, personUpdated);
    });
};

exports.findAndUpdate = findAndUpdate;
```

Testes:
- Usar findOneAndUpdate em um item deve ser bem-sucedido


## Excluir um documento usando model.findByIdAndRemove
findByIdAndRemove e findOneAndRemove são como os métodos da atualização anterior. 
Eles passam o documento removido para a db. 
Como de costume, use o argumento da função personId como chave de pesquisa.

Modifique a função removeById para excluir uma pessoa pelo _id da pessoa. 
Você deve usar um dos métodos findByIdAndRemove() ou findOneAndRemove().

```javascript
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, function(err, personRemoved){
        if(err){
            console.error(err);
        }
        done(null, personRemoved);
    });
};

exports.removeById = removeById;
```

Testes:
- A exclusão de um item deve ser bem-sucedida


## Excluir vários documentos com model.remove()
`Model.remove()` é útil para excluir todos os documentos que correspondem a determinados critérios.
Modifique a função `removeManyPeople` para excluir todas as pessoas cujo nome esteja dentro da variável `nameToRemove`, 
usando `Model.remove()`. Passe-a a um documento de consulta com o campo name definido e uma função de callback.

Observação: `Model.remove()` não retorna o documento excluído, mas um objeto JSON que contém o resultado da operação e 
o número de itens afetado. Não se esqueça de passar o objeto para a função de callback `done()`, já que a usamos nos 
testes.

```javascript
const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, function(err, data){
        if(err){
            console.error(err);
        }
        done(null, data);
    })
};

exports.removeManyPeople = removeManyPeople;
```

Testes:
- Você deve ter sucesso na exclusão de vários itens


## Encadear auxiliares de consulta para restringir resultados de pesquisa
Se você não passar o callback como o último argumento para `Model.find()` (ou para outros métodos de pesquisa), 
a consulta não é executada. 
Você pode armazenar a consulta em uma variável para uso posterior. 
Esse tipo de objeto permite que você crie uma consulta usando a sintaxe de encadeamento. 
A pesquisa real do banco de dados é executada quando você finalmente encadear o método `.exec()`. 
Você sempre precisa passar seu callback para este último método. 
Existem muitos auxiliares de consulta. 
Aqui, usaremos os mais comuns.

Modifique a função queryChain para que encontre pessoas que gostam do alimento especificado pela variável foodToSearch. 
Classifique-os por name, limite os resultados a dois documentos e oculte idade deles. 
Encadeie `.find()`, `.sort()`, `.limit()`, `.select()` e, então, `.exec()`. 
Passe a callback `done(err, data)` para `exec()`.

```javascript
const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({favoriteFood: foodToSearch})
        .sort({name : 1})
        .limit(2)
        .select({name: 1, age: 0, favoriteFoods: 1})
        .exec(function(err, data){
            if(err){
                return console.error(err);
            }
            done(null, data);
        });
};

exports.queryChain = queryChain;
```

Testes:
- Você deve ter sucesso em encadear auxiliares de consulta


# Referências
https://www.freecodecamp.org/portuguese/learn/back-end-development-and-apis/#mongodb-and-mongoose
, acessado em 03/02/2023.

https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/ , acessado em 03/02/2023.

https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/ , acessado em 03/02/2023.

https://github.com/freeCodeCamp/boilerplate-mongomongoose/ , acessado em 03/02/2023.