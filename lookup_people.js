const pg = require("pg");
const settings = require("./settings");
let input = process.argv.slice(2)[0];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = $1::text OR first_name = $1::text", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Found 1 person by the name: ", input, "\n", "-", result.rows[0].id + ":", result.rows[0].first_name, result.rows[0].last_name, "born:", result.rows[0].birthdate);
    client.end();
  });
});