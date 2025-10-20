const radar ={
  "$schema": "https://vega.github.io/schema/vega/v6.json",
    "title": "Top 10 Countries IMO Performance (2020 to 2024)",
  "description": "Radar chart with country dropdown and year slider",
  "width": 500,
  "height": 480,
  "autosize": {"type": "fit", "contains": "padding"},

  "signals": [
    {"name": "radius", "update": "min(width, height)/2 * 0.7"},
    {
      "name": "selectedCountry",
      "value": "United States of America",
      "bind": {
        "input": "select",
        "options": [
          "China",
          "United States of America",
          "South Korea",
          "Russia",
          "United Kingdom",
          "Canada",
          "Romania",
          "Italy",
          "Israel",
          "Taiwan"
        ],
        "name": "Select Country: "
      }
    },
    {
      "name": "selectedYear",
      "value": 2000,
      "bind": {
        "input": "range",
        "min": 2000,
        "max": 2024,
        "step": 1,
        "name": "Select Year: "
      }
    }
  ],

  "data": [
    {
      "name": "table",
      "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/main/data/radar_data3.csv",
      "format": {"type": "csv"}
    },
    {
      "name": "keys",
      "source": "table",
      "transform": [{"type": "aggregate", "groupby": ["key"]}]
    },
    {
      "name": "outerPolygon",
      "source": "keys",
      "transform": [{"type": "formula", "as": "r", "expr": "radius"}]
    },
    {
      "name": "filteredTable",
      "source": "table",
      "transform": [
        {"type": "filter", "expr": "datum.country === selectedCountry && +datum.year === selectedYear"}
      ]
    }
  ],

  "scales": [
    {
      "name": "angular",
      "type": "point",
      "range": {"signal": "[-PI, PI]"},
      "padding": 0.5,
      "domain": {"data": "table", "field": "key"}
    },
    {
      "name": "radial",
      "type": "linear",
      "range": {"signal": "[0, radius]"},
      "zero": true,
      "nice": false,
      "domain": {"data": "table", "field": "value"},
      "domainMin": 0
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": [
        "China",
        "United States of America",
        "South Korea",
        "Russia",
        "United Kingdom",
        "Canada",
        "Romania",
        "Italy",
        "Israel",
        "Taiwan"
      ],
      "range": ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd",
                "#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]
    }
  ],

  "marks": [
    {
      "type": "group",
      "encode": {"enter":{"x":{"signal":"width/2"},"y":{"signal":"height/2"}}},
      "marks": [
        {
          "type": "rule",
          "from": {"data":"keys"},
          "encode": {
            "enter": {
              "x":{"value":0},
              "y":{"value":0},
              "x2":{"signal":"radius*cos(scale('angular', datum.key))"},
              "y2":{"signal":"radius*sin(scale('angular', datum.key))"},
              "stroke":{"value":"lightgray"},
              "strokeWidth":{"value":1}
            }
          }
        },
        {
          "type": "line",
          "from": {"data":"outerPolygon"},
          "encode": {
            "enter": {
              "interpolate":{"value":"linear-closed"},
              "x":{"signal":"datum.r*cos(scale('angular', datum.key))"},
              "y":{"signal":"datum.r*sin(scale('angular', datum.key))"},
              "stroke":{"value":"gray"},
              "strokeWidth":{"value":1}
            }
          }
        },
        {
          "type": "line",
          "from": {"data":"filteredTable"},
          "encode": {
            "enter": {
              "interpolate":{"value":"linear-closed"},
              "x":{"signal":"scale('radial', datum.value)*cos(scale('angular', datum.key))"},
              "y":{"signal":"scale('radial', datum.value)*sin(scale('angular', datum.key))"},
              "stroke":{"scale":"color","field":"country"},
              "strokeWidth":{"value":1},
              "fill":{"scale":"color","field":"country"},
              "fillOpacity":{"value":0.2}
            }
          }
        },
        {
          "type": "text",
          "from": {"data":"filteredTable"},
          "encode": {
            "enter": {
              "x":{"signal":"scale('radial', datum.value) * 0.9 * cos(scale('angular', datum.key))"},
              "y":{"signal":"scale('radial', datum.value) * 0.9  * sin(scale('angular', datum.key))"},
              "text":{"signal":"datum.value"},
              "align":{"value":"center"},
              "baseline":{"value":"middle"},
              "fill":{"value":"black"},
              "fontWeight":{"value":"bold"},
              "fontSize":{"value":12}
            }
          }
        },
        {
          "type": "text",
          "from":{"data":"keys"},
          "encode": {
            "enter": {
              "x":{"signal":"(radius*1.05)*cos(scale('angular', datum.key))"},
              "y":{"signal":"(radius*1.05)*sin(scale('angular', datum.key))"},
              "text":{"field":"key"},
              "align":[{"test":"abs(scale('angular', datum.key))>PI/2","value":"right"},{"value":"left"}],
              "baseline":[{"test":"scale('angular', datum.key)>0","value":"top"},{"test":"scale('angular', datum.key)==0","value":"middle"},{"value":"bottom"}],
              "fill":{"value":"black"},
              "fontWeight":{"value":"bold"}
            }
          }
        }
      ]
    }
  ],
  "config": {
        "title": { "fontSize": 16, "anchor": "middle", "fontWeight": "bold", "offset": -22},
    }
}


vegaEmbed("#radar", radar, { mode: "vega" })
.then(console.log)
.catch(console.warn);