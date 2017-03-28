const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: settings
});
let input = process.argv.slice(2)[0];

console.log("commencing the realness...");

knex.select('*').from('famous_people')
.where('last_name', '=', input)
.orWhere('first_name', '=', input)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
      console.log("Found", rows.length, "person(s) by the name: ", input, "\n", "-", rows[0].id + ":", rows[0].first_name, rows[0].last_name, "born:", rows[0].birthdate);
});

