const bump = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "IMO bump chart: 5 countries 2014-2024 (India replaces Russia) with line-end labels instead of a legend",
  "background": "transparent",
  "title": {
    "text": "Top 5 Active IMO Participating Countries",
    "fontSize": 20,
    "fontWeight": "bold",
    "anchor": "middle",
    "offset": 20
  },
  "width": "container",
  "height": "container",
  "data": {
    "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/main/data/cleaned_country_imo.csv",
    "format": {"type": "csv"}
  },
  "transform": [
    {// Filter the top countries
      "filter": "datum.country_new === 'United States of America' || datum.country_new === 'China' || datum.country_new === 'South Korea' || datum.country_new === 'Germany' || datum.country_new === 'India'"
    },
    {"filter": "datum.year >= 2014 && datum.year <= 2024"}, // Filter for this decade
    {
      "window": [{"op": "row_number", "as": "rank"}], // Assign 1, 2, 3... for each year
      "groupby": ["year"]
    }
  ],
  "layer": [
    {
      "mark": {// For the circle point on the bump chart lines at each year
        "type": "line",
        "strokeWidth": 3,
        "interpolate": "linear",
        "point": {"filled": true, "size": 200, "shape": "circle"}
      },
      "encoding": {
        "x": {
          "field": "year", 
          "type": "ordinal",
          "axis": {
            "title": "Year",
            "labelAngle": 0,
            "labelPadding": 10,
            "grid": false,
            "domain": false
          }
        },
        "y": {
          "field": "rank",
          "type": "quantitative",
          "scale": {"reverse": true, "domain": [1, 5]},
          "axis": {
            "title": "Ranking",
            "tickMinStep": 1,
            "format": "d",
            "grid" : false,
            "domain": false
          }
        },
        "color": {
          "field": "country_new",
          "type": "nominal",
          "legend": null,
          "scale": {
            "domain": ["United States of America", "China", "South Korea", "Germany", "India"],
            "range": ["#CC79A7", "#008080", "cyan", "brown", "orange"]  // your desired colors
          },
        },
        "detail": {"field": "country_new"}
      }
    },
    {// Label the country China
  "mark": {"type": "text", "align": "left", "dx": -10, "fontSize": 12, "fontWeight": "bold"},
  "transform": [
    {"filter": "datum.year == 2024 && datum.country_new == 'China'"},
    {"calculate": "datum.rank + 0.2", "as": "y_label"}
  ],
  "encoding": {
    "x": {"field": "year", "type": "ordinal"},
    "y": {"field": "y_label", "type": "quantitative"},
    "text": {"field": "country_new"}
  }
},
{// Label the country USA
  "mark": {"type": "text", "align": "left", "dx": -10, "fontSize": 12, "fontWeight": "bold"},
  "transform": [
    {"filter": "datum.year == 2024 && datum.country_new == 'United States of America'"},
    {"calculate": "datum.rank + 0.2", "as": "y_label"},
    {"calculate": "'USA'", "as": "label_text"} 
  ],
  "encoding": {
    "x": {"field": "year", "type": "ordinal"},
    "y": {"field": "y_label", "type": "quantitative"},
    "text": {"field": "label_text"}
  }
},
{// Label the country South Korea
  "mark": {"type": "text", "align": "left", "dx": -80, "dy": -30, "fontSize": 12, "fontWeight": "bold"},
  "transform": [
    {"filter": "datum.year == 2024 && datum.country_new == 'South Korea'"},
    {"calculate": "datum.rank + 0.2", "as": "y_label"}
  ],
  "encoding": {
    "x": {"field": "year", "type": "ordinal"},
    "y": {"field": "y_label", "type": "quantitative"},
    "text": {"field": "country_new"}
  }
},
{// Label the country Germany
  "mark": {"type": "text", "align": "left", "dx": -80, "dy": -30, "fontSize": 12, "fontWeight": "bold"},
  "transform": [
    {"filter": "datum.year == 2024 && datum.country_new == 'Germany'"},
    {"calculate": "datum.rank + 0.2", "as": "y_label"} // Make the label slighlty above
  ],
  "encoding": {
    "x": {"field": "year", "type": "ordinal"},
    "y": {"field": "y_label", "type": "quantitative"},
    "text": {"field": "country_new"}
  }
},
{// Label the country India
  "mark": {"type": "text", "align": "left", "dx": -80, "dy": -30, "fontSize": 12, "fontWeight": "bold"},
  "transform": [
    {"filter": "datum.year == 2024 && datum.country_new == 'India'"},
    {"calculate": "datum.rank + 0.2", "as": "y_label"}
  ],
  "encoding": {
    "x": {"field": "year", "type": "ordinal"},
    "y": {"field": "y_label", "type": "quantitative"},
    "text": {"field": "country_new"}
  }
},
// Text annotatoin
{
  "data": {
    "values": [
      {"text": "USA team faced difficulties", "year": 2017, "y_custom": 6},
      {"text": "due to the extremely", "year": 2017, "y_custom": 6.2},
      {"text": "challenging year for IMO", "year": 2017, "y_custom": 6.4}
    ]
  },
  "mark": {
    "type": "text",
    "dx": 350,
    "dy": -270,
    "fontSize": 12,
    "fontStyle": "italic",
    "color": "black"
  },
  "encoding": {
    "x": {"field": "year", "type": "ordinal"},
    "y": {"field": "y_custom", "type": "quantitative"},
    "text": {"field": "text"}
  }
}



  ],
  "config": {
    "axis": {"labelFontSize": 12, "titleFontSize": 14}
  }
}


vegaEmbed("#bump", bump, { mode: "vega-lite" })
.then(console.log)
.catch(console.warn);