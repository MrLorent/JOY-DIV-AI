const About = () => {
    return (
        <main className="w-full h-[calc(100%_-_var(--footer-height))] pt-[var(--header-height)]">
            <section id="about" className="w-full h-full p-6 flex flex-col">
                <h2 className="uppercase mb-5">{">_ Artistic demarch"}</h2>
                
                <p>
                    Quantum Poetry is a critism of the current apology of deep learning and AI in general. Currently, a lot of people are scared of the AI power to communicate with humans, and its ability to create art throught images or texts. Quantum poetry is a project that traduce the fact that an AI is really not emotionnaly connected to its creation. For it, its is just data structured in a way that it has learn before from other human creation. It is really us, humans, that give it is meaning and its dimension of beauty by the feeling it gives us when we see or read it. And that, we must not forget.
                    To traduce this idea, the general design of the website has been made to look like a cold raw informatic command console, which contract with the feeling of beauty that we can feel when we read some poetry. The material is purely robotic, without any emotion, and it's our reading of it, our sensitivity, our emotions that give it its beauty.
                </p>
                
                <h2 className="uppercase mb-5">{">_ Technical explanation"}</h2>
            </section>
        </main>
    );
}

export default About;