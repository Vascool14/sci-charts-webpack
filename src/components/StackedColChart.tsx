import React, { useContext, useEffect } from "react";
import { ContextInterface, DataInterface, StateInterface } from "../types";
import { Context } from "../Context";
import { COLORS, SERIES_NAME } from "../utils/constants";
import {
    ELegendOrientation,
    LegendModifier,
    MouseWheelZoomModifier,
    NumericAxis,
    SciChartSurface,
    DpiHelper,
    StackedColumnCollection,
    StackedColumnRenderableSeries,
    WaveAnimation,
    XyDataSeries,
    ZoomExtentsModifier,
    ELegendPlacement,
} from "scichart";
import { HitTestInfo } from 'scichart/Charting/Visuals/RenderableSeries/HitTest/HitTestInfo';

const DIV_ELEMENT_ID = "chart1";

// React component needed as our examples app is in React
export default function StackedColumnChart() {
    const { state, setState } = useContext<ContextInterface>(Context);
    const { DATA, allOptions, selectedOption } = state;

    async function drawExample(option: string = state.selectedOption) {
        const { wasmContext, sciChartSurface } = await SciChartSurface.create(DIV_ELEMENT_ID);
    
        // Create XAxis, YAxis
        const xAxis = new NumericAxis(wasmContext);
        xAxis.labelProvider.precision = 0;
        sciChartSurface.xAxes.add(xAxis);
        const yAxis = new NumericAxis(wasmContext);
        yAxis.labelProvider.precision = 0;
        sciChartSurface.yAxes.add(yAxis);
    
        // Create a StackedColumnCollection instance
        const Chart = new StackedColumnCollection(wasmContext);
    
        // some options for the Chart
        Chart.dataPointWidth = 0.8;
        Chart.animation = new WaveAnimation({ duration: 300, fadeEffect: true });
    
        // Create some RenderableSeries - for each part of the stacked column
        for (let i = 0; i < DATA[option].yValues?.length; i++) {
            const rendSeries = new StackedColumnRenderableSeries(wasmContext, {
                dataSeries: new XyDataSeries(wasmContext, { xValues: DATA[option].xValues, yValues: DATA[option].yValues[i], dataSeriesName: SERIES_NAME[i] }),
                fill: COLORS[i],
                strokeThickness: 0,
                opacity: 1,
                stackedGroupId: "StackedGroupId",
            });
            Chart.add(rendSeries);
        }
    
        // add Chart to the SciChartSurface
        sciChartSurface.renderableSeries.add(Chart);
        
        sciChartSurface.domCanvas2D.addEventListener('mousedown', (mouseEvent: MouseEvent) => {
            const hitTestResults: HitTestInfo[] = Chart
                .asArray()
                .reduce((acc: HitTestInfo[], stackedColumnRenderableSeries: StackedColumnRenderableSeries) => {
                    const hitTestInfo = stackedColumnRenderableSeries.hitTestProvider.hitTest(
                        mouseEvent.offsetX * DpiHelper.PIXEL_RATIO,
                        mouseEvent.offsetY * DpiHelper.PIXEL_RATIO
                    );
                    acc.push(hitTestInfo);
                    return acc;
                }, []);
                
            // update the year in the state
            const newYear = DATA[option].xValues[hitTestResults[0].dataSeriesIndex];
            setState({ ...state, selectedYear: newYear, selectedOption: option});
        });
    
        // Add some interactivity modifiers
        sciChartSurface.chartModifiers.add(
            new ZoomExtentsModifier(), 
            // new ZoomPanModifier(), // This is disabling the onClick functionality somehow
            new MouseWheelZoomModifier(),
        );
    
        // // Add a legend to the chart to show the series
        sciChartSurface.chartModifiers.add(
            new LegendModifier({
                placement: ELegendPlacement.TopLeft,
                orientation: ELegendOrientation.Vertical,
                backgroundColor: 'var(--bg)',
                textColor: 'var(--text)',
                showLegend: true,
                showSeriesMarkers: true,
                showCheckboxes: true
            })
        );
    };

    useEffect(() => {
        drawExample();
    }, []);
    
    return (
        <section className="graph-container">
                <h4>Annual patents filed for electric vehicle technologies, World</h4>
                <p>Figures in recent years are subject to a time lag; submitted patents may not yet be reflected in the data.</p>
                <div style={{display: "flex", margin: '1rem 0', width: "100%", gap: '1rem'}}>
                    <select style={{marginLeft: 'auto', color: 'var(--text)', background: 'var(--bg)'}}
                        value={selectedOption}
                        onChange={(e) => {
                            setState({ ...state, selectedOption: e.target.value });
                            drawExample(e.target.value);
                        }}
                    >
                        {allOptions.map((option: string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div id={DIV_ELEMENT_ID} className="graph" />
        </section>
    );
}