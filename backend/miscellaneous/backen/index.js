const express=require("express");
const app=express();
 
app.use(express.urlencoded({extended:true}));

const port=8080;



app.get("/register",(req,res)=>{
    let {user}=req.query;
    res.send(`standard get request.Welcome ${user}`);
  });
  
app.post("/register",(req,res)=>{
    console.log(req.body);
      res.send("standard post request");
    });


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})

