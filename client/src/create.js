import { Component } from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Create() {
    const [input, setInput] = useState("");

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
            <div>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Title"
                ></input>
            </div>
        </>
    );
}
