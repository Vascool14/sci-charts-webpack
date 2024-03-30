import React, { useContext, useEffect, useRef } from "react";
import { ContextInterface, DataInterface } from "../types";
import { Context } from "../Context";
import { COLORS } from "../utils/constants";
import {
    SciChartPieSurface,
    EPieType,
    SciChartJsNavyTheme,
    PieSegment,
    SciChartSurface,
    StackedColumnCollection,
    ELegendPlacement,
    ELegendOrientation,
    GradientParams,
    Point
} from "scichart";

const DIV_ELEMENT_ID = "chart2";

async function drawExample(DATA: DataInterface, option: string) {
    // Create a SciChartSurface
    const sciChartPieSurface = await SciChartPieSurface.create(DIV_ELEMENT_ID, {
        // theme: new SciChartJsNavyTheme(),
        pieType: EPieType.Pie,
        animate: true,
    });
    
    sciChartPieSurface.legend.showLegend = false;

    const yearStats = DATA[option].yValues;
    const yearLabels = DATA[option].xValues;

    for (let i = 0; i < yearStats.length; i++) {
        const pieSegment = new PieSegment({
            color: COLORS[i],
            value: yearStats[1][i],
            text: "Year " + yearLabels[i],
        });
        sciChartPieSurface.pieSegments.add(pieSegment);
    }
};

// React component needed as our examples app is in React
export default function PieChart() {
    const { state } = useContext<ContextInterface>(Context);
    const { DATA, selectedOption, selectedYear } = state;
    
    // drawExample(DATA, selectedOption); // this rerenders the whole chart

    const sciChartSurfaceRef = useRef<SciChartSurface>();
    const stackedColumnCollectionRef = useRef<StackedColumnCollection>();
    useEffect(() => {
        const chartInitializationPromise = drawExample(DATA, selectedOption);

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
    }, [selectedOption, selectedYear]);

    return (
        <section className="graph-container">
            <h4 style={{margin: '0 auto 10px auto'}}>{state.selectedOption}, {state.selectedYear}</h4>
            <div id={DIV_ELEMENT_ID} style={{flex: 1, borderRadius: 4, overflow: 'hidden'}} />
        </section>
    );
}