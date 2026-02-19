"use client";
import Link from "next/link";
import { ChartCard } from "../components/chart-card";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { AttendancePieChartData, OverviewStatistics } from "../utils/response-types";
import { api } from "@/utils/wretch";



export default function Home() {
  const [pieChartData, setPieChartData] = useState([
    ["Status", "Count"],
    ["Absent", 0],
    ["Present", 0],
  ]);

  const [statistics, setStatistics] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalAttendance: 0,
    averageAttendancePerEmployee: 0,
  });

  useEffect(() => {
    // Fetch attendance data from the API and update the pie chart data
    const fetchAttendanceData = async () => {
      try {
        const response: AttendancePieChartData = await api.get("/statistics/attendance").json();
        setPieChartData((prev) => [
          ["Status", "Count"],
          ...response.statistics.map((stat) => [stat.status == true ? "Present" : "Absent", stat.count]),
        ]);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    const fetchStatistics = async () => {
      try {
        const response: OverviewStatistics = await api.get("/statistics").json();

        setStatistics({
          totalEmployees: response.total_employees,
          totalDepartments: response.total_departments,
          totalAttendance: response.total_attendance_records,
          averageAttendancePerEmployee: response.average_attendance_per_employee,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
    fetchAttendanceData();
  }, []);


  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full py-16 px-16 ">
        <div className="flex">
        <div className="w-[50%]">
          <h1 className=" text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Welcome to the Employee Management System
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Manage your employees and departments with ease.
        </p>
        </div>
        <div className="ml-16 mt-6 h-min flex space-x-4">
          <Link href="/employees" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Employees
          </Link>
          <Link href="/departments" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            View Departments
          </Link>
        </div>
        </div>
        {/* Charts */}
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Employee Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartCard title="Total Employees">
              <p className="text-6xl font-bold">{statistics.totalEmployees}</p>
            </ChartCard>
            <ChartCard title="Total Departments">
              <p className="text-6xl font-bold">{statistics.totalDepartments}</p>
            </ChartCard>
            <ChartCard title="Total Attendance">
              <p className="text-6xl font-bold">{statistics.totalAttendance}</p>
            </ChartCard>
            <ChartCard title="Average Attendance per Employee">
              <p className="text-6xl font-bold">{(statistics.averageAttendancePerEmployee).toFixed(2)}</p>
            </ChartCard>
            <ChartCard title="Total present vs absent">
              <Chart
                  
                  chartType="PieChart"
                  data={pieChartData}
                  options={{
                    title: "Present vs Absent",
                    pieHole: 0.4,
                    colors: ["#F44336", "#4CAF50"],
                    backgroundColor: "transparent",
                    textStyle: {color: "#333"},
                    legend: { position: "bottom", textStyle: { color: "#fff" } },
                  }}
                  width={"100%"}
                  height={"300px"}
                />
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
}
