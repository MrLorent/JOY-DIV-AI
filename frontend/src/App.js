// LIBRARIES
import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

// COMPONENTS
import Header from "./components/header"

// API CALLS
import { submit_text, submit_prompt } from "./services/api/requests";
import Illustration from "./components/illustration";
import PoemForm from "./components/poem_form";
import OpenAIForm from "./components/OpenAIForm";

const App = () => {
  /*====== ATTRIBUTS ======*/
  const [generated_poem, set_generated_poem] = useState("");
  const [parsed_poem, set_parsed_poem] = useState(null);
  const [curve, set_curve] = useState(null);
  const [curves, set_curves] = useState(null);
  const [nb_curves, set_nb_curves] = useState(0);
  const [curves_idx, set_curves_idx]= useState(0);

  /*====== METHODS ======*/
  const fetch_poem = async (prompt) => {
    const poem = await submit_prompt(prompt);
    set_generated_poem(poem);
  };

  const fetch_text_noise = async (poem) => {
    set_curves("loading");
    const new_parsed_poem = parse_poem(poem);
    set_parsed_poem(new_parsed_poem);

    const endpoint = new_parsed_poem.length === 1 ? "word" : "text";
    set_nb_curves(new_parsed_poem.length);
    set_curves_idx(0);

    console.log(nb_curves, curves_idx);

    const data = await submit_text([new_parsed_poem[0]], endpoint);
    const svg_curves = await generate_svg_curves(data);
    set_curve(svg_curves);
  };

  const fetch_next_curve = async (next_idx) => {
    console.log("next_curve called");
    const endpoint = parsed_poem.length === 1 ? "word" : "text";

    const data = await submit_text([parsed_poem[next_idx]], endpoint);
    const svg_curves = await generate_svg_curves(data);
    set_curve(svg_curves);
  };

  const parse_poem = (poem) => {
    while(poem[0] === "\n" || poem[0] === " ") poem = poem.slice(1);

    if(!poem.includes("\n"))
    {
      poem  =   poem.replace(/[,.']/g, "")    // remove commas, dots, and apostrophes
                    .split(" ")               // split sentences into separated words
    }
    else
    {
      poem  =   poem.replace(/[,.']/g, "")    // remove commas, dots, and apostrophes
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
      svg_curves.push(apexchart.ctx.exports.getSvgString());
    }
    apexchart.destroy();

    return svg_curves;
  };

  /*====== HOOKS ======*/
  useEffect(() => {
    if(!curve) return;

    set_curves([
      ...curves === "loading" || null ? [] : curves,
      ...curve
    ]);
  }, [curve])

  useEffect(() => {
    if(curves === "loading" || null) return;

    set_curves_idx(curves_idx + 1);
    console.log("curves updated : ", nb_curves, " ", curves_idx);

    if(curves_idx + 1 < nb_curves) fetch_next_curve(curves_idx + 1);

  }, [curves])

  /*======== RENDERER ========*/
  return (
    <>
      {/* HEADER */}
      <Header/>

      {/* MAIN */}
      <main className="w-full h-full pt-[var(--header-height)]">
        <section id="main" className="w-full h-full p-6 flex justify-between">

          {/* POEM INPUTS */}
          <div className="w-[calc(50%_-_1.5rem_/_2)] h-full flex flex-col">
            <OpenAIForm {...{ send_prompt: fetch_poem }}/>
            <PoemForm {...{ generated_poem: generated_poem, send_poem: fetch_text_noise }}/>
          </div>

          {/* ILLUSTRATION */}
          <div className="h-full flex grow justify-center p-5 ml-6 overflow-x-hidden overflow-y-auto border border-tertiary rounded-lg relative">
            <Illustration {...{ curves }}/>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;