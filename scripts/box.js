const box = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Interactive boxplot showing only the selected country with its designated color and annotations",
  "background": "transparent",
  "width": "container",
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
  "layer": [
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
        }
      }
    },
    {
      // Annotation layer
      "data": {
        "values": [
          {"country": "United States of America", "text": "Some inconsistent", "year": 2021, "y_custom": 0.3},
          {"country": "United States of America", "text": "years is to be expected", "year": 2021, "y_custom": 0.25},

        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 800,
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
          {"country": "Vietnam", "text": "Noticeable drop in score", "year": 2017, "y_custom": 0.7}
        ]
      },
      "transform": [
        {"filter": "datum.country === selectedCountry"}
      ],
      "mark": {
        "type": "text",
        "dx": 10,
        "dy": -5,
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
