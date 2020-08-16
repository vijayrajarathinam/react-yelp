require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const db = require("./db");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app.use((req,res)=> console.log("middleware"))

app.get("/api/v1/restaurants", async function(req,res){

    try{
         //const results = await db.query("select * from restaurants order by id desc");    
        
        
        const results = await db.query("select * from restaurants r left join ( select restaurant_id ,round(avg(re.rating),2) as rating from reviews re group by restaurant_id) re on re.restaurant_id = r.id order by id desc");    

        res.status(200).json({
            "status":"success",
            "results": results.rows.length,
            "data":{ "restaurants": results.rows }
        });

    }catch(err){
        console.log(err);
    }    

});


app.get("/api/v1/restaurants/:id", async function(req, res){
    
    try{
        const results = await db.query(
            "select * from restaurants where id = $1",
            [ req.params.id ]
        );
        
        const reviews = await db.query(
            "select * from reviews where restaurant_id = $1",
            [ req.params.id ]
        );

        res.status(200).json({
            "status":"success",
            "data":{ 
                "restaurants": results.rows[0],
                "reviews": reviews.rows
             }
        });

    }catch(err){
        console.log(err);
    }

});


app.post("/api/v1/restaurants",async function(req,res){
    try{
        const results = await db.query(
            "insert into restaurants( name, location, price_range) values($1,$2,$3) returning *",
            [ req.body.name , req.body.location , req.body.price_range ]
        );

        res.status(201).json({
            "status":"success",
            "data":{ "restaurants": results.rows[0] }
        });
    }catch(err){
        console.log(err);    
    }    
    
});


app.put("/api/v1/restaurants/:id", async function(req,res){        
    try{
        const results = await db.query(
            "update restaurants set name=$2, location=$3, price_range=$4 where id=$1 returning *",            
            [ req.params.id , req.body.name , req.body.location , req.body.price_range ]
        );

        res.status(201).json({
            "status":"success",
            "data":{ "restaurants": results.rows[0] }
        });

    }catch(err){
        console.log(err);    
    }    

});

app.delete("/api/v1/restaurants/:id", async function(req,res){
    try{ 
        const results = await db.query(
            "delete from restaurants where id=$1 ",            
            [ req.params.id ]
        );
     
        res.status(204).json({"status":"success"});

    }catch(err){
        console.log(err);    
    }    
});

app.post("/api/v1/restaurants/:id/reviews", async function(req, res){
    try{
        const results = await db.query(
            "insert into reviews (name,restaurant_id,review,rating) values ($1,$2,$3,$4) returning *",            
            [ req.body.name ,req.params.id ,req.body.review, req.body.rating ]
        );
        res.status(201).json({
            "status":"success",
            "data":{ "reviews": results.rows[0] }
        });
    }catch(err){
        console.log(err);    
    }  
});

const PORT = process.env.port || 3000;

app.listen(PORT, function(){
    console.log(`server is listening on port ${PORT}`);
})