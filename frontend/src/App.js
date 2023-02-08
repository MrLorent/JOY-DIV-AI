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
  const [parsed_poem_idx, set_parsed_poem_idx] = useState(null);
  const [endpoint, set_endpoint] = useState(null);
  const [curves, set_curves] = useState(null);

  /*====== METHODS ======*/
  const fetch_poem = async (prompt) => {
    const poem = await submit_prompt(prompt);
    set_generated_poem(poem);
  };

  const fetch_noise = async (text, endpoint) => {
    const data = await submit_text(text, endpoint);
    const svg_curves = await generate_svg_curves(data);

    set_curves([
      ...curves === null ? [] : curves,
      svg_curves
    ]);
  };

  const init_fetch_noise = (poem) => {
    set_curves(null);
    set_parsed_poem_idx(0);

    const new_parsed_poem = parse_poem(poem);
    set_parsed_poem(new_parsed_poem);

    const new_endpoint = new_parsed_poem.length === 1 ? "word" : "text";
    set_endpoint(new_endpoint);

    fetch_noise([new_parsed_poem[0]], new_endpoint);
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
    if(curves === null || curves === "loading" || parsed_poem_idx >= parsed_poem.length) return;

    fetch_noise([parsed_poem[parsed_poem_idx + 1]], endpoint);
    set_parsed_poem_idx(parsed_poem_idx + 1);
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
            <PoemForm {...{ generated_poem: generated_poem, send_poem: init_fetch_noise }}/>
          </div>

          {/* ILLUSTRATION */}
          <div className="h-full flex grow justify-center p-5 ml-6 overflow-hidden border border-tertiary rounded-lg relative">
            <Illustration {...{ curves, loading: (parsed_poem_idx === 0 || parsed_poem_idx < parsed_poem?.length) }}/>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;