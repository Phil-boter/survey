import { Component } from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function Create() {
    const history = useHistory();
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [content, setContent] = useState({});
    const [secretLink, setSecretLink] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log("Title", e.target.value);
    };

    const handleInput = (e) => {
        console.log("content value", e.target.value);
        setContent({ ...content, [e.target.id]: e.target.value });
    };

    const addQuestion = () => {
        console.log("click addQuestion");
        setQuestions([...questions, ""]);
    };

    const removeQuestion = () => {
        console.log("click removeQuestion");
        setQuestions([...questions].slice(0, -1));
    };

    const handleSubmit = (e) => {
        console.log("submit");
        e.preventDefault();
        axios
            .post("/survey-question", {
                title: title,
                content: content,
            })
            .then(({ data }) => {
                console.log("DATA", data);
                const { secretLink, surveyId } = data;
                // setSecretLink(secretLink);
                // location.replace(`/results/${surveyId}`);
                history.push(`/results/${surveyId}`);
            });
    };

    return (
        <>
            <h1>Your new survey</h1>
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
                <P>
                    Sorry! something went wrong. Be shure to fill out every from
                </P>
            )}
            <form>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => handleTitle(e)}
                    placeholder="Title"
                ></input>
                {error}
                {questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <input
                                placeholder="Question"
                                type="text"
                                id={index}
                                onChange={(e) => handleInput(e)}
                            ></input>

                            <div onClick={removeQuestion}>removeQustion</div>
                        </div>
                    );
                })}
                <p onClick={addQuestion}>addQuestion</p>
                <button onClick={(e) => handleSubmit(e)}>Publish survey</button>
            </form>
        </>
    );
}
