import { HashLoader } from "react-spinners";
import colors from "./styles/_colors.module.scss";

const Loading = () => {
    return ( 
        <div className="loading">
            <HashLoader color={colors.primary} size={220} />
        </div>    
    );
}

export default Loading;