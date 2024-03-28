The purpose of this challenge is to introduce you to SciChart (so you can see if it is something you would enjoy working with), to see how quickly you can learn something new, and to assess the quality and style of your code.

> Getting started information is at https://www.scichart.com/getting-started/scichart-javascript/.  

> Docs and tutorials are at https://www.scichart.com/documentation/js/current/webframe.html#SciChart_JS_User_Manual.html  

> Demos with access to source code are at https://demo.scichart.com

Your solution should be a react application and should either be developed directly in codesandbox, or pushed to a github repo that we can load into codesandbox.

Download the data from https://ourworldindata.org/grapher/patents-electric-vehicles?time=earliest..2021  
Reproduce this chart using SciChart.  Add appropriate standard interactivity modifiers. 

## Attempt at least one of the following:

1.  Add some UI in react to control some aspects of the chart. Eg country filter, series color, series type.

2. Create a second chart which shows patent types by country for a particular year.  When a column on the main chart is selected, the data for the appropriate year should be shown on the second chart.


import React, { useState, useEffect, useRef } from "react";
import { appTheme } from "scichart-example-dependencies";

import {
    ELegendOrientation,
    ELegendPlacement,
    ENumericFormat,
    LegendModifier,
    MouseWheelZoomModifier,
    NumericAxis,
    SciChartSurface,
    StackedColumnCollection,
    StackedColumnRenderableSeries,
    WaveAnimation,
    XyDataSeries,
    ZoomExtentsModifier,
    ZoomPanModifier
} from "scichart";

const DIV_ELEMENT_ID = "chart";

const drawExample = async () => {
    // Create a SciChartSurface
    const { wasmContext, sciChartSurface } = await SciChartSurface.create(DIV_ELEMENT_ID, {
        theme: appTheme.SciChartJsTheme
    });

    // Create XAxis, YAxis
    sciChartSurface.xAxes.add(
        new NumericAxis(wasmContext, {
            labelFormat: ENumericFormat.Decimal,
            labelPrecision: 0,
            autoTicks: false,
            majorDelta: 1,
            minorDelta: 1,
            drawMajorGridLines: false,
            drawMinorGridLines: false,
            drawMajorBands: false,
            axisTitle: "Year"
        })
    );
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
            labelPrecision: 0,
            axisTitle: "Sales $USD (Billion)", 
        })
    );

    // Data for the example
    const xValues = [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003];
    const yValues1 = [10, 13, 7, 16, 4, 6, 20, 14, 16, 10, 24, 11];
    const yValues2 = [12, 17, 21, 15, 19, 18, 13, 21, 22, 20, 5, 10];
    const yValues3 = [7, 30, 27, 24, 21, 15, 17, 26, 22, 28, 21, 22];
    const yValues4 = [16, 10, 9, 8, 22, 14, 12, 27, 25, 23, 17, 17];
    const yValues5 = [7, 24, 21, 11, 19, 17, 14, 27, 26, 22, 28, 16];

    const data = xValues.map((x, i) => ({
        year: x,
        yValue1: yValues1[i],
        yValue2: yValues2[i],
        yValue3: yValues3[i],
        yValue4: yValues4[i],
        yValue5: yValues5[i],
    }));

    // Create some RenderableSeries - for each part of the stacked column
    const rendSeries1 = new StackedColumnRenderableSeries(wasmContext, {
        dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues1, dataSeriesName: "EU" }),
        fill: appTheme.VividPurple,
        stroke: appTheme.PaleSkyBlue,
        strokeThickness: 1,
        opacity: 0.8,
        stackedGroupId: "StackedGroupId"
    });

    const rendSeries2 = new StackedColumnRenderableSeries(wasmContext, {
        dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues2, dataSeriesName: "Asia" }),
        fill: appTheme.VividPink,
        stroke: appTheme.PaleSkyBlue,
        strokeThickness: 1,
        opacity: 0.8,
        stackedGroupId: "StackedGroupId"
    });

    const rendSeries3 = new StackedColumnRenderableSeries(wasmContext, {
        dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues3, dataSeriesName: "USA" }),
        fill: appTheme.VividOrange,
        stroke: appTheme.PaleSkyBlue,
        strokeThickness: 1,
        opacity: 0.8,
        stackedGroupId: "StackedGroupId"
    });

    const rendSeries4 = new StackedColumnRenderableSeries(wasmContext, {
        dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues4, dataSeriesName: "UK" }),
        fill: appTheme.VividSkyBlue,
        stroke: appTheme.PaleSkyBlue,
        strokeThickness: 1,
        opacity: 0.8,
        stackedGroupId: "StackedGroupId"
    });

    const rendSeries5 = new StackedColumnRenderableSeries(wasmContext, {
        dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues5, dataSeriesName: "Latam" }),
        fill: appTheme.VividTeal,
        stroke: appTheme.PaleSkyBlue,
        strokeThickness: 1,
        opacity: 0.8,
        stackedGroupId: "StackedGroupId"
    });

    // To add the series to the chart, put them in a StackedColumnCollection
    const stackedColumnCollection = new StackedColumnCollection(wasmContext);
    stackedColumnCollection.dataPointWidth = 0.6;
    stackedColumnCollection.add(rendSeries1, rendSeries2, rendSeries3, rendSeries4, rendSeries5);
    stackedColumnCollection.animation = new WaveAnimation({ duration: 1000, fadeEffect: true });

    // Add the Stacked Column collection to the chart
    sciChartSurface.renderableSeries.add(stackedColumnCollection);

    // Add some interactivity modifiers
    sciChartSurface.chartModifiers.add(new ZoomExtentsModifier(), new ZoomPanModifier(), new MouseWheelZoomModifier());

    // Add a legend to the chart to show the series
    sciChartSurface.chartModifiers.add(
        new LegendModifier({
            placement: ELegendPlacement.TopLeft,
            orientation: ELegendOrientation.Vertical,
            showLegend: true,
            showCheckboxes: false,
            showSeriesMarkers: true
        })
    );
    sciChartSurface.zoomExtents();

    return { wasmContext, sciChartSurface, stackedColumnCollection };
};

