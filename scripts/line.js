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
  "mark": {
    "type": "line",
    "point": false
  },
  "encoding": {
    "x": {"field": "year", "type": "ordinal", "title": "Year"},
    "y": {
      "field": "avg_score",
      "type": "quantitative",
      "title": "Average team points per student"
    },
    "color": {
      "condition": {
        "test": "datum.country_new == 'China' || datum.country_new == 'United States of America' || datum.country_new == 'Russia'",
        "field": "country_new",
        "type": "nominal",
        "scale": {
          "domain": ["China", "United States of America", "Russia"],
          "range": ["#e41a1c", "#377eb8", "#4daf4a"]  
        }
      },
      "value": "lightgrey"
    },
    "tooltip": [
      {"field": "year", "type": "ordinal"},
      {"field": "country_new", "type": "nominal"},
      {"field": "avg_score", "type": "quantitative", "format": ".2f"},
      {"field": "team_total", "type": "quantitative"}
    ]
  },
  "width": 1000,
  "height": 500,
  "config": {
    "legend": {"orient": "top-center" },
  }
}



vegaEmbed("#line", line, { mode: "vega-lite" })
.then(console.log)
.catch(console.warn);