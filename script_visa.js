const width = 960, height = 600;
const svg = d3.select("#visamap1");

const projection = d3.geoNaturalEarth1()
  .scale(160)
  .translate([width / 2, height / 2]);

let mode = "one-to-all";
let lastClickedFeature = null; // save clicked country

const pathGenerator = d3.geoPath().projection(projection);
const tooltip = d3.select("#visa-tooltip");
const countryLabel = d3.select("#country-label");
const instruction  = d3.select("#visaInstruction");

// colors
const requirementKey = {
  "visa free":"#499F68",
  "visa on arrival": "#77B28C",
  "e-visa":"#4BB3FD",
  "eta":"#1F78B4",
  "7":"#027BCE","10":"#027BCE","14":"#027BCE","15":"#027BCE", // Tim: maybe let's just mix eta 7-360 and eta?
  "21":"#027BCE","28":"#027BCE","42":"#027BCE","45":"#027BCE",
  "60":"#027BCE","30":"#027BCE","31":"#027BCE","90":"#027BCE",
  "120":"#027BCE","150":"#027BCE","180":"#027BCE","240":"#027BCE",
  "360":"#027BCE",
  "visa required": "#6e6e6e",
  "no admission": "#000000",
  "-1":"#EE964B"
};

let visaDataGlobal, countriesGlobal;

// map & data
Promise.all([
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
  d3.csv("https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv")
]).then(([geojson, visaData]) => {
  visaDataGlobal = visaData;

  const g = svg.select(".visaMapRoot");

  const countries = g.selectAll("path")
    .data(geojson.features)
    .join("path")
      .attr("d", pathGenerator)
      .attr("class", "country")
      .attr("fill", "#ccc")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", "1px")
      .on("click", (event, d) => handleClick(d));

  countriesGlobal = countries;

  svg.insert("rect", ":first-child")
    .attr("width", width).attr("height", height)
    .attr("fill", "transparent")
    .on("click", () => {
      instruction.text("Click a country to see its visa access");
      lastClickedFeature = null;
      countries.transition().duration(500).attr("fill", "#ccc");
    });

  // legend
  const legend = d3.select(".visa-legend");
  const staticItems = [
    "visa free", "visa on arrival", "e-visa", "eta", "visa required", "no admission"
  ];
  staticItems.forEach(key => {
    legend.append("div")
      .attr("class", "visa-legend-item")
      .html(`<span class="visa-legend-color" style="background:${requirementKey[key]}"></span>${key}`);
  });
  legend.append("div")
    .attr("class", "visa-legend-item")
    .html(`<span class="visa-legend-color" style="background:${requirementKey["7"]}"></span>ETA (7–360 days)`);
});

// handle clicks
function handleClick(d) {
  lastClickedFeature = d;
  const iso = d.id, name = d.properties.name;

  instruction.text(
    mode === "one-to-all"
      ? `Visa requirements from ${name}`
      : `Visa requirements to enter ${name}`
  );

  const reqMap = new Map();
  visaDataGlobal
    .filter(row => mode === "one-to-all"
      ? row.Passport     === iso
      : row.Destination  === iso
    )
    .forEach(row => {
      const otherISO = mode === "one-to-all" ? row.Destination : row.Passport;
      reqMap.set(otherISO, row.Requirement.toLowerCase());
    });

  countriesGlobal.transition().duration(500)
    .attr("fill", d => {
      if (d.id === iso) return requirementKey["-1"];
      const req = reqMap.get(d.id);
      return req && requirementKey[req] ? requirementKey[req] : "#eee";
    });
}

// set / switch mode
function setMode(newMode) {
  mode = newMode;
  d3.selectAll("button").classed("active", false);
  d3.select(newMode === "one-to-all" ? "#oneToAll" : "#AllToOne")
    .classed("active", true);

  // refresh immediately
  if (lastClickedFeature) {
    handleClick(lastClickedFeature);
  }
}

// Buttons
d3.select("#oneToAll").on("click", () => setMode("one-to-all"));
d3.select("#AllToOne").on("click", () => setMode("all-to-one"));
