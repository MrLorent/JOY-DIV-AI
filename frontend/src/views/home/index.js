import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="w-full h-[calc(100%_-_var(--footer-height))] pt-[var(--header-height)]">
            <section id="main" className="w-full h-full p-6 flex flex-col justify-center items-center">
                <h2 className="text-6xl uppercase">{">_ Quantum Poetry"}</h2>

                {/* QUANTUM POETRY LINK */}
                <Link to="/quantum_poetry" className="call-to-action mt-16">
                    Create your own poem
                </Link>

            </section>
        </main>
    );
}

export default Home;