// LIBRARIES
import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

// COMPONENTS
import Header from "./components/header"

// API CALLS
import { submit_text } from "./services/api/requests";
import Illustration from "./components/illustration";

const App = () => {
  /*====== ATTRIBUTS ======*/
  const [noise_data, set_noise_data] = useState(null);
  const loaded = useRef(false);

  /*====== METHODS ======*/
  const fetch_text_noise = async () => {
    const data = await submit_text();
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
          data: data[0].data,
      }
      ],
      stroke: {
      curve: 'smooth',
      lineCap: "round",
      width: 2,
      },
      xaxis: {
      categories: data[0].categories,
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
    const curve = apexchart.ctx.exports.getSvgString();
    apexchart.destroy();
    set_noise_data([curve]);
  };

  /*======== HOOK ========*/
  useEffect(()=>{
    if(loaded.current) return;

    fetch_text_noise();

    loaded.current = true;
  }, []);

  /*======== RENDERER ========*/
  return (
    <>
      {/* HEADER */}
      <Header/>

      {/* MAIN */}
      <main className="w-full h-full pt-[var(--header-height)]">
        <section id="main" className="w-full h-full p-5 flex">
          <div className="w-1/2 h-full"></div>
          <Illustration {...{ data: noise_data }}/>
        </section>
      </main>
    </>
  );
}

export default App;