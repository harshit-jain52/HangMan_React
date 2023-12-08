import Game from './Game'
import Welcome from './Welcome';
import { useState } from 'react';

const Home = () => {

    const [toggle, setToggle] = useState(false);
    const [buttonText, setButtonText] = useState("play");

    const handleClick = () => {
        setToggle(toggle => !toggle);
        setButtonText(toggle ? "play" : "restart");
    }
    return (
        <div>
            {
                !toggle ? <Welcome /> : <Game />
            }
            <button onClick={handleClick}>{buttonText}</button>
        </div>);
}

export default Home;