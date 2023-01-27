// LIBRARIES
import { useState } from "react";

const OpenAIForm = ({ send_prompt }) => {
    /*======== ATTRIBUTS ========*/
    const [prompt, set_prompt] = useState("You are a poet. Write me a poem inspired by the following words: roses, dark, beauty");

    /*======== METHODS ========*/
    const handle_change = (event) => {
        set_prompt(event.target.value);
    };

    const handle_submit = (event) => {
        event.preventDefault();
        send_prompt(prompt)
    };

    /*======== RENDERER ========*/
    return (
        <form className="w-full h-1/4 mb-5 flex flex-col" onSubmit={handle_submit}>
            <label htmlFor="prompt" className="mb-3">Prompt for poem generation :</label>
            <textarea
                id="prompt"
                name="prompt"
                maxLength="500"
                placeholder="You are a poet. Write me a poem inspired by the following words: roses, dark, beauty"
                className="w-full h-full px-2 py-1 resize-none bg-background border border-tertiary rounded-lg focus:outline-none focus:border-primary"
                onChange={handle_change}
                defaultValue="You are a poet. Write me a poem inspired by the following words: roses, dark, beauty"
            >
                
            </textarea>
            <button type="submit">Generate Poem</button>
        </form>
    );
}

export default OpenAIForm;