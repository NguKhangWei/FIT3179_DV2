const line = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "IMO performance trends for selected countries (avg team score per student, post-2000, highlighting top 3)",
  "background": "transparent",
  "title": {
    "text": "Average Team Score per Student for Selected Countries (2000 to 2024)",
    "fontSize": 20,
    "fontWeight": "bold",
    "anchor": "middle",
    "offset": 20
  },
  "data": {
    "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/main/data/cleaned_country_imo.csv",
    "format": {"type": "csv"}
  },
  "transform": [
    {
      "calculate": "toNumber(datum.p1) + toNumber(datum.p2) + toNumber(datum.p3) + toNumber(datum.p4) + toNumber(datum.p5) + toNumber(datum.p6)",
      "as": "team_total"
    },
    {
      "calculate": "datum.team_total / toNumber(datum.team_size_all)",
      "as": "avg_score"
    },
    {
      "filter": "toNumber(datum.year) >= 2000"
    },
    {
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
    {
      "data": {
        "values": [{"year": "2017"}]
      },
      "mark": {
        "type": "rule",
        "color": "grey",
        "strokeWidth": 2
      },
      "encoding": {
        "x": { "field": "year", "type": "ordinal" },
        "y": { "value": 275 },
        "y2": { "value": 300 }  // set this to roughly the max of your y-axis
      }
    },
        {
      "data": {
        "values": [{"year": "2007"}]
      },
      "mark": {
        "type": "rule",
        "color": "grey",
        "strokeWidth": 2
      },
      "encoding": {
        "x": { "field": "year", "type": "ordinal" },
        "y": { "value": 70 },
        "y2": { "value": 120 }  // set this to roughly the max of your y-axis
      }
    },
    {
      "data": {
        "values": [{"year": "2020"}]
      },
      "mark": {
        "type": "rule",
        "color": "black",
        "strokeWidth": 1
      },
      "encoding": {
        "x": { "field": "year", "type": "ordinal" },
        "y": { "value": 0 },
        "y2": { "value": 400 }  // set this to roughly the max of your y-axis
      }
    },
    {
      "mark": { "type": "line", "point": false },
      "encoding": {
        "x": { "field": "year", "type": "ordinal", "title": "Year" },
        "y": { "field": "avg_score", "type": "quantitative", "title": "Average team points per student" },
        "color": {
          "condition": {
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
    // Text label 1
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
    // Text label 2
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
    // Text label 2
    "data": { "values": [{"year": "2012", "avg_score": 45, "label": "Russia"}] },
    "mark": { "type": "text", "align": "left", "dx": 350, "dy": 115, "fontWeight": "bold" },
    "encoding": {
      "x": { "field": "year", "type": "ordinal" },
      "y": { "field": "avg_score", "type": "quantitative" },
      "text": { "field": "label" },
      "color": { "value": "black" }
    }
  },
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
{
  "data": {
    "values": [{"x_start": "2020", "x_end": "2024"}]  // x_end = last year in your chart
  },
  "mark": {
    "type": "rect",
    "color": "#e1e1e1ff",  // light gray fill
    "opacity": 0.3       // adjust transparency
  },
  "encoding": {
    "x": { "field": "x_start", "type": "ordinal" },
    "x2": { "field": "x_end", "type": "ordinal" },
    "y": { "value": 0 },          // bottom of chart
    "y2": { "value": 400 }         // top of chart, adjust to match your y-axis max
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