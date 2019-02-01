const tr = require('tor-request');
const express = require('express')
const app = express();
const port = 3006
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    try {
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    } catch (error) {

    }
});

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));



app.get('/', (req, res) => res.send(`<h1>Working</h1>`));

app.post('/proxyapi', async (req, res) => {
    let result = req.body;
    tr.request({ url: `${result.url}`, headers: { 'user-agent': 'giraffe' } }, function (err, proxyres, body) {
        if (err) {
            console.log(err)
        }
        if (!err && res.statusCode == 200) {
            res.send(body)
        }
    });
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))