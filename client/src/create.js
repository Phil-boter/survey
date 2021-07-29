import axios from "./axios";
import { useEffect, useState } from "react";

import "./css/create.css";

export default function Create() {
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([questions]);
    const [content, setContent] = useState({});
    const [secretLink, setSecretLink] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log("Title", e.target.value);
    };

    const handleInput = (e) => {
        // console.log("content value", e.target.value);
        setContent({ ...content, [e.target.id]: e.target.value });
    };

    const addQuestion = (e) => {
        // console.log("click addQuestion");
        e.preventDefault();
        setQuestions([...questions, ""]);
    };

    const removeQuestion = (e) => {
        // console.log("click removeQuestion");
        e.preventDefault();
        setQuestions([...questions].slice(0, -1));
    };

    const handleSubmit = (e) => {
        // console.log("submit");
        e.preventDefault();
        axios
            .post("/survey-question", {
                title: title,
                content: content,
            })
            .then(({ data }) => {
                // console.log("DATA", data);
                if (data.success) {
                    const { secretLink, surveyId } = data;
                    setSecretLink(secretLink);
                    location.replace(`/results/${surveyId}/${secretLink}`);
                } else {
                    console.log("error in post survey", error);
                    setError(true);
                }
            });
    };
    useEffect(() => {
        setContent({});
    }, [setContent]);

    return (
        <>
            <h1 className="survey-headline">Your new survey</h1>
            <section>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat.
                </p>
            </section>
            {error && (
                <p>
                    Sorry! something went wrong. Be shure to fill out every from
                </p>
            )}
            <form className="form">
                <input
                    className="form-input"
                    type="text"
                    name="title"
                    onChange={(e) => handleTitle(e)}
                    placeholder="Title"
                ></input>

                {questions.map((question, index) => {
                    return (
                        <div key={index} className="question-container">
                            <input
                                className="form-input"
                                placeholder="Question"
                                type="text"
                                id={index}
                                onChange={(e) => handleInput(e)}
                            ></input>
                            {index >= 1 ? (
                                <button className="button remove">
                                    <div onClick={removeQuestion}>X</div>
                                </button>
                            ) : null}
                        </div>
                    );
                })}

                <div className="add" onClick={addQuestion}>
                    + add question
                </div>
            </form>
            <button className="button submit" onClick={(e) => handleSubmit(e)}>
                Publish survey
            </button>
        </>
    );
}
