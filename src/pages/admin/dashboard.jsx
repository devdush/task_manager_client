import { Box, Typography, useMediaQuery } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
const AdminDashboard = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const data = [
    {
      id: "lisp",
      label: "lisp",
      value: 217,
      color: "hsl(244, 70%, 50%)",
    },
    {
      id: "ruby",
      label: "ruby",
      value: 239,
      color: "hsl(60, 70%, 50%)",
    },
    {
      id: "php",
      label: "php",
      value: 180,
      color: "hsl(296, 70%, 50%)",
    },
    {
      id: "rust",
      label: "rust",
      value: 482,
      color: "hsl(109, 70%, 50%)",
    },
    {
      id: "python",
      label: "python",
      value: 121,
      color: "hsl(151, 70%, 50%)",
    },
  ];
  const data2 = [
    {
      country: "AD",
      "hot dog": 48,
      burger: 86,
      sandwich: 159,
      kebab: 139,
      fries: 126,
      donut: 23,
    },
    {
      country: "AE",
      "hot dog": 0,
      burger: 133,
      sandwich: 67,
      kebab: 156,
      fries: 167,
      donut: 61,
    },
    {
      country: "AF",
      "hot dog": 173,
      burger: 149,
      sandwich: 106,
      kebab: 72,
      fries: 112,
      donut: 0,
    },
    {
      country: "AG",
      "hot dog": 184,
      burger: 65,
      sandwich: 134,
      kebab: 27,
      fries: 103,
      donut: 109,
    },
    {
      country: "AI",
      "hot dog": 189,
      burger: 41,
      sandwich: 155,
      kebab: 93,
      fries: 73,
      donut: 79,
    },
    {
      country: "AL",
      "hot dog": 8,
      burger: 59,
      sandwich: 176,
      kebab: 163,
      fries: 174,
      donut: 28,
    },
    {
      country: "AM",
      "hot dog": 6,
      burger: 147,
      sandwich: 0,
      kebab: 174,
      fries: 176,
      donut: 109,
    },
  ];
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
          <Box>📌 Total: 1</Box>
          <Box>⏳ Pending: 2</Box>
          <Box>🔄 In-Progress: 3</Box>
          <Box>✅ Completed: 4</Box>
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
            data={data}
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
            height: "400px",
          }}
        >
          <Typography variant="h6" mb={2}>
            Priority Breakdown
          </Typography>
          <ResponsiveBar
            data={data2}
            indexBy="country"
            keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]} // make sure you pass this
            groupMode="grouped"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            axisBottom={{
              legend: "Country",
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
