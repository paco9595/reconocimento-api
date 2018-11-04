const exec = require('child_process').exec;
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());
app.use(express.static('public'));

app.get('/', function (req, res) {
    return res.status(200).sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {
    const url = req.body.url;
    if (!url) return res.status(400).send({ msg: 'No.' });
    const img = url.split(';base64,').pop();
    fs.writeFile('./img/img.png', img, { encoding: 'base64' }, function (err) {
        if (err) return res.status(500).send({ msg: 'imagen no gusrdad' })
        exec("python hola.py", function (err, stdout, stderr) {
            if (err) return res.status(500).send({ msg: 'error al ejecutar' })
            return res.status(200).send({ans: stdout})
        });
    });
});

app.listen(3000, () => {
    console.log('done')
});

