const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/akshaydb', { useNewUrlParser: true });
const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });

  const Contact = mongoose.model('dancecontact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
 var myData = new Contact(req.body);
 myData.save().then(()=>{
     res.send("This item has been saved to the database")
 }).catch(()=>{
     res.status(400).send("Item has not been saved to the database")
 });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on http://localhost:${port}`);
});
