import { useEffect, useState } from "react";
let enteredChars = null;

const Game = ({ word, definition }) => {
    console.log(word, definition);
    useEffect(() => {
        enteredChars = new Set();
    }, []);

    const regex = /[A-Z]/
    const wordChars = word.split("");
    const validChars = new Set(wordChars);
    const [toDisplay, setToDisplay] = useState(Array(word.length).fill('__'));
    const [hang, setHang] = useState(0);

    useEffect(() => {
        if (!toDisplay.some((char) => char === '__')) {
            endGame(true);
        }
        else if (hang === 5) {
            endGame(false);
        }
    }, [hang, toDisplay])

    const displayChars = () => {
        let newDisplay = [];
        wordChars.forEach((char) => {
            newDisplay.push(enteredChars.has(char) ? char : '__');
        })
        setToDisplay(newDisplay);
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
                if (validChars.has(char))
                    displayChars();
                else {
                    setHang(hang + 1);
                }
            }
        }
    }

    function endGame(result) {
        const input = document.querySelector('.input');
        input.parentElement.removeChild(input);

        const display = document.querySelector('.displayWord');
        let html = "";
        wordChars.forEach(char => html += `<span>${char}</span>`);
        display.innerHTML = html;

        if (result) {
            display.style.color = "#2ec27e";
        }
        else {
            display.style.color = "#ed333b";
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
            <div className="chances">
                <h3>{5 - hang} chances remaining</h3>
            </div>
        </div>
    );
}

export default Game;