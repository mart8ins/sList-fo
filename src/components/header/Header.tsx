import { Link } from "react-router-dom";
import "./header.css";

type Props = {};

const Header = (props: Props) => {
    return (
        <div className="header">
            <div className="top__title">
                <h1>S-list</h1>
            </div>
            <div className="bottom__nav">
                <div className="lang__options">
                    <p>LV</p>
                    <p>ENG</p>
                </div>
                <div className="nav__options">
                    <Link to="recipes">Receptes</Link>
                    <Link to="shopping-list">SList</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
