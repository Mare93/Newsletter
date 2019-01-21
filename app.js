const express = require ('express');
const request = require ('request');
const bodyParser = require ('body-parser');
const path = require ('path');

const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));
//staaticni folder
app.use(express.static(path.join(__dirname, 'public')));


app.post('/signup', (req,res)=>{console.log(req.body);
const {firstName, lastName, email} = req.body;

if(!firstName || !lastName|| !email){
  res.redirect('/fail.html');
  return;
}

//construct req data

const data = {
  members: [
    {
      email_adress: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
}

const postData = JSON.stringify(data);

  const options = {
    url:'https://us20.api.mailchimp.com/3.0/lists/36e5d02cae',
    method: 'POST',
    headers: {
      Authorization:'auth a1a0ccfee341ebc19af71271b5584a87-us20',
      body: postData
    },
  }
  request (options, (err, response, body) =>{
    if(err){
      res.redirect('fail.html');
    }else{
      if(response.statusCode === 200){
        res.redirect('success.html');
      }else{
        res.redirect('fail.html');        
      }
    }
  });

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server pokrenut na portu ${PORT}`));