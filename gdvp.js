
var map = L.map('gdvp-map').setView([51.505, -0.09], 13);
var gdvp = document.getElementById("gdvp-map");

/* Get data */
var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

states.forEach(st => {
  $.ajax({
    dataType: "json",
    url: "./final_by_state/" + st + ".js",
    success: function(data) {
      $(data.features).each(function(key, data) {
        let feat = new L.geoJSON(data).addTo(map);
      });
    }
  })
});

/* Toggle the tooltip */
var tooltipButton = document.getElementById("button-tooltip");
var btnText = document.getElementById("button-tooltip-text");
var tooltip = document.getElementById("tooltip");
tooltipButton.onclick = function() {
  if (tooltip.style.width != "30%") {
    gdvp.style.width = "70vw";
    tooltip.style.width = "30%";
    btnText.innerText = "Close Tooltip";
  } else {
    gdvp.style.width = "100vw";
    tooltip.style.width = "0%";
    btnText.innerText = "Open Tooltip";
  }
};