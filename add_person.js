const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

let input1 = process.argv.slice(2)[0];
let input2 = process.argv.slice(2)[1];
let input3 = process.argv.slice(2)[2];

function addPerson (firstName, lastName, birthdate) {
  let date = new Date(birthdate);
  knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: date})
.catch(function(err){
  console.log(err);
})
}

addPerson(input1, input2, input3);