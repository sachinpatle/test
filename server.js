const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


//This is for the database connect mongoose 
require('./connection/connectionMongoLocal');


const bruteforce = require('./middleware/checkRateLimit');

app.use(bruteforce('global', 100, 5))

app.get('v1/users', bruteforce('users', 50, 1), function (req, res) {

})

app.get('v1/apps', async function (req, res) {
  try {
    await bruteforce('apps', 30, 2)
  } catch (err) {
    res.error(err.code).send(err.message)
  }
})

//calling this  function from the frontEnd.
async function parse() {
  try {
      // Fetch packages list from API
      const response = await fetch("https://api.fliplet.com/v1/widgets/assets");
      const packages = await response.json();

      // Initialize assets list
      const assets = [];

      // Iterate over packages and extract assets
      for (let package of packages) {
          if (package.assets) {
              for (let asset of package.assets) {
                  assets.push(asset);
              }
          }
      }

      return assets;
  } catch (error) {
      console.error(`Error fetching and parsing packages from API: ${error}`);
  }
}

//here i am suppose to consider the mongodb has the data as present in the sampleData json
app.post("/getAppDetailsById", (req, res) => {
  User.find({ id: 123 },{ published: true })
      .select("id title")
      .then(users => {
          if (!users) {
              return res.status(400).json({ error: "No such user is present with that id" });
          }
          res.send(users);
      })
      .catch(err => {
          console.log(err);
      })
})

//here i am suppose to consider the mongodb has the data as present in the sampleData json
app.post("/getOrganizationsDetailsById", (req, res) => {
  User.find({ id: 123 },{ suspended: false })
      .select("name")
      .then(users => {
          if (!users) {
              return res.status(400).json({ error: "No such user is present with that id" });
          }
          res.send(users);
      })
      .catch(err => {
          console.log(err);
      })
})

app.listen(3000, () => {
    console.log("server is running on port = ", PORT);
})