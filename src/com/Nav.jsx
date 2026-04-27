import { Link } from "react-router-dom";
import "./styles/NavBar.css";

function NavBar() {
    const navItems = [
        { name: "Main", to: "/" },
        { name: "About", to: "/about" },
        { name: "Login", to: "/login" },
        { name: "Register", to: "/register" },
    ];

    return (
        <div className="nav">
            <p className="JSV">CourseShare</p>

            <ul className="list">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.to} className="router_name">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavBar;
