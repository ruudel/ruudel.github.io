(async () => {
    function getSkillAmountsArrayFromLocalStorage() {
        const storedSkillAmountsArray = localStorage.getItem('skillAmountsArray');
        if (storedSkillAmountsArray) {
          return JSON.parse(storedSkillAmountsArray);
        } else {
          return []; // Return an empty array or handle the case when the data is not available in local storage
        }
      }
      const skillAmountsArray = getSkillAmountsArrayFromLocalStorage();
      console.log("Radarcharts dataarray",skillAmountsArray);
const radarChartDiv = document.getElementById('radarCanvas');
      new Chart(radarChartDiv, {
        type: "radar",
      data: {
        labels: [
          "Go",
          "Html",
          "JS",
          "Sql",
          "Docker",
          "Css",
        ],
        datasets: [
          {
            label: "Skills",
            fill: true,
            lineTension: 0,
            backgroundColor: "#00ff0057",
            borderColor: "#9acd32",
            borderCapStyle: "butt",
            borderJoinStyle: "miter",
            pointBorderColor: "#9acd32",
            pointBackgroundColor: "#007200",
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#007200",
            pointHoverBorderColor: "#007200",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 5,
            data: skillAmountsArray,
 
          },
        ],
      },
      options: {
        scales: {
          r:{
            angleLines:{
              color: "#007200",
            },
            grid:{
              color: "#007200",
            },
            pointLabels:{
              color: "#9acd32",
            },
          },
        },
        scale: {
          ticks: {
            min: 0, // suggestedMin: 0,
            max: 50, //suggestedMax: 50
            stepSize: 25,
            color: "#9acd32",
          },
        },
        responsive: true,
      },
    });
})();