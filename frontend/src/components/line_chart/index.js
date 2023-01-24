// LIBRAIRIES
import ApexChart from "react-apexcharts";

// COMPONENT
import Loader from "../Loader";

const LineChart = ({ data }) => {
    const config = {
        options: {
          chart: {
            width: "100%",
            height: "400px",
            type: "line",
          },
          colors: ["#ffffff"],
          dataLabels: {
            enabled: false,
          },
          grid: {
            show: false,
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