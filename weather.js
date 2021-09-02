const express=require('express')
const https=require('https')
const bodyParser=require('body-parser')
const app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+ "/index.html")
})

app.post("/",function(req,res)
{
    //console.log(req.body.cityName);
    //console.log('post recieved')
    const query=req.body.cityName;
    const apiKey="fc02a326b5df0b27535651ca1f0f7d48"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+""
    https.get(url,(response)=>
    {
     console.log(response.statusCode)
     response.on('data', function(data) 
     { 
         const weatherData=JSON.parse(data)
         const temp=weatherData.main.temp
         const weatherDiscription=weatherData.weather[0].description
         const icon=weatherData.weather[0].icon
         const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
         console.log(weatherDiscription)
         console.log(temp)
         console.log(weatherData)
         const object={
             name:"sabitha",
             favouriteFood:"chicken biryani"
         }
         console.log(JSON.stringify(object))
       
        res.write("<p>the weather is like "+weatherDiscription+"</p>" )
         res.write("<h1>the temparature in "+ query+" is " +temp+ "degree celcius</h1>")
         res.write("<img src="+imageUrl+">")

         res.send()
     })
    })
   //res.send("server is up and  running")
})


app.listen(8001,()=>
{   
console.log('server is running on 8001')
})