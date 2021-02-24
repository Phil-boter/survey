import axios from "./axios";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

import "./css/results.css";

export default function Results({ surveyId, secretLink }) {
    const [results, setResults] = useState([]);
    const [link, setLink] = useState("");
    const [reAnswers, setReAnswers] = useState([]);

    useEffect(() => {
        console.log("Results mounted");
        axios.get(`/getQuestions/${surveyId}`).then(({ data }) => {
            console.log("data in results", data);
            setResults(data.rows);
            setLink(data.rows[0].link);
        });
    }, []);

    useEffect(() => {
        axios.get(`/getAnswers/${surveyId}`).then(({ data }) => {
            console.log("data in getAnswers", data.rows);
            setReAnswers(data.rows);
        });
    }, []);

    const copyToClipboard = (e) => {
        console.log("Copying to Clipboard", e.target);
        copy(`http://localhost:3000/participate/${surveyId}/${link}`);
    };

    return (
        <>
            {" "}
            <div className="banner-bookmark">
                <p>You should really bookmark this page!</p>
            </div>
            <h1 className="survey-headline">Your new Survey</h1>
            <section>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
            </section>
            <div>
                <button className="copy" onClick={(e) => copyToClipboard(e)}>
                    <img src="/copy-white.png" />
                    Copy Link to ClipBoard
                </button>
            </div>
            <div className="result-container">
                <h1 className="survey-headline results">Results</h1>
                {results.map((result, index) => {
                    return (
                        <>
                            <div key={index}>
                                <h3>{result.question}</h3>
                            </div>
                            <>
                                {reAnswers && reAnswers.length != 0 ? (
                                    <div></div>
                                ) : (
                                    <p>There are no answers so far</p>
                                )}
                            </>

                            {reAnswers &&
                                reAnswers.map((answer) => {
                                    let id = result.id;
                                    let qId = answer.questions_id;
                                    console.log("resultId", id);
                                    console.log("qUd", qId);
                                    if (qId == id) {
                                        return (
                                            <div
                                                key={answer.id}
                                                className="result-list"
                                            >
                                                <ul>
                                                    <li>
                                                        <p>{answer.answers}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        );
                                    } else {
                                        return;
                                    }
                                })}
                        </>
                    );
                })}
            </div>
        </>
    );
}
