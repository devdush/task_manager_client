import { Box, Typography, useMediaQuery } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { getPieChartData } from "../../services/admin/pie-chart";
import { use } from "react";
const AdminDashboard = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [pieData, setPieData] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  useEffect(() => {
    const getData = async () => {
      console.log("Fetching pie chart data...");
      try {
        const response = await getPieChartData();
        const chartData = response.data.data;
        setPieData(chartData);
        setTotalTasks(response.data.totalTasks);
        const pending =
          chartData.find((item) => item.id === "pending")?.value || 0;
        const inProgress =
          chartData.find((item) => item.id === "in-progress")?.value || 0;
        const completed =
          chartData.find((item) => item.id === "completed")?.value || 0;
        setPendingCount(pending);
        setInProgressCount(inProgress);
        setCompletedCount(completed);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
        setPieData([]);
      }
    };
    getData();
  }, []);

  const barChart = [
    {
      status: "Pending",
      pending: pendingCount,
    },
    {
      status: "In-Progress",
      inProgress: inProgressCount,
    },
    {
      status: "Completed",
      completed: completedCount,
    },
  ];
  console.log("Bar Chart Data:", barChart);
  return (
    <Box>
      {/* Top Bar */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          padding: "20px",
        }}
      >
        <Box>
          <Typography component="h1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "10px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>📌 Total: {totalTasks}</Box>
          <Box>⏳ Pending: {pendingCount}</Box>
          <Box>🔄 In-Progress: {inProgressCount}</Box>
          <Box>✅ Completed: {completedCount}</Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          padding: "20px",
          gap: "20px",
          width: "100%",
        }}
      >
        {/* Left Chart - Pie */}
        <Box
          sx={{
            padding: "20px",
            bgcolor: "#ffffff",
            borderTop: "1px solid #eee",
            flex: 1,
            minWidth: isMobile ? "100%" : "400px",
            height: "500px",
          }}
        >
          <Typography variant="h6" mb={2}>
            Task Overview
          </Typography>
          <ResponsivePie
            data={pieData}
            margin={{ top: 10, right: 80, bottom: 10, left: 10 }}
            innerRadius={0.5}
            padAngle={0.6}
            cornerRadius={2}
            activeOuterRadiusOffset={8}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={0}
            arcLinkLabel={false}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                symbolShape: "circle",
              },
            ]}
          />
        </Box>

        {/* Right Chart - Bar */}
        <Box
          sx={{
            padding: "20px",
            bgcolor: "#ffffff",
            borderTop: "1px solid #eee",
            flex: 1,
            minWidth: isMobile ? "100%" : "400px",
            height: "500px",
          }}
        >
          <Typography variant="h6" mb={2}>
            Priority Breakdown
          </Typography>
          <ResponsiveBar
            data={barChart}
            indexBy="status"
            keys={["pending", "inProgress", "completed"]} // make sure you pass this
            groupMode="grouped"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            axisBottom={{
              legend: "Status",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              legend: "Quantity",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                translateX: 120,
                itemWidth: 100,
                itemHeight: 16,
                symbolSize: 20,
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
