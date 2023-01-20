const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


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



app.listen(3000, () => {
    console.log("server is running on port = ", PORT);
})