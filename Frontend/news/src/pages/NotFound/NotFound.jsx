import ScarecrowImage from "../../assets/Scarecrow.png";
import "./NotFound.css";
import { NavLink } from "react-router-dom";

export function NotFound() {
    return (
        <div>
            <h1 className="nav">404 Not found</h1>
            <div className="display">
                <div className="display__img">
                    <img src={ScarecrowImage} alt="404-Scarecrow" />
                </div>
                <div className="display__content">
                    <h2 className="display__content--info">I have bad news for you</h2>
                    <p className="display__content--text">
                        The page you are looking for might be removed or is temporarily
                        unavailable
                    </p>
                    <button><NavLink to="/home" className="btn">Back to homepage</NavLink></button>
                </div>
            </div>
        </div>
    );
}
