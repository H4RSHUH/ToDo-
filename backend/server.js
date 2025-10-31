const app= require("./app");
const mongoose= require("mongoose");


require('dotenv').config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});