const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./database/db");
const uidSafe = require("uid-safe");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

app.use(compression());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);

app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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
    for (let i = 0; i < singleAnswer.length; i++) {
        let answer = singleAnswer[i];
        console.log("answer", answer);
        db.setAnswers(surveyId, answer[0], answer[1])
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
