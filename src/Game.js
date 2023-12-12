import { useEffect, useState } from "react";
import Hint from "./Hint";
let enteredChars = null;
let wordChars = null;
let validChars = null;

const Game = ({ word, definition }) => {
    // console.log(word, definition);
    useEffect(() => {
        enteredChars = new Set();
        wordChars = word.split("");
        validChars = new Set(wordChars);
    }, [word]);

    const regex = /[A-Z]/
    const [toDisplay, setToDisplay] = useState(Array(word.length).fill('_'));
    const [hang, setHang] = useState(0);
    const [inputChar, setInputChar] = useState('');
    const [message, setMessage] = useState("Enter an alphabet...");

    useEffect(() => {
        if (!toDisplay.some((char) => char === '_')) {
            endGame(true);
        }
        else if (hang === 5) {
            endGame(false);
        }
    }, [hang, toDisplay])

    const displayChars = () => {
        let newDisplay = [];
        wordChars.forEach((char) => {
            newDisplay.push(enteredChars.has(char) ? char : '_');
        })
        setToDisplay(newDisplay);
    }

    const displayMessage = msg => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("Enter an alphabet...");
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault();
        const char = inputChar.toUpperCase();
        setInputChar('');

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
        const hint = document.querySelector('.hint');
        const lastMsg = document.querySelector('.chances h3');
        input.parentElement.removeChild(input);
        hint.parentElement.removeChild(hint);

        const display = document.querySelector('.displayWord');
        let html = "";
        wordChars.forEach(char => html += `<span>${char}</span>`);
        display.innerHTML = html;

        if (result) {
            display.style.color = "#2ec27e";
            lastMsg.textContent = "Correct Guess!";
        }
        else {
            display.style.color = "#ed333b";
            lastMsg.textContent = "Better Luck Next Time :(";
        }
    }
    return (
        <div className="game">
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
                        value={inputChar}
                        onChange={(e) => setInputChar(e.target.value)}
                    >
                    </input>
                    <span>{message}</span>
                </form>
            </div>
            <div className="chances">
                <h3>{5 - hang} chances remaining</h3>
            </div>
            <Hint definition={definition} />
        </div>
    );
}

export default Game;