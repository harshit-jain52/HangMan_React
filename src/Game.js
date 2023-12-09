const Game = ({ word }) => {
    const len = word.length;
    console.log(len);
    const regex = /[A-Z]/

    const handleSubmit = e => {
        e.preventDefault();
        const alpha = document.forms['alpha'];
        const input = alpha.querySelector('input[type="text"]');
        const char = input.value.toUpperCase();
        input.value = "";

        if (!char.match(regex)) {
            const span = alpha.querySelector('span');
            const text = span.textContent;
            span.textContent = "an ALPHABET please";
            setTimeout(() => {
                span.textContent = text;
            }, 1000)
        }
        else {
            console.log(char);
        }

    }
    return (
        <div className="game">
            <h1>The word is {word}</h1>
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