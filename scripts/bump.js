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
    {
      "filter": "datum.country_new === 'United States of America' || datum.country_new === 'China' || datum.country_new === 'South Korea' || datum.country_new === 'Germany' || datum.country_new === 'India'"
    },
    {"filter": "datum.year >= 2014 && datum.year <= 2024"},
    {
      "window": [{"op": "row_number", "as": "rank"}],
      "groupby": ["year"]
    }
  ],
  "layer": [
    {
      "mark": {
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
          "legend": null   // remove legend
        },
        "detail": {"field": "country_new"}
      }
    },
    {
      "mark": {"type": "text", "align": "left", "dx": 10, "fontSize": 12},
      "encoding": {
        "x": {"field": "year", "type": "ordinal"},
        "y": {"field": "rank", "type": "quantitative"},
        "text": {"field": "country_new"},
        "color": {"field": "country_new"},
        "detail": {"field": "country_new"}
      },
      "transform": [
        {"filter": "datum.year == 2024"}  // only label the last year
      ]
    }
  ],
  "config": {
    "axis": {"labelFontSize": 12, "titleFontSize": 14}
  }
}


vegaEmbed("#bump", bump, { mode: "vega-lite" })
.then(console.log)
.catch(console.warn);