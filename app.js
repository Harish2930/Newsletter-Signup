
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");
const { status } = require("express/lib/response");

const app = express();

const https = require("https");
const { options } = require("request");
const { Auth } = require("request/lib/auth");

app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended : true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

   const data ={
       members: [
           {
               email_address: email,
               status:"subscribed",
               merge_fields: {
               FNAME: firstName,
               LNAME: lastName,
               } 
           }
       ]
   };

   const jsonData = JSON.stringify(data);
   
   const url = "https://us14.api.mailchimp.com/3.0/lists/32af2c39ed";

   const options = {
       method: "POST",
       auth: "harish1:0c106fcc0cd95f2b7bfa88ec7e98ef16-us14"
   }
  const request = https.request(url,options,function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
    } else{
        res.sendFile(__dirname+"/failure.html");
    }
         response.on("data",function(data){
             console.log(JSON.parse(data));
         })
         
  })

     request.write(jsonData);
     request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});






// list Id
// 32af2c39ed


// api key
// 0c106fcc0cd95f2b7bfa88ec7e98ef16-us14