// var greenOne = "#95B524";
// var greenTwo = "#AFCC4C";
// var greenThree = "#C1DD54";

// function CreatePieChart() {
//   var chart = document.getElementById('piechart');
//   var canvas = chart.getContext('2d');
//   canvas.clearRect(0, 0, chart.width, chart.height);

//   var total = 100;

//   var a = 3;
//   var b = 4;
//   var c = 3;

//   for (var i = 0; i < 3; i++) {
//     canvas.fillStyle = "#95B524";
//     canvas.beginPath();
//     canvas.strokeStyle = "#fff";
//     canvas.lineWidth = 3;
//     canvas.arc(100, 100, 100, 0, Math.PI * 2, true);
//     canvas.closePath();
//     canvas.stroke();
//     canvas.fill();
//   }
// }
// CreatePieChart();

// var canvas = document.getElementById("piechart");
// var ctx = canvas.getContext("2d");
// var lastend = 0;
// var data = [200, 60, 15]; // If you add more data values make sure you add more colors
// var myTotal = 0; // Automatically calculated so don't touch
// var myColor = ['red', 'green', 'blue']; // Colors of each slice

// for (var e = 0; e < data.length; e++) {
//   myTotal += data[e];
// }

// for (var i = 0; i < data.length; i++) {
//   ctx.fillStyle = myColor[i];
//   ctx.beginPath();
//   ctx.moveTo(canvas.width / 2, canvas.height / 2);
//   // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
//   ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
//   ctx.lineTo(canvas.width / 2, canvas.height / 2);
//   ctx.fill();
//   lastend += Math.PI * 2 * (data[i] / myTotal);
// }