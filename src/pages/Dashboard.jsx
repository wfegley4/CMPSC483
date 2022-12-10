import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Box from "../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
  DashboardWrapperRight,
} from "../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox1, {
  SummaryBoxSpecial,
} from "../components/summary-box-1/SummaryBox1";
import { colors } from "../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OverallList from "../components/overall-list/OverallList";

const http = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
  },
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = React.useState({
    summary: [
      {
        title: "Completed Teams",
        subtitle: "Progress",
        value: `Loading...`,
        percent: 1,
      },
      {
        title: "Assigned Students",
        subtitle: "Progress",
        value: "Loading...",
        percent: 0,
      },
    ],
    revenueByMonths: {
      labels: [
        "Major1",
        "Major2",
        "Major3",
        "Major4",
        "Major5",
        "Major6",
        "Major7",
        "Major8",
        "Major9",
        "Major10",
      ],
      data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120],
    },
  });

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(7);

  const minHandler = (value) => {
    setMin(parseInt(value));
  };
  const maxHandler = (value) => {
    setMax(parseInt(value));
  };

  React.useEffect(() => {
    const func = async () => {
      try {
        const dashboardMajor = await http.get("/api/dashboard-major");
        setData((old) => {
          return {
            ...old,
            revenueByMonths: {
              labels: dashboardMajor.data
                .map((info) => info.major ?? "(null)")
                .filter((major) => major !== "(null)"),
              data: dashboardMajor.data.map((info) => info.count),
            },
          };
        });

        const projectList = await http.get("/api/projects");

        const studentList = await http.get("/api/student-assignments");
        console.log(studentList.data);
        setData((old) => {
          return {
            ...old,
            summary: old.summary.map((info) => {
              if (info.title === "Assigned Students") {
                info.value = `${
                  studentList.data.length -
                  studentList.data.filter(
                    (student) => student.project_id != null
                  ).length
                } out of ${studentList.data.length} incomplete`;
                info.percent = `${Math.floor(
                  (studentList.data.filter(
                    (student) => student.project_id != null
                  ).length /
                    studentList.data.length) *
                    100
                )}`;
              }

              if (info.title === "Completed Teams") {
                info.value = `${
                  projectList.data.filter(
                    (project) => project.count >= max || project.count <= min
                  ).length
                } out of ${projectList.data.length} incomplete`;
                info.percent = `${Math.floor(
                  (projectList.data.filter(
                    (project) => project.count <= max && project.count >= min
                  ).length /
                    projectList.data.length) *
                    100
                )}`;
              }

              return info;
            }),
          };
        });
      } catch (error) {
        console.log(`Got error when retrieving dashboard data: ${error}`);
      }
    };

    func();
  }, [min, max]);

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
      <p>
        <b>Select minimum and maximum team values (inclusive)</b>
      </p>
      <lable>
        Min Value
        <select onChange={({ target: { value } }) => minHandler(value)}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </lable>
      <lable>
        Max Value
        <select onChange={({ target: { value } }) => maxHandler(value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </lable>
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="row">
              {data.summary.map((item, index) => (
                <div
                  key={`summary-${index}`}
                  className="col-6 col-md-6 col-sm-12 mb"
                >
                  <SummaryBox1 item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Box>
              <RevenueByMonthsChart data={data} />
            </Box>
          </div>
        </div>
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

export default Dashboard;

const RevenueByMonthsChart = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: colors.orange,
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };

  const chartData = {
    labels: data.revenueByMonths.labels,
    datasets: [
      {
        label: "Students",
        data: data.revenueByMonths.data,
      },
    ],
  };
  return (
    <>
      <div className="title mb">Student Major Distribution</div>
      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
