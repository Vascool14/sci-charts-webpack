import {
    SciChartSurface,
    NumericAxis,
    FastLineRenderableSeries,
    XyDataSeries,
    EllipsePointMarker,
    SweepAnimation,
    SciChartJsNavyTheme,
    NumberRange
  } from "scichart";
  
  export async function initSciChart() {
    // LICENSING
    // Commercial licenses set your license code here
    // Purchased license keys can be viewed at https://www.scichart.com/profile
    // How-to steps at https://www.scichart.com/licensing-scichart-js/
    // SciChartSurface.setRuntimeLicenseKey("YOUR_RUNTIME_KEY");
  
    // Initialize SciChartSurface. Don't forget to await!
    const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart-root", {
      theme: new SciChartJsNavyTheme(),
      title: "SciChart.js First Chart",
      titleStyle: { fontSize: 22 }
    });
  
    // Create an XAxis and YAxis with growBy padding
    const growBy = new NumberRange(0.1, 0.1);
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { axisTitle: "X Axis", growBy }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { axisTitle: "Y Axis", growBy }));
  
    // Create a line series with some initial data
    sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
      stroke: "steelblue",
      strokeThickness: 3,
      dataSeries: new XyDataSeries(wasmContext, {
        xValues: [0,1,2,3,4,5,6,7,8,9],
        yValues: [0, 0.0998, 0.1986, 0.2955, 0.3894, 0.4794, 0.5646, 0.6442, 0.7173, 0.6]
      }),
      pointMarker: new EllipsePointMarker(wasmContext, { width: 11, height: 11, fill: "#fff" }),
      animation: new SweepAnimation({ duration: 1500, fadeEffect: true })
    }));
  
    return sciChartSurface;
  }