// React component needed as our examples app is in React
export default function StackedColumnChart() {
    const sciChartSurfaceRef = useRef<SciChartSurface>();
    const stackedColumnCollectionRef = useRef<StackedColumnCollection>();
    const [use100PercentStackedMode, setUse100PercentStackedMode] = useState(false);

    useEffect(() => {
        const chartInitializationPromise = drawExample().then(res => {
            sciChartSurfaceRef.current = res.sciChartSurface;
            stackedColumnCollectionRef.current = res.stackedColumnCollection;
        });

        // Delete sciChartSurface on unmount component to prevent memory leak
        return () => {
            // check if chart is already initialized
            if (sciChartSurfaceRef.current) {
                sciChartSurfaceRef.current.delete();
                return;
            }

            // else postpone deletion
            chartInitializationPromise.then(() => {
                sciChartSurfaceRef.current?.delete();
            });
        };
    }, []);

    const handleUsePercentage = (event: any, value: boolean) => {
        if (value !== null) {
            console.log(`100% stacked? ${value}`);
            setUse100PercentStackedMode(value);
            // Toggle 100% mode on click
            if (stackedColumnCollectionRef.current) { // cannot optional-chain on left-hand side operator
                stackedColumnCollectionRef.current.isOneHundredPercent = value;
            }            
            sciChartSurfaceRef.current?.zoomExtents(200);
        }
    };

    return (
        <section style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", border: '1px solid var(--gray)', padding: 'var(--padding)'}}>
                <h3>Annual patents filed for electric vehicle technologies, World</h3>
                <div style={{display: "flex",padding:'1rem',width: "100%"}}>
                    <button onClick={() => handleUsePercentage(null, false)}>
                        Stacked mode
                    </button>
                    <button onClick={() => handleUsePercentage(null, true)}>
                        100% Stacked mode
                    </button>
                </div>
                <div id={DIV_ELEMENT_ID} style={{flex: 1}} />
        </section>
    );
}