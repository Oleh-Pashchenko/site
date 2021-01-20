var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var public = path.join(__dirname, 'public');
var config = require('./config');
var http = require('http');
var https = require('https');

const TG = require('telegram-bot-api')

const api = new TG({
    token: config.bot
})

api.setMessageProvider(new TG.GetUpdateMessageProvider())
api.start()
.then(() => {
    console.log('API is started')
})
.catch(console.err)


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/.well-known/acme-challenge/GjMaNG5Hj4qGIGH8dGtN-FOlaht_m2yagehNepuI59o', function(req, res) {
    res.sendFile(path.join(public, 'file.txt'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.post('/sendMessage', function(req, res) {
let text;

    if (req.body.site) {
        text = `
<b>Новая заявка</b>
<b>ФИО:</b> ${req.body.name}
<b>Номер телефона:</b> ${req.body.phone}
<b>Тип заявки:</b> ${req.body.type}
<b>Тематика:</b> ${req.body.theme}
<b>Кол-во клиентов:</b> ${req.body.clients}
<b>Instagram:</b> ${req.body.site}`
    } else {
        text = `
<b>Новая заявка</b>
<b>ФИО:</b> ${req.body.name}
<b>Номер телефона:</b> ${req.body.phone}
<b>Тип заявки:</b> ${req.body.type}`
    }

    api.sendMessage({
        chat_id: '-1001292368311',
        text,
        parse_mode: 'html',
    });

    res.json();
});

app.use('/', express.static(public));

http.createServer(app).listen(80, () => {
    console.log('Listening...')
  })
  
  https
    .createServer(
      {
        key: fs.readFileSync('/etc/letsencrypt/live/target-hunter.site/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/target-hunter.site/cert.pem'),
        ca: fs.readFileSync('/etc/letsencrypt/live/target-hunter.site/chain.pem'),
      },
      app
    )
    .listen(443, () => {
      console.log('Listening...')
    })