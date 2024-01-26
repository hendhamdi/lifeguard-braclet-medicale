// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

/////////////////////////////////////////////////////////////////////////
let tempData = [];
let heartbeatData = [];
let time = [];
// Function to fetch temperature data
let getTemp = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/temp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data["temp"]);
    tempData = Object.values(data["temp"]).map((e) => {
      return e["value"];
    });
    time = Object.values(data["temp"]).map((e) => {
      const date = new Date(e["timestamp"]);
      // Format the date to display day and time, for example: "Wed 12:00 PM"
      return `${date.toLocaleString("en-us", {
        weekday: "short",
      })} ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`;
    });
    console.log(time);
    if (!data) {
      console.log("no data found");
    } else {
      updateTemperatureChart(); // Update chart after fetching data
    }
  } catch (error) {
    console.log(error);
  }
};
/*------------------------------ */
// Function to fetch heartbeat data
let getHeartbeat = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/heartbeat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    heartbeatData = Object.values(data["heartbeat"]).map((e) => {
      return e["value"];
    }); // Assuming the data retrieved is an array of temperatures
    if (!data) {
      console.log("no data found");
    } else {
      updateHeartbeatChart(); // Update chart after fetching data
    }
  } catch (error) {
    console.log(error);
  }
};
// Update temperature chart function
const updateTemperatureChart = () => {
  areaChartOptions.series[0].data = tempData; // Update temperature data
  areaChartOptions.labels = time; // Update chart labels with formatted time
  areaChart.updateSeries(areaChartOptions.series); // Update chart series data
  areaChart.updateOptions({
    // Update chart options with new labels
    xaxis: {
      categories: time,
      labels: {
        style: {
          colors: "#f5f7ff", // Color for the time labels (change to your preferred color)
        },
      }, // Assign formatted time as categories for x-axis
    },
  });
  areaChart.render(); // Render the updated chart
};
// Update heartbeat chart function
const updateHeartbeatChart = () => {
  // Assuming areaChartOptions is accessible here
  areaChartOptions.series[1].data = heartbeatData; // Assuming the first series represents temperature

  areaChart.updateSeries(areaChartOptions.series); // Update chart series data
};

/*------------------------------------------------------*/

getTemp();
setInterval(getTemp, 60000);
getHeartbeat();
setInterval(getHeartbeat, 60000);
// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: "Temperature",
      data: [],
    },
    {
      name: "Battement Du Coeur",
      data: [],
    },
  ],
  chart: {
    type: "area",
    background: "transparent",
    height: 350,
    stacked: false,
    toolbar: {
      show: true,
    },
  },
  colors: ["#00ab57", "#d50000"],

  dataLabels: {
    enabled: true,
  },

  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: "vertical",
    },
    type: "gradient",
  },
  grid: {
    borderColor: "#55596e",
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: "#f5f7ff",
    },
    show: true,
    position: "top",
  },
  markers: {
    size: 6,
    strokeColors: "#1b2635",
    strokeWidth: 3,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    axisBorder: {
      color: "#55596e",
      show: true,
    },
    axisTicks: {
      color: "#55596e",
      show: true,
    },
    xaxis: {
      labels: {
        formatter: function (value, timestamp) {
          return new Date(timestamp); // The formatter function overrides format property
        },
      },
    },
  },
  yaxis: [
    {
      title: {
        text: "Batement Du Coeur",
        style: {
          color: "#f5f7ff",
        },
      },
      labels: {
        style: {
          colors: ["#f5f7ff"],
        },
      },
    },
    {
      opposite: true,
      title: {
        text: "Temperature",
        style: {
          color: "#f5f7ff",
        },
      },
      labels: {
        style: {
          colors: ["#f5f7ff"],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
};

const areaChart = new ApexCharts(
  document.querySelector("#area-chart"),
  areaChartOptions
);
areaChart.render();
