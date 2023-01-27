// LIBRARIES
import { useEffect, useRef, useState } from "react";

const PoemForm = ({ generated_poem, send_poem }) => {
    /*======== ATTRIBUTS ========*/
    const MAX_CHARACTERS = 2500; 
    const [poem, set_poem] = useState("");
    const poem_input = useRef(null);

    /*======== METHODS ========*/
    const handle_change = (event) => {
        set_poem(event.target.value);
    };

    const handle_submit = (event) => {
        event.preventDefault();

        if(poem === "")
        {
            window.alert("ERROR : There's no poem to send");
        }
        else if(poem.length > MAX_CHARACTERS)
        {
            window.alert("ERROR : You're poem is to long. The limit is " + MAX_CHARACTERS + " caracteres.");
        }
        else if(!poem.includes("\n") && (poem.count(".") > 1 && poem.count(",") > 1))
        {
            window.alert("ERROR: Please, use line breaks to correctly indent your master piece.")
        }
        else
        {
            send_poem(poem);
        }
    };

    /*======== METHODS ========*/
    useEffect(() => {
        if(!generated_poem) return

        poem_input.current.value = generated_poem;
        set_poem(generated_poem);

    }, [generated_poem]);

    /*======== RENDERER ========*/
    return (
        <form className="flex-auto flex flex-col" onSubmit={handle_submit}>
            <label htmlFor="poem" className="mb-3">Your poem :</label>
            <textarea
                ref={poem_input}
                id="poem"
                name="poem"
                maxLength={MAX_CHARACTERS}
                placeholder="Demain dès l'aube..."
                className="w-full h-full px-2 py-1 resize-none bg-background border border-tertiary rounded-lg focus:outline-none focus:border-primary"
                onChange={handle_change}
            >

            </textarea>
            <button type="submit">Illustrate Poem</button>
        </form>
    );
}

export default PoemForm;