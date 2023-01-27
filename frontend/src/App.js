// LIBRARIES
import { useState } from "react";
import ApexCharts from "apexcharts";

// COMPONENTS
import Header from "./components/header"

// API CALLS
import { submit_text } from "./services/api/requests";
import Illustration from "./components/illustration";
import PoemForm from "./components/poem_form";

const App = () => {
  /*====== ATTRIBUTS ======*/
  const [curves, set_curves] = useState(null);

  /*====== METHODS ======*/
  const fetch_text_noise = async (poem) => {
    set_curves("loading");
    const parsed_poem = parse_poem(poem);
    const endpoint = parsed_poem.length === 1 ? "word" : "text";

    console.log(parsed_poem);
    const data = await submit_text(parsed_poem, endpoint);
    const svg_curves = await generate_svg_curves(data);
    set_curves(svg_curves);
  };

  const parse_poem = (poem) => {
    if(poem.includes("\n"))
    {
        const sentences = poem.split("\n").map(sentence => sentence.split(' ').join('_'));
        return sentences;
    }
    else if(poem.includes("."))
    {
        const sentences = poem.split(".").map(sentence => sentence.split(' ').join('_'));
        return sentences;
    }
    else if(poem.includes(" "))
    {
        const words = poem.split(" ");
        return words;
    }
    else
    {
        return [poem];
    }
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

  /*======== RENDERER ========*/
  return (
    <>
      {/* HEADER */}
      <Header/>

      {/* MAIN */}
      <main className="w-full h-full pt-[var(--header-height)]">
        <section id="main" className="w-full h-full p-5 flex">
          <PoemForm {...{ send_poem: fetch_text_noise }}/>
          <Illustration {...{ curves }}/>
        </section>
      </main>
    </>
  );
}

export default App;