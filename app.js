const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const e = require('express');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/singup.html");
});

app.post("/", function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsondata = JSON.stringify(data);
    const url = " https://us21.api.mailchimp.com/3.0/lists/82c9db563d";
    const Options = {
        method: "POST",
        auth: "kuntal:3ff9d1e1125488835f2b27b68a79fdc2-us21"
    }
    const request = https.request(url, Options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on("data", function (data) {
        //     console.log(JSON.parse(data));
        // })
    })
    request.write(jsondata);
    request.end();
});


app.post('/failure', function (req, res) {
    res.redirect('/');
});
app.listen(process.env.PORT || 3000, function () {
    console.log('listening');
})