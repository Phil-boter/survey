const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./database/db");
const uidSafe = require("uid-safe");
const { link } = require("fs");

app.use(compression());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.urlencoded({ extended: false }));

app.post("/survey-question", (req, res) => {
    console.log("post in survey-queston");
    console.log("req body", req.body);
    const { title, content } = req.body;
    let singleQuestion = Object.entries(content);
    console.log("arrQ", singleQuestion);
    db.newSurvey(title)
        .then(({ rows }) => {
            console.log("title saved to database", rows[0].id);
            let surveyId = rows[0].id;
            uidSafe(24).then((uid) => {
                console.log("UID", uid);
                for (let i = 0; i < singleQuestion.length; i++) {
                    console.log("single1", singleQuestion[i][0]);
                    console.log("single2", singleQuestion[i][1]);

                    db.addQuestion(
                        surveyId,
                        singleQuestion[i][0],
                        singleQuestion[i][1],
                        uid
                    ).then(() => {
                        console.log("questions added");
                    });
                }
                res.json({
                    success: true,
                    surveyId: surveyId,
                    secretLink: uid,
                });
            });
        })
        .catch((error) => {
            console.log("error in newSurvey", error);
            res.json({ success: false });
        });
});

app.get("/getQuestions/:surveyId", (req, res) => {
    console.log("get getQuestions", req.params);
    db.getQuestions(req.params.surveyId)
        .then(({ rows }) => {
            res.json({
                // success: true,
                rows,
            });
        })
        .catch((error) => {
            console.log("error in getQuestions", error);
            res.json({ success: false });
        });
});

app.post("/answer", (req, res) => {
    console.log(" post answer");
    console.log("req body in answer", req.body);

    const { surveyId, answers } = req.body;
    let singleAnswer = Object.entries(answers);
    console.log("singleAnswer", singleAnswer);
    for (let i = 0; i <= singleAnswer[0].length; i++) {
        console.log("I in answers", singleAnswer[i][1]);
        db.setAnswers(surveyId, singleAnswer[i][0], singleAnswer[i][1])
            .then(() => {
                console.log("answer saved to database");
                res.json();
            })
            .catch((error) => {
                console.log("error in setAnswer", error);
                res.json({ success: false });
            });
    }
});

app.get("/getAnswers/:surveyId", (req, res) => {
    console.log("get getQuestions", req.params);
    db.getAnswers(req.params.surveyId)
        .then(({ rows }) => {
            res.json({
                success: true,
                rows,
            });
        })
        .catch((error) => {
            console.log("error in getAnswers", error);
            res.json({ success: false });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
