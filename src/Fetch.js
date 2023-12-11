import { useEffect, useState } from "react";
import Loading from "./Loading";
import Game from "./Game";

const Fetch = () => {
    const [word, setWord] = useState(null);
    const [error, setError] = useState(null);
    const [definition, setDefinition] = useState(null);

    useEffect(() => {
        fetch("https://random-words-api-harshit-jain52s-projects.vercel.app/word/noun")
            .then(response => {
                if (!response.ok) {
                    throw new Error("could not fetch the data");
                }
                return response.json();
            })
            .then(data => {
                setWord(data[0].word.toUpperCase());
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    useEffect(() => {
        if (word) {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("could not fetch the data");
                    }
                    return response.json();
                })
                .then(data => {
                    setDefinition(data[0].meanings[0].definitions[0].definition);
                    setError(null);
                })
                .catch(err => {
                    setError(err.message);
                });
        }
    }, [word]);

    return (
        <div className="fetch">
            {error && <div className="error">{error}</div>}
            {!error && ((word && definition) ? <Game word={word} definition={definition} /> : <Loading />)}
        </div>
    );
}

export default Fetch;