// LIBRAIRIES
import ApexChart from "react-apexcharts";

// COMPONENT
import Loader from "../Loader";

const LineChart = ({ data }) => {
    const config = {
        options: {
          chart: {
            height: "250px",
            type: "line",
            width: "100%",
          },
          colors: [() => '#ffffff'],
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
          stroke: {
            curve: 'smooth',
            lineCap: "round",
            width: 3,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
        },
      };

  const chart_data = data
    ? {
        options: {
          ...config.options,
          xaxis: {
            ...config.options.xaxis,
            categories: data.categories,
          },
        },
        series: [
            {
                data: data.data
            }
        ],
      }
    : null;

  return data ? (
    <ApexChart
      className="flex justify-center items-center"
      options={chart_data.options}
      series={chart_data.series}
      width={chart_data.options.chart.width}
      height={chart_data.options.chart.height}
    />
  ) : (
    <Loader />
  );
};

export default LineChart;