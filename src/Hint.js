import { useState } from "react";

const Hint = ({ definition }) => {
    const [imgURL, setImgURL] = useState('./components/lightbulb-off.png');
    const [hintText, setHintText] = useState('Show Hint');
    const [over, setOver] = useState(false);

    const handleClick = () => {
        setImgURL('./components/lightbulb.png');
        setHintText(definition);
    }
    return (
        <div className="hint">
            <button
                className="hintButton"
                onClick={handleClick}
                onMouseOver={() => setOver(true)}
                onMouseOut={() => setOver(false)}
            >
                <img
                    src={require(`${imgURL}`)}
                    alt="lightbulb"
                />
            </button>
            {
                over && (
                    <div className="hintText">
                        <p>{hintText}</p>
                    </div>
                )
            }
        </div>
    );
}

export default Hint;