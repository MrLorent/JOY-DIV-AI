import { useState } from "react";

const PoemForm = ({ send_poem }) => {
    /*======== METHODS ========*/
    const [poem, set_poem] = useState("");

    /*======== METHODS ========*/
    const handle_change = (event) => {
        set_poem(event.target.value);
    };

    const handle_submit = (event) => {
        event.preventDefault();
        send_poem(poem);
    };

    /*======== RENDERER ========*/
    return (
        <div className="w-1/2 h-full">
            <form className="w-full h-full grow flex flex-col" onSubmit={handle_submit}>
                <textarea
                    id="poem"
                    name="poem"
                    maxLength="500"
                    placeholder="Demain dès l'aube..."
                    className="w-full h-full px-2 py-1 resize-none bg-background border border-tertiary rounded-lg focus:outline-none focus:border-primary"
                    onChange={handle_change}
                >

                </textarea>
                <button type="submit">Illustrate Poem</button>
            </form>
        </div>
    );
}

export default PoemForm;