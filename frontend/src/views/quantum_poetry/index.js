// LIBRARIES
import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

// COMPONENT
import Illustration from "./Illustration";
import PoemForm from "./PoemForm";
import OpenAIForm from "./OpenAIForm";

// API CALLS
import { submit_text, submit_prompt } from "../../services/api/requests";

const QuantumPoetry = () => {
    /*====== ATTRIBUTS ======*/
    const [generated_poem, set_generated_poem] = useState(null);
    const [open_ai_unwrap, set_open_ai_unwrap] = useState(false);
    const [parsed_poem, set_parsed_poem] = useState(null);
    const [endpoint, set_endpoint] = useState(null);
    const [curves, set_curves] = useState(null);

    /*====== METHODS ======*/
    const fetch_poem = async (prompt) => {
        set_generated_poem("loading");
        const poem = await submit_prompt(prompt);
        set_generated_poem(poem);
    };

    const fetch_noise = async (text, endpoint) => {
        const data = await submit_text(text, endpoint);
        const svg_curves = await generate_svg_curves(data);
        
        set_curves((curves === "loading" ? [] : curves).concat(svg_curves));
    };

    const init_fetch_noise = (poem) => {
        const new_parsed_poem = parse_poem(poem);
        set_parsed_poem(new_parsed_poem);

        const new_endpoint = new_parsed_poem.length === 1 ? "word" : "text";
        set_endpoint(new_endpoint);

        set_curves("loading");
    };

    const parse_poem = (poem) => {
        while(poem[0] === "\n" || poem[0] === " ") poem = poem.slice(1);

        if(!poem.includes("\n"))
        {
        poem  =   poem.replace(/[,.';]/g, "")    // remove commas, dots, and apostrophes
                        .replace(/['’-]/g, "")
                        .replace(/[!?]/g, "")
                        .split(" ")               // split sentences into separated words
        }
        else
        {
        poem  =   poem.replace(/[,.'';']/g, "")    // remove commas, dots, and apostrophes
                        .replace(/['’-]/g, "")
                        .replace(/[!?]/g, "")
                        .replace(/\n{2,}/g,"\n")  // replace multiple line breaks to simple one
                        .split(" ").join("_")     // replace space by underscores
                        .split("\n");             // split text into separated sentences
        }
        
        return poem;
    };

    const generate_svg_curves = async (data) => {
        const options = {
        chart: {
            id: "temp_chart",
            animations: {
                enabled: false,
            },
            height: "150px",
            type: "area",
            width: "500px",
        },
        colors: ['#ffffff'],
        dataLabels: {
            enabled: false,
        },
        fill: {
            colors: ['#000000'],
            opacity: 1,
            type: 'solid',
        },
        grid: {
            show: false,
        },
        legend: {
            show: false,
        },
        plotOptions: {
            area: {
                fillTo: 'end',
            }
        },
        series: [
            {
                data: [],
            }
        ],
        stroke: {
            curve: 'smooth',
            lineCap: "round",
            width: 2,
        },
        xaxis: {
        categories: [],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        };
        const apexchart = new ApexCharts(document.getElementById("chart"), options);
        await apexchart.render();
        
        let svg_curves = [];
        
        for(let i in data)
        {
        // Change x axis data
        apexchart.updateOptions({
            xaxis: {
            categories: data[i].categories
            }
        });
        
        // Change data values
        apexchart.updateSeries([{
            data: data[i].data
        }]);
    
        // Save the current chart as SVG
        svg_curves.push(apexchart.ctx.exports.getSvgString().toString());
        }

        apexchart.destroy();

        return svg_curves;
    };

    /*====== HOOKS ======*/
    useEffect(() => {
        const next_index = (curves === "loading" || curves === null ? 0 : curves.length);
        
        if(parsed_poem === null || curves === null || next_index >= parsed_poem?.length) return;
        
        fetch_noise([parsed_poem[next_index]], endpoint);
    }, [curves])

    /*======== RENDERER ========*/
    return (
        <main className="w-full h-[calc(100%_-_var(--footer-height))] pt-[var(--header-height)]">
            <section id="quantum-poetry" className="w-full h-full p-6 flex justify-between">

                {/* POEM INPUTS */}
                <div className="w-[calc(50%_-_1.5rem_/_2)] h-full flex flex-col">
                    <OpenAIForm
                        {...{
                        send_prompt: fetch_poem,
                        unwrap: open_ai_unwrap
                        }}
                    />
                    <PoemForm
                        {...{
                        generated_poem: generated_poem,
                        send_poem: init_fetch_noise,
                        open_ai_unwrap: open_ai_unwrap,
                        set_open_ai_unwrap: set_open_ai_unwrap
                        }}
                    />
                </div>

                {/* ILLUSTRATION */}
                <div className="w-[calc(50%_-_1.5rem_/_2)] h-full flex flex-columns items-center ml-6">
                    <Illustration {...{ curves, loading: (curves === "loading" || curves?.length < parsed_poem?.length) }}/>
                </div>
            </section>
        </main>
    );
}

export default QuantumPoetry;