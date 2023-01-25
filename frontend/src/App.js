// LIBRARIES
import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

// COMPONENTS
import Header from "./components/header"

const App = () => {
  /*====== ATTRIBUTS ======*/
  const [data, set_data] = useState(null);
  const [svg, set_svg] = useState("");
  const loaded = useRef(false);

  /*======== HOOK ========*/
  useEffect(()=>{
    if(loaded.current) return;

    fetch("http://127.0.0.1:5000/parse_word").then(
      res => res.json()
    ).then(
      raw_data => {
        const options = {
            chart: {
              animations: {
                enabled: false,
              },
              height: "150px",
              type: "area",
              width: "700px",
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
            series: [
              {
                data: raw_data.data,
              }
            ],
            stroke: {
              curve: 'smooth',
              lineCap: "round",
              width: 2,
            },
            xaxis: {
              categories: raw_data.categories,
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
        apexchart.render().then(() => {
          const paper = apexchart.ctx.exports.getSvgString();
          set_svg(paper);
        });

        set_data(raw_data);
      }
    );

    loaded.current = true;
  }, []);

  /*======== RENDERER ========*/
  return (
    <>
      {/* HEADER */}
      <Header/>

      {/* MAIN */}
      <main className="w-full h-full pt-[var(--header-height)]">
        <section id="main" className="w-full h-full p-5">
          <div dangerouslySetInnerHTML={{__html: svg}}></div>
        </section>
      </main>
    </>
  );
}

export default App;