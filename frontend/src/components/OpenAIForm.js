// LIBRARIES
import { useState } from "react";

const OpenAIForm = ({ unwrap, send_prompt }) => {
    /*======== ATTRIBUTS ========*/
    const DEFAULT_PROMPT = "Write me a Baudelaire like poem in French, inspired by the following words: roses, dark, beauty";
    const [prompt, set_prompt] = useState(DEFAULT_PROMPT);

    /*======== METHODS ========*/
    const handle_change = (event) => {
        set_prompt(event.target.value);
    };

    const handle_submit = (event) => {
        event.preventDefault();

        if(prompt === "")
        {
            window.alert("ERROR : a prompt is needed to generate a poem");
        }
        else
        {
            send_prompt("You are a poet.\n" + prompt);
        }
    };

    /*======== RENDERER ========*/
    return (
        <form className={"w-full flex flex-col overflow-hidden transition-all " + (unwrap ? "h-1/4 mb-5" : "h-0")} onSubmit={handle_submit}>
            <label htmlFor="prompt" className="mb-3">Enter a prompt :</label>
            <textarea
                id="prompt"
                name="prompt"
                maxLength="500"
                placeholder={DEFAULT_PROMPT}
                className="w-full h-full px-2 py-1 resize-none bg-background border border-tertiary rounded-lg focus:outline-none focus:border-primary"
                onChange={handle_change}
                defaultValue={DEFAULT_PROMPT}
            >
                
            </textarea>
            <button type="submit">Generate Poem</button>
        </form>
    );
}

export default OpenAIForm;