import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import Card from "../card/Card";
import styles from "./Chart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

function Chart() {
  const orders = useSelector(selectOrderHistory);
  const orderStatuses = [];
  orders.map((item) => {
    return orderStatuses.push(item.orderStatus);
  });
  const getOrderCount = (arr, value) => {
    return arr.filter((i) => i === value).length;
  };
  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];
  const placedCount = getOrderCount(orderStatuses, q1);
  const processingCount = getOrderCount(orderStatuses, q2);
  const shippedCount = getOrderCount(orderStatuses, q3);
  const deliveredCount = getOrderCount(orderStatuses, q4);

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order count",
        data: [placedCount, processingCount, shippedCount, deliveredCount],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
}

export default Chart;
