const { faker } = require('@faker-js/faker');
const mysql=require("mysql2");

const express=require("express");
const app=express();

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

//as we are getting patch/post data so for parsing it
app.use(express.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'college',
    password:'Csking@23',
  });

  // to generate fake user using faker package
  let  createRandomUser=()=> {
    return [
       faker.string.uuid(),
       faker.internet.username(),
       faker.internet.email(),
      faker.internet.password(),
    ];
  }

  //queries
//   let query="INSERT INTO user (id,username,email,password) VALUES ?";

//   //100 fake user generation 
//   let fakeUser=[];
//   for(let i=0;i<100;i++){
//     fakeUser.push(createRandomUser());
//   }
//   try{
//     connection.query(query,[fakeUser],(err,res)=>{
//         if(err)
//         throw err;
//         console.log(res);
//     });
//   }catch(err){
//     console.log(err);
//   }
// connection.end();


//home page route
app.get("/",(req,res)=>{
    let q="SELECT COUNT(*) FROM user";
    try{
            connection.query(q,(err,result)=>{
                if(err)
                throw err;
                let count=result[0]["COUNT(*)"]
                res.render("home.ejs",{count});
            });
          }catch(err){
            console.log(err);
            res.send("some error occured .");
          }
});

//show user details route
app.get("/user",(req,res)=>{
    let query=`SELECT * FROM user`;
    try{
        connection.query(query,(err,users)=>{
            if(err)
            throw err;
            res.render("user.ejs",{users});
        });
      }catch(err){
        console.log(err);
        res.send("some error occured .");
      }

})

//Edit Route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let query=`SELECT * FROM user WHERE ID="${id}"`;// remember about "" logic to get string value
    try{
        connection.query(query,(err,result)=>{
            if(err)
            throw err;
            let user=result[0];
            console.log(result);
            res.render("edit.ejs",{user});
        });
      }catch(err){
        console.log(err);
        res.send("some error occured .");
      }
});

//Update(DB) Route
app.patch("/user/:id",(req,res)=>{

    let {id}=req.params;
    let query=`SELECT * FROM user WHERE ID="${id}"`;
    let{password:formpass,username:newUsername}=req.body;
    try{
        connection.query(query,(err,result)=>{
            if(err)
            throw err;
            let user=result[0];
            if(formpass!==user.password){
            res.send("Wrong Password Imposter");
            }
            else{
            let query2=`UPDATE user SET USERNAME='${newUsername}' WHERE id ="${id}"`;///Remember for string logic 
            try{
                connection.query(query2,(err,result)=>{
                    if(err) 
                    throw err;
                    res.redirect("/user");
                });
            }catch(err){
                res.send("some error occured");
            } 
        }   
        });
      }catch(err){
        console.log(err);
        res.send("some error occured .");
      }
});

const port=8080
app.listen(port,()=>{
    console.log("server is listening to port 8080");
});
