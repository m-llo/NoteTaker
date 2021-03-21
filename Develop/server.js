const fs = require('fs');
const express = require('express');
const path = require('path');
const { json } = require('express');

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

function Note (title, text) {
    
    this.title = title,
    this.text = text
}

//HTML Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes',(req, res) => {

    fs.readFile('./db/db.json','utf8',(err, data) =>{
        if (err) throw err;
       data = JSON.parse(data);
        res.json(data)
    });

});


app.post('/api/notes', (req, res) => {
//   readfile, get file, adjust content, 
 
const newNote = req.body;
console.log(newNote);

fs.readFile('./db/db.json',(err,data) => {
    if(err) throw err;

})

const noteString = JSON.stringify(newNote)


  fs.writeFile("./db/db.json", noteString, (err) => {
      err ? console.error(err) : console.log('success!')
  })


 ;
}); 

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));









app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));