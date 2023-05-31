import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="h-full flex items-center">
            <Link className="text-sm uppercase" to="/about">About</Link>
            <Link className="text-sm uppercase ml-5" to="/quantum_poetry">Poetry Lab</Link>
        </nav>
    );
}

export default Nav;