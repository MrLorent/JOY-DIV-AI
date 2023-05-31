import { Link } from "react-router-dom";
import Nav from "./Nav";

const header = () => {
    //if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    // }
    // else {
    //     document.documentElement.setAttribute('data-theme', 'light');
    //     localStorage.setItem('theme', 'light'); //add this
    // }   

    return (
        <header className="w-full h-[var(--header-height)] flex justify-between items-center fixed top-0 px-6 border-b border-tertiary">
            <Link to="/">
                <h1>{">_ QUANTUN POETRY"}</h1>
            </Link>

            {/* NAV */}
            <Nav/>
        </header>
    );
}

export default header;