const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./database/db");

app.use(compression());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.urlencoded({ extended: false }));
app.post("/survey-question", (req, res) => {
    console.log("post in survey-queston");
    console.log("req body", req.body);
    const { title, content } = req.body;
    db.newSurvey(title).then(({ rows }) => {
        console.log("title saved to database");
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
