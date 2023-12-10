import { useEffect, useState } from "react";
let enteredChars = null;

const Game = ({ word }) => {
    console.log(word);
    useEffect(() => {
        enteredChars = new Set();
    }, []);

    const regex = /[A-Z]/
    const wordChars = word.split("");
    const [toDisplay, setToDisplay] = useState(Array(word.length).fill('__'));
    
    const displayChars = () => {
        let newDisplay = [];
        wordChars.forEach((char) => {
            newDisplay.push(enteredChars.has(char) ? char : '__');
        })
        setToDisplay(newDisplay);
        console.log(newDisplay.some((char) => char === '__'));
    }

    const displayMessage = message => {
        const span = document.forms['alpha'].querySelector('span');
        const text = span.textContent;
        span.textContent = message;
        setTimeout(() => {
            span.textContent = text;
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault();
        const input = document.forms['alpha'].querySelector('input[type="text"]');
        const char = input.value.toUpperCase();
        input.value = "";

        if (!char.match(regex)) {
            displayMessage("an ALPHABET please")
        }
        else {
            if (enteredChars.has(char)) {
                displayMessage("alphabet already entered")
            }
            else {
                enteredChars.add(char);
                displayChars();
            }
        }
    }

    return (
        <div className="game">
            <h1>The word is...</h1>
            <div className="displayWord">
                {toDisplay.map((char, idx) => (
                    <span key={idx}>{char}</span>
                ))}
            </div>
            <div className="input">
                <form
                    id="alpha"
                    action="submit"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="char"
                        type="text"
                        minLength="1"
                        maxLength="1"
                    >
                    </input>
                    <span>Enter an alphabet...</span>
                </form>
            </div>

        </div>
    );
}

export default Game;