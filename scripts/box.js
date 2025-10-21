const box = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Interactive boxplot showing only the selected country with its designated color and annotations",
  "background": "transparent",
  "width": "container",
  "height": 400,
  "autosize": {"type": "pad", "contains": "padding"},
  "padding": {"bottom": 50},
  "title": {
    "text": "Consistency of Competitor Scores by Country (2000 to 2024)",
    "fontSize": 18,
    "fontWeight": "bold",
    "anchor": "middle",
    "color": "#000000",
    "offset": 10
  },
  // params for interactive elements
  "params": [
    {
      "name": "selectedCountry", // Define the variable
      "value": "People's Republic of China", // Value of the variable
      "bind": {
        "input": "select", // Dropdwon type
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
  "layer": [
{
  // Line annotation (only shows for China)
  "data": {
    "values": [
      {"country": "People's Republic of China", "year": "2022"}
    ]
  },
  "transform": [
    {"filter": "datum.country === selectedCountry"}
  ],
  "mark": {
    "type": "rule",
    "color": "black",
    "strokeWidth": 1
  },
  "encoding": {
    "x": { "field": "year", "type": "ordinal" },
    "y": { "value": 50 },
    "y2": { "value": 80 }  // roughly the max of your y-axis
  }
},    
    {
  // Line annotation (only shows for China)
  "data": {
    "values": [
      {"country": "United States of America", "year": "2022"}
    ]
  },
  "transform": [
    {"filter": "datum.country === selectedCountry"}
  ],
  "mark": {
    "type": "rule",
    "color": "black",
    "strokeWidth": 1
  },
  "encoding": {
    "x": { "field": "year", "type": "ordinal" },
    "y": { "value": 200 },
    "y2": { "value": 240 }  // roughly the max of your y-axis
  }
},

    {
      // Boxplot layer
      "data": {
        "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/refs/heads/main/data/boxplot_data.csv",
        "format": {"type": "csv"}
      },
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
        "x": {"field": "year", "type": "ordinal", "title": "Year", "axis": {
    "titlePadding": 10  // <-- increase this value to move label further away
  }},
        "y": {
          "field": "normalised_total",
          "type": "quantitative",
          "title": "Normalized Individual Score",
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
        }
      }
    },
    {
      // Annotation layer
      "data": {
        "values": [
          {"country": "Republic of Korea", "text": "Earlier years show very large", "year": 2021, "y_custom": 0.3},
          {"country": "Republic of Korea", "text": "gap, indicating a clear skill", "year": 2021, "y_custom": 0.25},
          {"country": "Republic of Korea", "text": "difference among team mates", "year": 2021, "y_custom": 0.2},

        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 200,
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
      // Annotation layer
      "data": {
        "values": [
          {"country": "Republic of Korea", "text": "Later years show improved", "year": 2021, "y_custom": 0.3},
          {"country": "Republic of Korea", "text": "consistency, reflecting", "year": 2021, "y_custom": 0.25},
          {"country": "Republic of Korea", "text": "lessons learned", "year": 2021, "y_custom": 0.2},

        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 700,
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
      // Annotation layer
      "data": {
        "values": [
          {"country": "United States of America", "text": "Some years show inconsistencies", "year": 2021, "y_custom": 0.3},
          {"country": "United States of America", "text": "but the USA remains largely", "year": 2021, "y_custom": 0.25},
          {"country": "United States of America", "text": "consistent throughout", "year": 2021, "y_custom": 0.2},

        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 550,
        "dy": -30,
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
      // Annotation layer
      "data": {
        "values": [
          {"country": "United States of America", "text": "2022 shows the widest gap,", "year": 2021, "y_custom": 0.3},
          {"country": "United States of America", "text": "though still narrower than", "year": 2021, "y_custom": 0.25},
          {"country": "United States of America", "text": "China’s widest gap", "year": 2021, "y_custom": 0.2},

        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 870,
        "dy": -30,
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
      // Annotation layer
      "data": {
        "values": [
          {"country": "People's Republic of China", "text": "Team performance was", "year": 2017, "y_custom": 0.3},
          {"country": "People's Republic of China", "text": "more inconsistent around", "year": 2017, "y_custom": 0.25},
          {"country": "People's Republic of China", "text": "this period", "year": 2017, "y_custom": 0.20},

        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 200,
        "dy": -50,
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
      // Annotation layer
      "data": {
        "values": [
          {"country": "Taiwan", "text": "No clear trend — stable years were", "year": 2017, "y_custom": 0.3},
          {"country": "Taiwan", "text": "steady, volatile years were erratic", "year" : 2017, "y_custom": 0.25},
        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 550,
        "dy": 10,
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
      // Annotation layer
      "data": {
        "values": [
          {"country": "People's Republic of China", "text": "Shorter bodies than the past", "year": 2017, "y_custom": 0.3},
          {"country": "People's Republic of China", "text": "shows improvement in selecting", "year": 2017, "y_custom": 0.25},
          {"country": "People's Republic of China", "text": "consistent team members", "year": 2017, "y_custom": 0.20},

        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 600,
        "dy": -50,
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
      // Annotation layer
      "data": {
        "values": [
          {"country": "People's Republic of China", "text": "Perfectly consistent", "year": 2017, "y_custom": 0.7},
          {"country": "People's Republic of China", "text": "team where everyone", "year": 2017, "y_custom": 0.65},
          {"country": "People's Republic of China", "text": "scored full points", "year": 2017, "y_custom": 0.60},

        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 880,
        "dy": -50,
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
      // Annotation layer
      "data": {
        "values": [
          {"country": "Vietnam", "text": "Discrepancy peaked", "year": 2017, "y_custom": 0.7},
          {"country": "Vietnam", "text": "in 2020, possibly", "year": 2017, "y_custom": 0.65},
          {"country": "Vietnam", "text": "pandemic-related", "year": 2017, "y_custom": 0.6}
        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 590,
        "dy": 100,
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
  ]
};

vegaEmbed("#box", box, { mode: "vega-lite" })
  .then(console.log)
  .catch(console.warn);
