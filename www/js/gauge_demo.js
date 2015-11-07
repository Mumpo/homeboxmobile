/** 
data =
{
    id: canvas id,
    id_text: text id,
    color: gauge color starting with #,
    value: actual value,
    max: max value
}
**/
function makeGauge(data) {
    var opts = {
        lines: 12, // The number of lines to draw
        angle: 0, // The length of each line
        lineWidth: 0.4, // The line thickness
        pointer: {
            length: 0.75, // The radius of the inner circle
            strokeWidth: 0.042, // The rotation offset
            color: '#BDC3C7' // Fill color
        },
        limitMax: 'false', // If true, the pointer will not go past the end of the gauge
        colorStart: data.color, //'#1ABC9C', // Colors
        colorStop: data.color, // '#1ABC9C', // just experiment with them
        strokeColor: '#F0F3F3', // to see which ones work best for you
        generateGradient: true
    };
    var target = document.getElementById(data.id); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = data.max // 5000; // set max gauge value
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(data.value);  //3200 // set actual value
    gauge.setTextField(document.getElementById(data.id_text));
}

window.onload = function() {
    
}