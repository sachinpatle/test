const mongoose = require('mongoose');
const mongourl = "mongodb+srv://testxyz";
mongoose.set('strictQuery', false)
mongoose.connect(mongourl).then(() => {
    console.log("connected to the mongoose");
}).catch((err) => {
    console.log("mongodb error", err);
});


