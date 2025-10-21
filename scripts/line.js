const line = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "IMO performance trends for selected countries (avg team score per student, post-2000, highlighting top 3)",
  "background": "transparent",
  "title": {
    "text": "Average Team Score per Student for Selected Countries (2000 to 2024)",
    "fontSize": 16,
    "fontWeight": "bold",
    "anchor": "middle",
    "offset": 20
  },
  "data": {
    "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/main/data/cleaned_country_imo.csv",
    "format": {"type": "csv"}
  },
  "transform": [
    {// Sum of all question points
      "calculate": "toNumber(datum.p1) + toNumber(datum.p2) + toNumber(datum.p3) + toNumber(datum.p4) + toNumber(datum.p5) + toNumber(datum.p6)",
      "as": "team_total"
    },
    {// Normalisation
      "calculate": "datum.team_total / toNumber(datum.team_size_all)",
      "as": "avg_score"
    },
    {// Only for years 2000 and above
      "filter": "toNumber(datum.year) >= 2000"
    },
    {// Only for these countries
      "filter": {
        "field": "country_new",
        "oneOf": [
          "China",
          "United States of America",
          "India",
          "Russia",
          "German",
          "Germany",
          "United Kingdom",
          "South Korea",
          "Japan",
          "Canada",
          "Australia",
          "People's Republic of China",
          "Russian Federation"
        ]
      }
    }
  ],
  "layer": [
    // Line annotation
    {
      "data": {
        "values": [{"year": "2017"}]
      },
      "mark": {
        "type": "rule",
        "color": "black",
        "strokeWidth": 1
      },
      "encoding": {
        "x": { "field": "year", "type": "ordinal" },
        "y": { "value": 275 },
        "y2": { "value": 300 }  
      }
    },
    // Line annotation
      {
      "data": {
        "values": [{"year": "2007"}]
      },
      "mark": {
        "type": "rule",
        "color": "black",
        "strokeWidth": 1
      },
      "encoding": {
        "x": { "field": "year", "type": "ordinal" },
        "y": { "value": 70 },
        "y2": { "value": 120 }  
      }
    },

    {// Draw the lines
      "mark": { "type": "line", "point": false }, // Remove the points on the line
      "encoding": {
        "x": { "field": "year", "type": "ordinal", "title": "Year" },
        "y": { "field": "avg_score", "type": "quantitative", "title": "Average team points per student" },
        "color": {
          "condition": {// Highlight the top countries
            "test": "datum.country_new == 'China' || datum.country_new == 'United States of America' || datum.country_new == 'Russia'",
            "field": "country_new",
            "type": "nominal",
            "scale": {
              "domain": ["China", "United States of America", "Russia"],
              "range": ["#008080", "#CC79A7", "#B8860B"]
            },
          "legend": null
          },
          "value": "lightgrey"
        },
        "tooltip": [
          {"field": "year", "type": "ordinal"},
          {"field": "country_new", "type": "nominal"},
          {"field": "avg_score", "type": "quantitative", "format": ".2f"},
          {"field": "team_total", "type": "quantitative"}
        ]
      }
    },
    {
    // China label
    "data": { "values": [{"year": "2010", "avg_score": 42, "label": "China"}] },
    "mark": { "type": "text", "align": "left", "dx": 550, "dy": 0, "fontWeight": "bold" },
    "encoding": {
      "x": { "field": "year", "type": "ordinal" },
      "y": { "field": "avg_score", "type": "quantitative" },
      "text": { "field": "label" },
      "color": { "value": "black" }
    }
  },
  {
    // USA label
    "data": { "values": [{"year": "2012", "avg_score": 45, "label": "USA"}] },
    "mark": { "type": "text", "align": "left", "dx": 430, "dy": 70, "fontWeight": "bold" },
    "encoding": {
      "x": { "field": "year", "type": "ordinal" },
      "y": { "field": "avg_score", "type": "quantitative" },
      "text": { "field": "label" },
      "color": { "value": "black" }
    }
  },
    {
    // Russia label
    "data": { "values": [{"year": "2012", "avg_score": 45, "label": "Russia"}] },
    "mark": { "type": "text", "align": "left", "dx": 350, "dy": 115, "fontWeight": "bold" },
    "encoding": {
      "x": { "field": "year", "type": "ordinal" },
      "y": { "field": "avg_score", "type": "quantitative" },
      "text": { "field": "label" },
      "color": { "value": "black" }
    }
  },
  // Text annotations
  {
  "data": {
    "values": [
      {"text": "Sharp drop in average", "year": 2017, "y_custom": 8},
      {"text": "team scores across the", "year": 2017, "y_custom": 6.5},
      {"text": "most countries due to", "year": 2017, "y_custom": 5},
      {"text": "very difficult questions", "year": 2017, "y_custom": 3.5}
    ]
  },
  "mark": {
    "type": "text",
    "dx": 750,
    "dy": -10,
    "fontSize": 12,
    "fontStyle": "italic",
    "color": "black"
  },
  "encoding": {
    "x": {"field": "year", "type": "ordinal"},
    "y": {"field": "y_custom", "type": "quantitative"},
    "text": {"field": "text"}
  }
},
{
  "data": {
    "values": [
      {"text": "Noticeable drop in", "year": 2017, "y_custom": 8},
      {"text": "average team score", "year": 2017, "y_custom": 6.5},
      {"text": "during the pandemic", "year": 2017, "y_custom": 5},
      {"text": "before improvement", "year": 2017, "y_custom": 3.5},
    ]
  },
  "mark": {
    "type": "text",
    "dx": 950,
    "dy": -45,
    "fontSize": 12,
    "fontStyle": "italic",
    "color": "black"
  },
  "encoding": {
    "x": {"field": "year", "type": "ordinal"},
    "y": {"field": "y_custom", "type": "quantitative"},
    "text": {"field": "text"}
  }
},
{// Line annotations for filling grey
  "data": {
    "values": [{"x_start": "2020", "x_end": "2024"}]  
  },
  "mark": {
    "type": "rect",
    "color": "#e1e1e1ff",  
    "opacity": 0.3      
  },
  "encoding": {
    "x": { "field": "x_start", "type": "ordinal" },
    "x2": { "field": "x_end", "type": "ordinal" },
    "y": { "value": 0 },         
    "y2": { "value": 400 }       
  }
},
{
  "data": {
    "values": [
      {"text": "Russia was first", "year": 2007, "y_custom": 8},
      {"text": "to dethrone China", "year": 2007, "y_custom": 6.5},
      {"text": "in the 21st century", "year": 2007, "y_custom": 5},
    ]
  },
  "mark": {
    "type": "text",
    "dx": 320,
    "dy": -300,
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
  "width": "container",
  "height": "container",
  "config": {
    "legend": {"orient": "top-center" },
  }
}



vegaEmbed("#line", line, { mode: "vega-lite" })
.then(console.log)
.catch(console.warn);