require('dotenv').config();

const express = require("express");
const mongoose = require("mongooose");

const app = express();
const port = 3000;
const connection_url = process.env.MONGO_URI;

mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = {
    name : String,
    age: Number,
    favoriteFoods : [String]
};

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
    let person = new Person({"name": "João", "age": 25, "favoriteFoods": ["pizza", "hambúrguer", "sorvete"]});
    person.save(function (err, data){
        if (err) {
            return console.error(err);
        }
        done(null, data);
    });
};

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

const personName = "João";
const findPeopleByName = (personName, done) => {
    Person.find({name : personName}, function(err, personFound){
        if(err) {
            return console.error(err);
        }
        done(null, personFound);
    });
};

const favoriteFood = "pizza";
const findOneByFood = (favoriteFood, done) => {
    Person.findOne({food : favoriteFood}, function(err, personFound){
        if(err){
            return console.error(err);
        }
        done(null, personFound);
    });
};

const personId = "6586daaf0ca46f4ddfbc6654";
const findPersonById = (personId, done) => {
    Person.findById({_id : personId}, function(err, personFound){
        if(err){
            return console.error(err);
        }
        done(null, personFound);
    });
};


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

// const personName = "João";
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({_id: personName}, {age: ageToSet}, { new: true }, function(err, personUpdated){
        if(err){
            console.error(err);
        }
        done(null, personUpdated);
    });
};

// const personId = "6586daaf0ca46f4ddfbc6654";
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, function(err, personRemoved){
        if(err){
            console.error(err);
        }
        done(null, personRemoved);
    });
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name: nameToRemove}, function(err, data){
        if(err){
            console.error(err);
        }
        done(null, data);
    })
};

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

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;