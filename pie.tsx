import React, { useContext, useEffect } from 'react';
import { Context } from '../Context';
import { ContextInterface } from '../types';
import { SciChartReact } from "scichart-react";
import { appTheme } from "scichart-example-dependencies";
import {
    EPieType,
    ELegendOrientation,
    ELegendPlacement,
    GradientParams,
    Point,
    PieSegment,
    SciChartPieSurface,
} from "scichart";

const DIV_ELEMENT_ID = "chart2";

export default function InDepthChart() {
    const { state } = useContext<ContextInterface>(Context);
    async function drawExample(rootElement: string | HTMLDivElement){
        // Create the pie chart
        const sciChartPieSurface = await SciChartPieSurface.create(rootElement, {
            theme: appTheme.SciChartJsTheme,
            pieType: EPieType.Pie,
            animate: true,
            seriesSpacing: 15,
            showLegend: true,
            showLegendSeriesMarkers: true,
            animateLegend: true,
        });
        // Optional placement of legend
        sciChartPieSurface.legend.orientation = ELegendOrientation.Horizontal;
        sciChartPieSurface.legend.placement = ELegendPlacement.BottomLeft;
    
        // SciChart.js expects a list of PieSegment, however data is often formatted like this
        // Dataset = 'percentage market share of phones, 2022'
        const dataset = state.DATA[state.selectedOption].yValues.map((value, index) => ({
            name: state.DATA[state.selectedOption].xValues[index],
            percent: value,
        }));
    
        // Colors are just hex strings, supporting #FFFFFF (RBG) or 8-digit with RGBA or CSS color strings e.g. rgba()
        const colors = [
            { color1: appTheme.VividOrange, color2: appTheme.MutedOrange },
            { color1: appTheme.Indigo, color2: appTheme.VividBlue },
            { color1: appTheme.MutedSkyBlue, color2: appTheme.MutedTeal },
            { color1: appTheme.MutedTeal, color2: appTheme.PaleTeal },
            { color1: appTheme.VividSkyBlue, color2: appTheme.MutedSkyBlue }
        ];
    
        // Optional Relative radius adjustment per segment
        const radiusSize = [0.8, 0.8, 0.8, 0.8, 0.85];
    
        const toPieSegment = (name: string, value: number, radiusAdjustment: number, color1: string, color2?: string) => {
            return new PieSegment({
                value,
                text: name,
                labelStyle: { color: appTheme.ForegroundColor },
                radiusAdjustment,
                showLabel: value > 2,
                colorLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
                    { color: color1, offset: 0 },
                    { color: color2 ?? color1 + "77", offset: 1 },
                ]),
            });
        };
    
        // Transform the data to pie segment and add to scichart
        const pieSegments = dataset.map((stat, index) =>
            toPieSegment(stat.name.toString(), stat.percent[index], radiusSize[index], colors[index].color1, colors[index].color2)
        );
    
        sciChartPieSurface.pieSegments.add(...pieSegments);
    
        return { sciChartSurface: sciChartPieSurface };
    };
    useEffect(() => {
        if (state.DATA) {
            drawExample(DIV_ELEMENT_ID);
        }
    }, [state.DATA, state.selectedOption]);
    return (
        <div className='graph-container' style={{height: '100%'}}>
            {/* <h1>{state.selectedOption}, {state.selectedYear}</h1> */}
            {/* <div id="graph2"></div> */}
            {/* <SciChartReact style={{ width: "100%", height: "100%"}} initChart={drawExample} /> */}
        </div>
    );
}