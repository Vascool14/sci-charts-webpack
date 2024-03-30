import React, { useContext, useEffect, useRef } from "react";
// import { appTheme } from "scichart-example-dependencies";
import { ContextInterface, DataInterface } from "../types";
import { Context } from "../Context";
import { COLORS } from "../utils/constants";
import {
    ELegendOrientation,
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
    ZoomPanModifier,
    EExecuteOn,
    ELegendPlacement,
} from "scichart";

const DIV_ELEMENT_ID = "chart1";

async function drawExample(DATA: DataInterface, option: string) {
    // Create a SciChartSurface
    const { wasmContext, sciChartSurface } = await SciChartSurface.create(DIV_ELEMENT_ID, {
        // theme: appTheme.SciChartJsTheme
    })

    // Create XAxis, YAxis
    sciChartSurface.xAxes.add(
        new NumericAxis(wasmContext, {
            labelFormat: ENumericFormat.Decimal,
            labelPrecision: 0,
            autoTicks: false,
            majorDelta: 1,
            minorDelta: 1,
            drawMajorGridLines: false,
            drawMinorGridLines: false
        })
    );
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
            labelPrecision: 0
        })
    );
    
    const SERIES = ['EV machine tech', 'EV storage', 'EV management', 'EV communication tech', 'EV charging stations']
    const stackedColumnCollection = new StackedColumnCollection(wasmContext);

    // Create some RenderableSeries - for each part of the stacked column
    for (let i = 0; i < DATA[option].yValues?.length; i++) {
        const rendSeries = new StackedColumnRenderableSeries(wasmContext, {
            dataSeries: new XyDataSeries(wasmContext, { xValues: DATA[option].xValues, yValues: DATA[option].yValues[i], dataSeriesName: SERIES[i] }),
            fill: COLORS[i],
            strokeThickness: 0,
            opacity: 1,
            stackedGroupId: "StackedGroupId"
        });
        stackedColumnCollection.add(rendSeries);
    }

    // To add the series to the chart, put them in a StackedColumnCollection
    stackedColumnCollection.dataPointWidth = 0.6;
    stackedColumnCollection.animation = new WaveAnimation({ duration: 1000, fadeEffect: true });

    // Add the Stacked Column collection to the chart
    sciChartSurface.renderableSeries.add(stackedColumnCollection);

    // Add some interactivity modifiers
    sciChartSurface.chartModifiers.add(
        new ZoomExtentsModifier(), 
        new ZoomPanModifier(), 
        new MouseWheelZoomModifier(),
    );

    // Add a legend to the chart to show the series
    sciChartSurface.chartModifiers.add(
        new LegendModifier({
            placement: ELegendPlacement.TopLeft,
            orientation: ELegendOrientation.Vertical,
            backgroundColor: 'var(--bg)',
            textColor: 'var(--text)',
            showLegend: true,
            showSeriesMarkers: true,
            showCheckboxes: true,
        })
    );

    sciChartSurface.zoomExtents();

    return { wasmContext, sciChartSurface, stackedColumnCollection };
};

// React component needed as our examples app is in React
export default function StackedColumnChart() {
    const { state, setState } = useContext<ContextInterface>(Context);
    const { DATA, allOptions, selectedOption } = state;

    const sciChartSurfaceRef = useRef<SciChartSurface>();
    const stackedColumnCollectionRef = useRef<StackedColumnCollection>();

    useEffect(() => {
        const chartInitializationPromise = drawExample(DATA, selectedOption).then(res => {
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

    return (
        <section className="graph-container">
                <h4>Annual patents filed for electric vehicle technologies, World</h4>
                <p>Figures in recent years are subject to a time lag; submitted patents may not yet be reflected in the data.</p>
                <div style={{display: "flex", margin: '1rem 0', width: "100%", gap: '1rem'}}>
                    <select style={{marginLeft: 'auto', color: 'var(--text)'}}
                        value={selectedOption}
                        onChange={(e) => {
                            setState({ ...state, selectedOption: e.target.value });
                            drawExample(DATA, e.target.value);
                        }}
                    >
                        {allOptions.map((option: string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div id={DIV_ELEMENT_ID} style={{flex: 1, borderRadius: 4, overflow: 'hidden'}} />
        </section>
    );
}