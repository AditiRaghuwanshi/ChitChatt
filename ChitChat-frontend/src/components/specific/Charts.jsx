import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,  // ✅ Register this
    PointElement,
    LineElement,
    ArcElement,
    Legend,
} from "chart.js";
import { getLast7Days } from "../../lib/features";
import { blue, candypink, dustyPink, orange,Purple } from "../../constants/color";


const labels = getLast7Days();

// ✅ Register all required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

const lineChartOptions = {
      responsive: true,
      plugins: {
        legend: {
            display:false,
        },
        title: {
            display: false,
        },
      },
      scales: {
        x: {
            grid: {
            display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
            display: false,
        },
      },

}
};


const LineChart = ({value = []}) => {
    const data = {
        labels,
        datasets: [
          
            {
                
                data: value, 
                fill: true,
                label: "Messages",
                backgroundColor: "rgba(75,12,192,0.2)",
                borderColor: "rgba(75,12,192,1)",
                tension: 0.4, // ✅ Add smooth curve
            },
        ],
    };

    return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    
}

const DoughnutChart = ({value=[], labels=[]}) => {
    const data = {
    labels,
        datasets: [
          
            {
                data: value, 
                label: "Total Chats vs Group Chats",
                backgroundColor: [Purple, dustyPink],
                hoverBackgroundColor: [candypink, blue],
                borderColor: [Purple, dustyPink],
                offset: 20,
                
            },
        ],
    };
    return <Doughnut 
    style={{ zIndex: 5 }}
    data={data} 
    options={doughnutChartOptions} />;
};

export { LineChart, DoughnutChart };

