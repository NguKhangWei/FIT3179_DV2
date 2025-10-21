const map = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": {
    "text": "IMO Participation Ratio by Country (1959 to 2024)",
    "anchor": "middle",
    "align": "center",
    "fontSize": 18,
    "offset" : 0
  },
  "width": "container",
  "height": 500,
  "params": [// interactive elements
    {// Zoom feature
      "name": "zoom_level",
      "value": 150,
      "bind": {
        "input": "range",
        "min": 150,
        "max": 2000,
        "step": 10,
        "name": "Zoom: "
      }
    },
    {// For centering to a specific country
      "name": "center_to",
      "value": [0, 20],
      "bind": {
        "input": "select",
        "options": [
          [0, 20],
          [20, 0],
          [10, 50],
          [100, 30],
          [135, -25]
        ],
        "labels": [
          "World",
          "Africa",
          "Europe",
          "Asia",
          "Australia"
        ],
        "name": "Map Centre: "
      }
    }
  ],
  "projection": {
    "type": "equalEarth",
    "center": {"expr": "center_to"},
    "scale": {"expr": "zoom_level"}
  },
  "layer": [
    {
      "data": {"sphere": true},
      "mark": {"type": "geoshape", "fill": "#cce5f5"}
    },
    {
      "data": {"graticule": true},
      "mark": {"type": "geoshape", "stroke": "gray", "strokeWidth": 0.25}
    },
    {
      "data": {// For showing how to draw each country
        "url": "https://raw.githubusercontent.com/FIT3179/Vega-Lite/main/3_choropleth_map/js/ne_110m_admin_0_countries.topojson",
        "format": {"type": "topojson", "feature": "ne_110m_admin_0_countries"}
      },
      "transform": [
        {
          "lookup": "properties.NAME",
          "from": {
            "data": {
              "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179-WEEK-9-HOMEWORK/refs/heads/main/modified_country.csv",
              "format": {"type": "csv"}
            },
            "key": "country",
            "fields": ["count"]
          }
        },
        {
          "calculate": "datum.count == null ? 0 : datum.count / 65", // normalisation
          "as": "normalized_count"
        }
      ],
      "mark": {"type": "geoshape", "stroke": "white", "strokeWidth": 0.5}, // Coloring the map
      "encoding": {
        "color": {
          "field": "normalized_count",
          "type": "quantitative",
          "scale": {
            "type": "threshold",
            "domain": [0.25, 0.5, 0.75],
            "range": ["#fbe7d3", "#f2b880", "#cc6b1c", "#5a2a00"]
          },
          "legend": {
          "title": "Participation Ratio",
          "titleAnchor": "middle", 
          "orient": "none",       
          "direction": "horizontal",
          "legendX": 450,          
          "legendY": 60,         
        }

        },
        "tooltip": [
          {"field": "properties.NAME", "title": "Country"},
          {"field": "normalized_count", "title": "Ratio", "format": ".2f"}
        ]
      }
    },
    {// Text annotation
      "data": {
        "values": [
          {"text": "Low participation due", "lon": 40, "lat": 10},
          {"text": "to lack of awareness", "lon": 39, "lat": 5},
          {"text": "and infrastructure", "lon": 36, "lat": 0}
        ]
      },
      "mark": {
        "type": "text",
        "fontSize": 12,
        "dy": -10,
        "dx": 5,
        "color": "black",
        "fontStyle": "italic"
      },
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "text": {"field": "text"}
      }
    },
    {// Text annotation
      "data": {
        "values": [
          {"text": "No participation due to", "lon": 40, "lat": 10},
          {"text": "no permanent population", "lon": 39, "lat": 5},
        ]
      },
      "mark": {
        "type": "text",
        "fontSize": 12,
        "dy": 190,
        "dx": 5,
        "color": "black",
        "fontStyle": "italic"
      },
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "text": {"field": "text"}
      }
    },
    {// Text annotation
      "data": {
        "values": [
          {"text": "Contains", "lon": 40, "lat": 10},
          {"text": "missing", "lon": 40, "lat": 5},
          {"text": "records", "lon": 40, "lat": 0},
        ]
      },
      "mark": {
        "type": "text",
        "fontSize": 12,
        "dy": -140,
        "dx": 50,
        "color": "black",
        "fontStyle": "italic"
      },
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "text": {"field": "text"}
      }
    }
  ]
}
;

vegaEmbed("#map", map, { mode: "vega-lite" })
.then(console.log)
.catch(console.warn);