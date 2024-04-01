import React, { useContext, useEffect, useRef } from "react";
import { ContextInterface, DataInterface } from "../types";
import { Context } from "../Context";
import { COLORS, SERIES_NAME } from "../utils/constants";
import {
    SciChartPieSurface,
    EPieType,
    PieSegment,
    SciChartSurface,
    ELegendOrientation,
    ELegendPlacement,
} from "scichart";

const DIV_ELEMENT_ID = "chart2";

async function drawExample(DATA: DataInterface, option: string, year: number) {
    // Create a SciChartSurface
    const sciChartPieSurface = await SciChartPieSurface.create(DIV_ELEMENT_ID, {
        // theme: new SciChartJsNavyTheme(),
        pieType: EPieType.Pie,
        showLegend: true,
        showLegendSeriesMarkers: true,
        animateLegend: true,
        seriesSpacing: 1,
    });

    // ensure the chart shows something, even if the year from another chart may be absent
    const validYears = DATA[option].xValues;
    if (!validYears.includes(year)) {
        year = validYears[validYears.length - 1];
        console.log("Year not found, using last year: ", year);
        
    }
    // here "validYears" is the same as "xValues"

    // get the yValues for the selected year
    var yValues:number[] = [];
    const yValuesAllTime:any = DATA[option].yValues;
    for (let i = 0; i < yValuesAllTime.length; i++) {
        yValues.push(yValuesAllTime[i][DATA[option].xValues.indexOf(year)]);
    }

    // Create PieSegments
    for(let i = 0; i < yValues.length; i++) {
        const pieSegment = new PieSegment({
            color: COLORS[i],
            value: yValues[i],
            text: `${SERIES_NAME[i]}`
        });
        sciChartPieSurface.pieSegments.add(pieSegment);
    }
};

// React component needed as our examples app is in React
export default function PieChart() {
    const { state, setState } = useContext<ContextInterface>(Context);
    const { DATA, selectedOption, selectedYear } = state;
    
    const sciChartSurfaceRef = useRef<SciChartSurface>();
    useEffect(() => {
        const chartInitializationPromise = drawExample(DATA, selectedOption, selectedYear);

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
    }, [selectedYear, selectedOption]);

    function handleYearChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newYear = parseInt(e.target.value);
        setState({ ...state, selectedYear: newYear });
        drawExample(DATA, selectedOption, newYear);
    }

    return (
        <section className="graph-container">
            {/* select year */}
            <div style={{display: 'flex', gap:'1rem', marginBottom: '1rem', justifyContent: 'center'}}>
                <h4>{state.selectedOption}</h4> 
                <select style={{color: 'var(--text)', background: 'var(--bg)', marginTop: '6px'}}
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e)}
                >
                    {DATA[selectedOption].xValues.sort().map((year: number) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div id={DIV_ELEMENT_ID} className="graph" />
        </section>
    );
}