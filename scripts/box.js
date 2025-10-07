const box = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Interactive boxplot showing only the selected country with its designated color",
  background: "transparent",
  "width": 700,
  "height": 400,
"autosize": {"type": "pad", "contains": "padding"},
  "padding": {"bottom": 50},
    "title": {
    "text": "Consistency of Competitor Scores by Country (2000-2023)",
    "fontSize": 20,
    "fontWeight": "bold",
    "anchor": "middle",
    "color": "#000000",
    "offset": 10
  },
  "data": {
    "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/refs/heads/main/data/boxplot_data.csv",
    "format": {"type": "csv"}
  },
  "params": [
    {
      "name": "selectedCountry",
      "value": "People's Republic of China",
      "bind": {
        "input": "select",
        "options": [
          "People's Republic of China",
          "United States of America",
          "Republic of Korea",
          "Vietnam",
          "Taiwan"
        ],
        "name": "Select Country: "
      }
    }
  ],
  "transform": [
    {"filter": "datum.country === selectedCountry"}
  ],
  "mark": {
    "type": "boxplot",
    "size": 25,
    "extent": "min-max",
    "box": {"stroke": "black"},       
    "median": {"color": "black"}    
  },
  "encoding": {
    "x": {"field": "year", "type": "ordinal", "title": "Year"},
    "y": {
      "field": "normalised_total",
      "type": "quantitative",
      "title": "Normalised Score",
      "scale": {"domain": [0, 1.1]}
    },
    "color": {
      "field": "country",
      "type": "nominal",
      "scale": {
        "domain": [
          "People's Republic of China",
          "United States of America",
          "Republic of Korea",
          "Vietnam",
          "Taiwan"
        ],
        "range": ["#00CED1", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]
      },
        "legend": null
    },
  }
};

vegaEmbed("#box", box, { mode: "vega-lite" })
  .then(console.log)
  .catch(console.warn);
