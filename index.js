const  express = require ("express");
 const  bodyParser = require("body-parser");
 const  mongoose = require("mongoose");
 const  dotenv = require("dotenv");

 const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const username = process.env.MONGODB_NAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.62ovn8q.mongodb.net/registration_from_usign_nodeJs`,{
    useNewUrlParser: true, 
    useUnifiedTopology : true,
});


const registrationSchema = new mongoose.Schema(
    {
        name : String,
        email: String,
        password: String
    }
);

const Registration = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req, res)=>{
    res.sendFile(__dirname +"/pages/index.html");
})

app.post("/register", async (req, res)=>{
    try{
        const existingUser = await Registration.findOne({email: email});
        if (!existingUser){
        const {name, email, password} =req.body;
        const registrationData= new Registration({
            name, 
            email,
            password
        });
        await registrationData.save();
        res.redirect("/success");
    }
    else{
        alert("User are alredy exists");
        res.redirect("/error");
    }
    }
    catch(error){
        console.log(error);
        res.redirect("error");
    }
})

app.get("/success",(req, res)=>{
    res.sendFile(__dirname+"/pages/success.html");
})


app.get("/error",(req, res)=>{
    res.sendFile(__dirname+"/pages/error.html");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})