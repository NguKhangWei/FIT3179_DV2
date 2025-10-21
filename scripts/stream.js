const stream = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "description": "Streamgraph with inverted brown palette",
  "background": "transparent",
  "width": "container",
  "height": "container",
  "title": {
    "text": "Trends in IMO Problem Performance (1981 to 2024)",
    "fontSize": 18,
    "fontWeight": "bold",
    "anchor": "middle",
    "offset": 0
  },

  "layer": [
    {
      "data": {
        "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/main/data/stream_data_normalized_longer.csv",
        "format": {"type": "csv"}
      },
      "mark": {
        "type": "area", //Layer for each category
        "interpolate": "monotone"
      },
      "encoding": {
        "x": {
          "field": "year",
          "type": "ordinal",
          "axis": {"title": "Year"}
        },
        "y": {
          "field": "value",
          "type": "quantitative",
          "stack": "center",
          "axis": null
        },
        "color": {
          "field": "category",
          "type": "nominal",
          "scale": {
            "range": [
              "#1b728a",
              "#4fa37a",
              "#9fc96b",
              "#3d497d",
              "#512b73",
              "#e4c84d"
            ]
          },
          "legend": {"title": "Category", "orient": "top"}
        }
      }
    },

    {// Line annotation
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
        "y": { "value": 70 },
        "y2": { "value": 200 }  
      }
    },
    {// Line annotation
      "data": {
        "values": [{"year": "2000"}]
      },
      "mark": {
        "type": "rule",
        "color": "black",
        "strokeWidth": 1
      },
      "encoding": {
        "x": { "field": "year", "type": "ordinal" },
        "y": { "value": 70 },
        "y2": { "value": 200 }  
      }
    },
    {// Line annotation
      "data": {
        "values": [{"year": "2006"}]
      },
      "mark": {
        "type": "rule",
        "color": "black",
        "strokeWidth": 1
      },
      "encoding": {
        "x": { "field": "year", "type": "ordinal" },
        "y": { "value": 300 },
        "y2": { "value": 318 }  // set this to roughly the max of your y-axis
      }
    },

    {// Text annotation
  "data": {
    // "values": [
    //   {"text": "Problem 3 scores declined steadily,", "year": 2007, "y_custom": 8},
    //   {"text": "reaching their lowest point in 2017,", "year": 2007, "y_custom": 6.5},
    //   {"text": "one of the toughest IMO on record", "year": 2007, "y_custom": 5},
    // ]
    "values": [
      {"text": "Lowest peformance in 2017 during one", "year": 2007, "y_custom": 8},
      {"text": "of the hardest IMOs ever recorded", "year": 2007, "y_custom": 6.5},
    ]
  },
  "mark": {
    "type": "text",
    "dx": 925,
    "dy": -245,
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
{// Text annotation
  "data": {
    "values": [
      {"text": "This marks the beginning of the", "year": 2007, "y_custom": 8},
      {"text": "decline in Problem 3 scores", "year": 2007, "y_custom": 6.5},
    ]
  },
  "mark": {
    "type": "text",
    "dx": 500,
    "dy": -245,
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
{// Text annotation
  "data": {
    "values": [
      {"text": "Problem 6 performance dropped sharply", "year": 2007, "y_custom": 8},
      {"text": "after the decision to make it harder.", "year": 2007, "y_custom": 6.5},
    ]
  },
  "mark": {
    "type": "text",
    "dx": 650,
    "dy": 55,
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
    "view": {"stroke": "transparent"}
  }
};

vegaEmbed("#stream", stream, { mode: "vega" })
  .then(console.log)
  .catch(console.warn);
