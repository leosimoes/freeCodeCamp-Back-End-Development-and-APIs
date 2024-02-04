# freeCodeCamp - MongoDB and Mongoose

MongoDB is a database application that stores JSON documents (or records) that can be used in your
application.
Unlike SQL, another type of database, MongoDB is a non-relational or "NoSQL" database.
This means that MongoDB stores all associated data within one record, rather than storing it across many
predefined tables, like in a SQL database.

`Mongoose` is a popular npm package for interacting with MongoDB.
With Mongoose, you can use simple JavaScript objects instead of JSON, which makes working with MongoDB easier.
Additionally, it allows you to create blueprints for your documents, called schemas, so you don't save
accidentally the wrong type of data and cause bugs later.

In the MongoDB and Mongoose courses, you will learn the fundamentals of working with persistent data, including how to
configure a template, save, delete and search documents in the database.


## Install and configure Mongoose
In this challenge, you will set up a MongoDB Atlas database and import the necessary packages to get started.
connect to it.

Follow this tutorial to set up a database hosted on MongoDB Atlas.

`mongoose@^5.11.15` has been added to the project's package.json file.
First, request mongoose as mongoose in myApp.js.
Then create an .env file and add a MONGO_URI variable to it.
This value must be the MongoDB Atlas database URI.
Don't forget to surround the URI with single or double quotes.
Remember that you cannot use spaces around = in environment variables.
For example, MONGO_URI='VALUE'.

Note: If you are using Replit, you cannot create an .env file.
Instead, use the built-in SECRETS tab to add the variable. Do not encircle values with quotation marks when using the 
SECRETS tab.

When finished, connect to the database by calling the connect method inside your myApp.js file using the following 
syntax:
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
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const connection_url = process.env.MONGO_URI;

mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });
```

Tests:
- The dependency "mongoose version ^5.11.15" must be in package.json
- "mongoose" must be connected to a database


## Create a template
CRUD I Part I - CREATE

Firstly, we need a schema.
Each schema maps to a MongoDB collection.
It defines the form of documents within that collection.
Schemas are the blocks that make up models.
They can be nested to create complex models, but in this case, let's keep things simple.
A model allows you to create instances of your objects, called documents.

Replit is a real server.
On real servers, interactions with the database happen in handler functions.
These functions are executed when some event happens (for example, someone hits an endpoint in your API).
We will follow the same approach in these exercises.

The `done()` function is a callback that tells us that we can proceed after completing an asynchronous operation such 
as insert,
search, update or delete.
It follows the Node convention and should be called `done(null, data)` when successful, or `done(err)` when
there is an error.

Warning - When interacting with remote services, errors may occur!

```javascript
/* Example */

const someFunc = function(done) {
   //... do something (risky)...
   if (error) return done(error);
   done(null, result);
};
```

Create a person schema called personSchema with the following format:
- A mandatory field `name` of type String
- An `age` field of type Number
- A `favoriteFoods` field of type [String]
-
Use the basic Mongoose schema types.
- If you want, you can also add more fields, use simple validators like required or unique, and set
- default values. See our article on Mongoose.

Now create a model from personSchema and assign it to the existing Person variable.

```javascript
const personSchema = {
     name : String,
     age:Number,
     favoriteFoods : [String]
};

const Person = mongoose.model('Person', personSchema);
```


## Create and save a record of a model
In this challenge, you will have to create and save a record of a model.

**Within the createAndSavePerson function, create a document instance using the Person model builder that you
created before.**
Pass an object to the constructor that has the name, age and favoriteFoods fields.
Your types must conform to those in the personSchema.
Then call the document.save() method on the returned document instance.
Pass it a callback using the Node. This is a common pattern.
All of the following CRUD methods take a callback function like this as the last argument.

```javascript
/* Example */

// ...
person.save(function(err, data) {
   // ...do your stuff here...
});
```

```javascript
const createAndSavePerson = (done) => {
     let person = new Person({"name": "John", "age": 25, "favoriteFoods": ["pizza", "hamburger", "ice cream"]});
     person.save((err, data) => {
         if (err) {
             return console.error(err);
         }
         done(null, data);
     });
};

