const map = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "title": "International Math Olympiad Participation Count by Country (1959 to 2024)",
      background: "transparent",
      "width": "container",
      "height": "container",
      "projection": { "type": "equalEarth" },
      "layer": [
        {
          "data": { "sphere": true },
          "mark": { "type": "geoshape", "fill": "#cce5f5" }
        },
        {
          "data": { "graticule": true },
          "mark": { "type": "geoshape", "stroke": "gray", "strokeWidth": 0.25 }
        },
        {
          "data": {
            "url": "https://raw.githubusercontent.com/FIT3179/Vega-Lite/main/3_choropleth_map/js/ne_110m_admin_0_countries.topojson",
            "format": { "type": "topojson", "feature": "ne_110m_admin_0_countries" }
          },
          "transform": [
            {
              "lookup": "properties.NAME",
              "from": {
                "data": {
                  "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/refs/heads/main/data/modified_country.csv",
                  "format": { "type": "csv" }
                },
                "key": "country",
                "fields": ["count"]
              }
            },
            {
              "calculate": "datum.count == null ? 0 : datum.count",
              "as": "count"
            }
          ],
          "mark": { "type": "geoshape", "stroke": "white", "strokeWidth": 0.5 },
          "encoding": {
            "color": {
              "field": "count",
              "type": "quantitative",
              "scale": {
                "type": "threshold",
                "domain": [15, 30, 45],
                "range": ["#deebf7", "#9ecae1", "#4292c6", "#084594"]
              },
              "legend": { "title": "Number of Participations", "orient": "bottom", "offset": 20 }
            },
            "tooltip": [
              { "field": "properties.NAME", "type": "nominal", "title": "Country" },
              { "field": "count", "type": "quantitative", "title": "Number of Participations" }
            ]
          }
        }
      ],
      "config": {
        "title": { "fontSize": 24, "anchor": "middle", "fontWeight": "bold", "offset": 10},
      }
    };

vegaEmbed("#map", map, { mode: "vega-lite" })
.then(console.log)
.catch(console.warn);