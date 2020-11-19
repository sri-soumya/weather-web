const express = require("express");
const path= require('path');
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app= express();

const port= process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,"../public")));
app.set("view engine","hbs");
app.set("views", path.join(__dirname,"../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
//hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req,res)=>{
    res.render("index", {
        title: "Weather app",
        name: "Soumya"
    })
});

app.get("/about",(req,res)=>{
    res.render("about",{
        title: "About",
        name: "Soumya"
    })
});

app.get("/help",(req,res)=>{
    res.render("help",{
        title: "Help",
        help: "Always there to help", 
        name: "Soumya"
    })
});


app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send({
            error: "Please enter a valid location."
        });

  
    
    geocode(req.query.address, (error, response)=>{
        if (error)
            return res.send({error});

        forecast(response.latitude, response.longitude,(error, forecastData)=>{
            if(error)
                return res.send({error});
            res.send({
                forecast: forecastData,
                location: response.location,
                address: req.query.address
            })
        })
    })

});
app.get("/help/*",(req,res)=>{
    res.render("404page",{
        title: "My 404 page",
        name:"Soumya",
        mess: "Help article not found"
    })
});

app.get('*',(req,res)=>{
    res.render("404page",{
        title:"My 404 page",
        name:"Soumya",
        mess: "Page not found" 
    })
});


app.listen(port,()=>{
    console.log("Server is running");
 });