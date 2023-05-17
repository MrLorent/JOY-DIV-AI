// LIBRARIES
import { useEffect, useRef, useState } from "react";

// COMPONENTS
import Loader from "../../components/Loader";

const PoemForm = ({ generated_poem, send_poem, open_ai_unwrap, set_open_ai_unwrap }) => {
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
        else if(!poem.includes("\n") && (poem.split(".").length > 2 && poem.split(",").length > 2))
        {
            window.alert("ERROR: Please, use line breaks to correctly indent your master piece.")
        }
        else
        {
            send_poem(poem);
        }
    };

    const handle_click = () => {
        set_open_ai_unwrap(!open_ai_unwrap);
    }

    /*======== METHODS ========*/
    useEffect(() => {
        if(generated_poem === null || generated_poem === "loading") return

        poem_input.current.value = generated_poem;
        set_poem(generated_poem);

    }, [generated_poem]);

    /*======== RENDERER ========*/
    return (
        <form className="flex-auto flex flex-col" onSubmit={handle_submit}>
            <label htmlFor="poem" className="mb-3">Your poem :</label>

            {
                generated_poem === "loading" ? (
                    <div className="w-full h-full overflow-hidden px-2 py-1 resize-none bg-background border border-tertiary rounded-lg relative">
                        <Loader />
                    </div>
                ) : (
                    <textarea
                        ref={poem_input}
                        id="poem"
                        name="poem"
                        maxLength={MAX_CHARACTERS}
                        placeholder="Demain dès l'aube..."
                        className="w-full h-full px-2 py-1 resize-none bg-background border border-tertiary rounded-lg focus:outline-none focus:border-primary"
                        onChange={handle_change}
                    />
                )
            }

            <div className="w-full h-fit flex">
                <button type="submit" className="disabled:text-tertiary disabled:border-tertiary disabled:hover:bg-transparent disabled:hover:text-tertiary disabled:transition-none" disabled={ generated_poem === "loading" }>Illustrate Poem</button>
                <button type="button" className="ml-6" onClick={ handle_click }>Need some help ?</button>
            </div>
        </form>
    );
}

export default PoemForm;