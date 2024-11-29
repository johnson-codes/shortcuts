google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBarColors);

function drawBarColors() {
  var data = google.visualization.arrayToDataTable([
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
    ['Phoenix, AZ', 1445000, 1321000],
    ['San Antonio, TX', 1327000, 1145000],
    ['San Diego, CA', 1307000, 1223000],
    ['Dallas, TX', 1198000, 1189000],
    ['San Jose, CA', 945000, 894000]
  ]);

  console.log(data);

  var options = {
    title: 'Population of Largest U.S. Cities',
    titleTextStyle: {
      fontSize: 16 // Adjust the font size as needed
    },
    chartArea: {width: '50%'},
    colors: ['#b0120a', '#ffab91'],
    hAxis: {
      title: 'Total Population',
      minValue: 0
    },
    vAxis: {
      title: 'City'
    }
  };
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

document.addEventListener('DOMContentLoaded', function() {
  drawBarColors();
});