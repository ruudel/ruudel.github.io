function getXpGraphInfo() {
  const xpGraphInfo = localStorage.getItem('xpGraphInfo');
  if (xpGraphInfo) {
    return JSON.parse(xpGraphInfo);
  } else {
    return []; // Return an empty array or handle the case when the data is not available in local storage
  }
}
const xpData = getXpGraphInfo();
console.log("xpData",xpData);
  
  // Your XP data
  // const xpData = [{ date: "2021-09-27T13:36:33.53793+00:00", xp: 5000 }, { date: "2021-10-06T12:36:50.806103+00:00", xp: 6125 },
  // { date: "2021-11-10T14:24:51.333087+00:00", xp: 9200 }, { date: "2021-12-17T08:25:14.953461+00:00", xp: 24500 },
  // { date: "2022-05-14T11:04:29.513053+00:00", xp: 76250 }, { date: "2023-07-07T12:09:34.132073+00:00", xp: 103500 },
  // { date: "2022-12-20T15:24:33.044523+00:00", xp: 6125 }, { date: "2022-12-21T11:23:42.064779+00:00", xp: 6125 },
  // { date: "2022-12-28T11:01:44.320172+00:00", xp: 10000 }, { date: "2022-06-01T12:25:58.18796+00:00", xp: 147000 },
  // { date: "2022-05-26T07:57:25.794755+00:00", xp: 9200 }, { date: "2022-02-08T10:26:18.031045+00:00", xp: 34375 },
  // { date: "2022-04-17T15:53:14.505149+00:00", xp: 9200 }, { date: "2023-02-03T12:34:58.81516+00:00", xp: 6125 },
  //   ];


// Custom date parser
function parseDate(dateString) {
const dateParts = dateString.split(/[-T:.+]/);
return new Date(Date.UTC(
parseInt(dateParts[0], 10),
parseInt(dateParts[1], 10) - 1,
parseInt(dateParts[2], 10),
parseInt(dateParts[3], 10),
parseInt(dateParts[4], 10),
parseInt(dateParts[5], 10),
parseInt(dateParts[6], 10)
));
}
// Step 1: Parse the data and accumulate XP values
const parsedData = xpData.map(item => ({
date: parseDate(item.date),
xp: item.xp
}));

parsedData.sort((a, b) => a.date - b.date);

// Step 2: Accumulate XP values
let accumulatedXP = 0;
for (const item of parsedData) {
accumulatedXP += item.xp;
item.xp = accumulatedXP;
}
console.log("ParsedData",parsedData)
// Chart dimensions
const margin = { top: 0, right: 0, bottom: 40, left: 30 };
const width = 500;
const height = 300;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Step 2: Create scales for x and y axes
const xScale = d3.scaleTime()
.domain(d3.extent(parsedData, d => d.date))
.range([0, innerWidth]);

const yScale = d3.scaleLinear()
.domain([0, d3.max(parsedData, d => d.xp)])
.range([innerHeight, 0]);

// Step 3: Create the line generator
const line = d3.line()
.x(d => xScale(d.date))
.y(d => yScale(d.xp));

// Step 4: Create the SVG element
const svg = d3.select("#xpChart")
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 5: Draw the line chart
svg.append("path")
.datum(parsedData)
.attr("fill", "none")
.attr("stroke", "limegreen")
.attr("stroke-width", 2)
.attr("d", line);

// Step 6: Draw the x and y axes with additional styling options
const xAxis = d3.axisBottom(xScale)
.tickSizeInner(-innerHeight) // Add ticks inside the chart area
.tickSizeOuter(0); // Hide the outer ticks

const yAxis = d3.axisLeft(yScale)
.ticks(5) // Adjust the number of ticks on the y-axis
.tickSizeInner(-innerWidth) // Add ticks inside the chart area
.tickSizeOuter(0); // Hide the outer ticks

svg.append("g")
.attr("class", "x-axis")
.attr("transform", `translate(0, ${innerHeight})`)
.call(xAxis);

svg.append("g")
.attr("class", "y-axis")
.call(yAxis);
