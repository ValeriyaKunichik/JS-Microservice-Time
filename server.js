
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));   

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function (req, res) {
    let datetostr = new Date().toGMTString();
    let dateparsed= Date.parse(datetostr) ;   
    res.json({"unix": dateparsed,"utc": datetostr});

});

app.get("/api/:mydate", function (req, res) {

  let { mydate } = req.params;
  
  if ( isNaN(mydate)){
    let datetostr= new Date(mydate).toGMTString();
    if (datetostr=="Invalid Date"){
      res.json({ error : "Invalid Date" }); 
    }
    else{
    let dateparsed= Date.parse(datetostr) ;   
    res.json({"unix": dateparsed,"utc": datetostr});}}
  else{
    let someDate = new Date(Number(mydate));
    let datetost= new Date(someDate).toGMTString();
    res.json({"unix": Number(mydate),"utc": datetost});
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
