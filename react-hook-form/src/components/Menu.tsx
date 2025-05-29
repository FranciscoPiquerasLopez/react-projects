import { NavLink } from "react-router";

const Menu = () => {
    return (
        <div className="menu">
            <ul className="menu-ul">
                <li className="menu-ul-li">
                    <NavLink to="/register">Register</NavLink>
                </li>
                <li className="menu-ul-li">
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Menu;