exports.createAndSavePerson = createAndSavePerson;
```

Tests:
- You must be successful in creating and saving database items


## Create many records with model.create()
Sometimes you need to create many instances of your models.
For example, when seeding a database with initial data.
`Model.create()` takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument and saves it
in the database.

Modify the createManyPeople function to create many people using `Model.create()` with the `arrayOfPeople.` argument

Note: You can reuse the model that you instantiated in the previous exercise.

```javascript
const arrayOfPeople =[
     {"name": "John", "age": 25, "favoriteFoods": ["pizza", "hamburger", "ice cream"]},
     {"name": "Maria", "age": 30, "favoriteFoods": ["sushi", "noodles", "chocolate"]},
     {"name": "Pedro", "age": 20, "favoriteFoods": ["barbecue", "fries", "lasagna"]}
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

Tests
- You must be successful in creating many database items at the same time


## Use model.find() to search your database
In its simplest usage, `Model.find()` accepts a query document (a JSON object) as the first argument and
then a callback.
It returns an array of matches.
It supports an extremely wide range of search options.
Read more in the documentation.

Modify the findPeopleByName function to find all people who have a given name,
using `Model.find() -> [Person]`

Use the function's `personName` argument as the search key.

```javascript
const personName = "John";
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

Tests:
- Find all items matching a criteria successfully


## Use model.findOne() to return a single matching document from your database
`Model.findOne()` behaves like `Model.find()`, but only returns a document (not an array), even if there are
several items.
It's especially useful when searching for properties that you've declared as exclusive.

Modify the `findOneByFood` function to find just one person who has a certain food in their favorites,
using the model `Model.findOne() -> Person`. Use the function's food argument as the search key.

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

Tests:
- You must be successful in finding an item


## Use model.findById() to search your database for _id
When saving a document, MongoDB automatically adds the `_id` field, and sets it to a unique alphanumeric key.
Searching for `_id` is an extremely frequent operation, so Mongoose provides a dedicated method for this.

Modify `findPersonById` to find the only person with a given `_id`, using `Model.findById() -> Person`.
Use the function's personId argument as the search key.

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

Tests:
- You must be successful in finding an item by Id


## Perform classic updates by running Find, Edit and Save
In the good old days, this is what you needed to do if you wanted to edit a document and be able to use it
somehow (i.e. sending the document back in a server response).

Mongoose has a dedicated update method: `Model.update()`.
It is linked to the lowest level mongo driver.
It can bulk edit many documents that match certain criteria, but it does not send back the document
updated, just a 'status' message.
Additionally, it makes model validations difficult because it only calls the mongo driver directly.

Modify the `findEditThenSave` function to find a person by `_id` (use any of the above methods) with the
`personId` parameter as search key.
Add "hamburger" to the person's favoriteFoods list (you can use `Array.push())`.
Then, inside the find callback, use `save()` to save the updated Person.

Note: this can be complicated if in your Schema you declared the favoriteFoods as an array, without specifying
the type (e.g. [String]).
In this case, favoriteFoods defaults to type Mixed and you need to manually mark it as edited using
`document.markModified('edited-field')`.
See our article on Mongoose.

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
Tests:
- You must be successful in finding, editing and upgrading an item


## Perform new updates to a document using model.findOneAndUpdate()
Recent versions of Mongoose have methods to simplify updating documents.
Some more advanced features (such as pre/post hooks, validation, among others) behave differently with
this approach.
Thus, the classical method is still useful in many situations.
`findByIdAndUpdate()` can be used to search by id.

Modify the findAndUpdate function to find a person by Name and set the person's age to 20.
Use the function's personName parameter as the search key.

Note: You must return the updated document.
To do this, you need to pass the options document `{ new: true }` as the third argument
to `findOneAndUpdate()`.
By default, these methods return the unmodified object.

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

Tests:
- Using findOneAndUpdate on an item should be successful


## Delete a document using model.findByIdAndRemove
findByIdAndRemove and findOneAndRemove are like the methods from the previous update.
They pass the removed document to the db.
As usual, use the personId function argument as the search key.

Modify the removeById function to delete a person by the person's _id.
You must use one of the findByIdAndRemove() or findOneAndRemove() methods.


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

Tests:
- Deleting an item must be successful


## Delete multiple documents with model.remove()
`Model.remove()` is useful for deleting all documents that match certain criteria.
Modify the `removeManyPeople` function to delete all people whose name is within the `nameToRemove` variable,
using `Model.remove()`. Pass it to a query document with the name field defined and a callback function.

Note: `Model.remove()` does not return the deleted document, but a JSON object containing the result of the operation and
the number of items affected. Don't forget to pass the object to the `done()` callback function, since we use it in
tests.

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

Tests:
- You must be successful in deleting multiple items


## Chain query helpers to narrow search results
If you don't pass the callback as the last argument to `Model.find()` (or to other search methods),
the query is not executed.
You can store the query in a variable for later use.
This type of object allows you to create a query using chaining syntax.
The actual database search is performed when you finally chain the `.exec()` method.
You always need to pass your callback to this last method.
There are many consultation helpers.
Here, we will use the most common ones.

Modify the queryChain function so that it finds people who like the food specified by the foodToSearch variable.
Sort them by name, limit the results to two documents and hide their age.
Chain together `.find()`, `.sort()`, `.limit()`, `.select()` and then `.exec()`.
Pass the `done(err, data)` callback to `exec()`.

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

Tests:
- You must succeed in chaining query helpers


## References
https://www.freecodecamp.org/learn/back-end-development-and-apis/#mongodb-and-mongoose
, accessed on 02/03/2023.

https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/ , accessed on 02/03/2023.

https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/ , accessed on 02/03/2023.

https://github.com/freeCodeCamp/boilerplate-mongomongoose/ , accessed on 02/03/2023.