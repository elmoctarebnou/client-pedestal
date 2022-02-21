import React, { useEffect, useState, useRef } from 'react';

import * as d3 from 'd3';

import {
    Paper,
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';


import { colorsList } from '../../utils/constants/constants';
import * as SERVICE from './PerformanceChart.service';


import styles from './PerformanceChart.styles';

const PerformanceChart = (props) => {

    const { dimensions, data, yMetric, yValues, lineNames, tooltipNames, callBack } = props;

    const [initialLinesData, setInitialLinesData] = useState(null);
    const [linesData, setLinesData] = useState(null);
    const [viewOption, setViewOption] = useState(0);
    const [viewOptionsList, setViewOptionsList] = useState(['1Y', '2Y', '5Y', 'ALL']);

    const classes = makeStyles(styles())();
    const chartSvg = useRef(null);

    const colorsList = [
        "#69d2e7",
        "#f38630",
        "#83af9b",
        "#ecd078",
        "#a7dbd8",
        "#d95b43",
        "#c8c8a9",
    ]

    let defaultDimensions = {
        width: window.innerWidth * 0.6,
        height: 400,
        margin: {
            top: 0,
            right: 0,
            bottom: 60,
            left: 0,
        }
    };

    let dims;
    if (!dimensions) dims = defaultDimensions;
    else dims = dimensions;

    dims.boundedWidth = dims.width - dims.margin.left - dims.margin.right;
    dims.boundedHeight = dims.height - dims.margin.top - dims.margin.bottom;

    useEffect(() => {
        if (data) {
            setInitialLinesData(JSON.parse(JSON.stringify(data)));
            setLinesData(JSON.parse(JSON.stringify(data)));
        }
    }, []);

    useEffect(() => {
        if (linesData && dims) {
            renderChart();
            if (callBack) callBack(linesData[linesData.length - 1]);
        }
    }, [linesData, dimensions, viewOption]);

    const handleClick = (e) => {
        const { name } = e.currentTarget;
        if (name === 'reset-data') {
            setLinesData(JSON.parse(JSON.stringify(initialLinesData)));
        }
        else if (name === 'brush-zoom') {
        }
    };

    const renderChart = () => {
        d3.select(chartSvg.current).selectAll('*').remove();
        // Y scale
        let yDomain = SERVICE.getSmallestLargestYValues(linesData, yValues, yMetric);
        const [marginBottom, marginTop] = SERVICE.getYMargin(yDomain, yMetric);
        yDomain[1] = yDomain[1] + yDomain[1] * marginTop;
        yDomain[0] = yDomain[0] - yDomain[0] * marginBottom;
        const yScale = d3.scaleLinear().domain(yDomain).range([dims.boundedHeight, 0]);
        // X scale
        const xDomain = SERVICE.getSmallestLargestXValues(linesData);
        const xScale = d3.scaleTime().domain(xDomain).range([0, dims.boundedWidth]);
        // Create canvas
        const wrapper = d3
            .select(chartSvg.current)
            .attr('width', dims.width)
            .attr('height', dims.height)
            .attr('overflow', 'visible');
        const bounds = wrapper
            .append('g')
            .attr('class', 'bounds')
            .style('transform', `translate(${dims.margin.left}px, ${dims.margin.top}px)`);
        bounds
            .append('g')
            .attr('class', 'x-axis')
            .style('transform', `translateY(${dims.boundedHeight}px)`);
        bounds.append('g').attr('class', 'y-axis');
        // Gradiant area
        const areaConstructor = (data, yValue, initial) => {
            const area = d3.area()
                .x((d) => xScale(SERVICE.xAccessor(d)))
                .y0(dims.boundedHeight)
                .y1((d) => initial
                    ? dims.boundedHeight
                    : yScale(SERVICE.getYAccessor(yMetric)(d, yValue))
                )
            return area(data)
        }
        // Create gradient
        const getGradient = (id) => {
            const gradientId = `areaGradient${colorsList[id]}`
            const defs = bounds.append('defs');
            const gradient = defs.append('linearGradient')
                .attr('id', gradientId)
                .attr('x1', '0%')
                .attr('y1', '100%')
                .attr('x2', '0%')
                .attr('y2', '0%')
            gradient.append('stop')
                .attr('offset', '0%')
                .attr('style', `stop-color:${colorsList[id]};stop-opacity:0`);
            gradient.append('stop')
                .attr('offset', '100%')
                .attr('style', `stop-color:${colorsList[id]};stop-opacity:.2`);
            return gradientId
        }
        // Line generator
        const lineConstructor = (data, yValue) => {
            const line = d3
                .line()
                .x((d) => xScale(SERVICE.xAccessor(d)))
                .y((d) => yScale(SERVICE.getYAccessor(yMetric)(d, yValue)))
            return line(data);
        };
        // Draw lines and areas
        yValues.forEach((val, i) => {
            bounds
                .append('path')
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr('stroke', (d) => colorsList[i])
                .attr('stroke-width', 1)
                .attr('d', lineConstructor(linesData, yValues[i]))
            bounds
                .append('path')
                .attr("class", "area")
                .attr('d', areaConstructor(linesData, yValues[i], true))
                .attr('fill', `url(#${getGradient(i)})`)
                .transition()
                .delay(500)
                .duration(1000)
                .ease(d3.easeQuad)
                .attr('d', areaConstructor(linesData, yValues[i], false))
        });
        const lines = d3.selectAll('.line')
        lines.each((d, i, nodes) => {
            const element = nodes[i];
            const length = element.getTotalLength();
            d3.select(element)
                .attr('stroke-dasharray', `${length},${length}`)
                .attr('stroke-dashoffset', length)
                .transition()
                .duration(500)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 0)
        });
        // Y axis
        const yAxisGenerator = d3
            .axisRight()
            .scale(yScale)
            .tickFormat(yMetric === 'dollar' ? SERVICE.dollarFormat : null)
            .tickSizeOuter(0);
        const yAxis = bounds
            .append('g')
            .call(yAxisGenerator)
            .style('transform', `translateX(${dims.boundedWidth}px)`);
        // X axis
        const xAxisGenerator = d3.axisBottom()
            .scale(xScale)
            .tickSizeOuter(0)
            .ticks(dims.width < 500 ? 5 : 15)
        const xAxis = bounds
            .append('g')
            .call(xAxisGenerator)
            .style('transform', `translateY(${dims.boundedHeight}px)`)
        // Tooltip small circles
        yValues.forEach((yValue, i) =>
            bounds
                .append('circle')
                .attr('class', 'circle-tooltip')
                .attr('r', 5)
                .attr('stroke', (d) => colorsList[i])
                .attr('fill', 'white')
                .attr('stroke-width', 1)
                .style('opacity', 0)
        );
        const tooltipCircles = d3.selectAll('.circle-tooltip');
        const tooltip = bounds.append('g').style('pointer-events', 'none')
        const displayTooltipInfo = (dataPoint, index, mousePosition) => {
            // Handle tootip position
            let largestYValue = null;
            for (let i = 0; i < yValues.length; i++) {
                if (largestYValue === null) largestYValue = yValues[i];
                else {
                    if (dataPoint[largestYValue] <= dataPoint[yValues[i]]) largestYValue = yValues[i];
                }
            }
            const tooltipXValue = SERVICE.xAccessor(dataPoint);
            const tooltipYValue = SERVICE.getYAccessor(yMetric)(dataPoint, largestYValue);
            let midPoint = (dims.width - dims.margin.right) / 2 ;
            tooltip.style('display', null)
            tooltip.attr(
                'transform',
                `translate(
                    ${xScale(tooltipXValue)},
                    ${yScale(tooltipYValue)}
                )`
            )
            const tooltipPath = tooltip.selectAll('path')
                .data([,])
                .join("path")
                .attr("fill", "white")
                .attr("stroke", "gray")
                .attr('border-radius', '5px')

            const tooltipText = tooltip.selectAll('text')
                .data([,])
                .join('text')
                .call(text => {
                    return text
                        .selectAll('tspan')
                        .data(yValues)
                        .join('tspan')
                        .attr('x', 0)
                        .attr('y', (_, i) => `${i * 1.2}em`)
                        .text((d, i) => SERVICE.USDFormat.format(dataPoint[d]))
                        .style('fill', (d, i) => colorsList[i])
                })
                .transition()
                .duration(100)
                .ease(d3.easeSinIn)
            const O = d3.map(data, d => d);
            const { x, y, width: w, height: h} = tooltipText.node().getBBox();
            tooltipText.attr("transform", `translate(${-w / 2},${-75 - y})`);
            tooltipPath.attr(
                "d",
                `
                M${-w / 2 - 10},25H-5l5,
                -5l5,5H
                ${w / 2 + 10}v
                ${h + 20}
                h-${w + 20}z
                `
            )
            .attr('transform', 'rotate(180)')
            bounds.property("value", O[index]).dispatch("input", {bubbles: true});
            // handle tootipCircle position
            tooltipCircles.each(function (d, i) {
                const closestXValue = SERVICE.xAccessor(dataPoint);
                const closestYValue = SERVICE.getYAccessor(yMetric)(
                    dataPoint,
                    yValues[i]
                );
                d3.select(this)
                    .attr('cx', xScale(closestXValue))
                    .attr('cy', yScale(closestYValue))
                    .transition()
                    .delay(500)
                    .style('opacity', 1);
            });
        };
        const hoveredDate = new Date(linesData[(linesData.length - 1) / 2]['date']);
        const closestIndex = SERVICE.getClosestIndex(linesData, hoveredDate);
        const closestDataPoint = SERVICE.getClosestDataPoints(linesData, closestIndex);
        displayTooltipInfo(closestDataPoint, closestIndex);
        // Handle mousemove on canvas
        const onMouseMove = (event) => {
            const mousePosition = d3.pointer(event);
            const hoveredDate = xScale.invert(mousePosition[0]);
            const closestIndex = SERVICE.getClosestIndex(linesData, hoveredDate);
            const closestDataPoint = SERVICE.getClosestDataPoints(linesData, closestIndex);
            displayTooltipInfo(closestDataPoint, closestIndex, mousePosition);
        }
        // Handle mobil touch on canvas
        const onTouchMove = evt => {
            const touchPosition = [...evt.touches].map(e => d3.pointer(e, evt.currentTarget))[0]
            const touchedDate = xScale.invert(touchPosition[0]);
            const closestIndex = SERVICE.getClosestIndex(linesData, touchedDate);
            const closestDataPoint = SERVICE.getClosestDataPoints(linesData, closestIndex);
            displayTooltipInfo(closestDataPoint, closestIndex, touchPosition);
        }
        // Handle click on canvas
        const onClick = (event) => {
            const mousePosition = d3.pointer(event);
            const hoveredDate = xScale.invert(mousePosition[0]);
            const closestIndex = SERVICE.getClosestIndex(linesData, hoveredDate);
            const closestDataPoint = SERVICE.getClosestDataPoints(
                linesData,
                closestIndex
            );
            if (callBack) {
                callBack(closestDataPoint);
            }
        }
        // Add event listener
        const listeningRect = wrapper
            .append('rect')
            .attr('class', 'listening-rect')
            .attr('opacity', 0)
            .attr('width', dims.width)
            .attr('height', dims.height)
            .on('mousemove', onMouseMove)
            .on('touchmove', onTouchMove)
            .on('click', onClick);
    };

    return (
        <div className={classes.main} id="main">
            <div className={classes.chartHeader}>
                <div className={classes.chartHeaderLeft}>
                    <span style={{fontSize: '1em'}}>
                        Total return
                    </span>
                    <span style={{fontSize: '1.5em', color: 'green'}}>
                        {SERVICE.USDFormat.format(118355620)}
                    </span>
                </div>
                <div className={classes.chartHeaderRight}>
                    <div className={classes.row} style={{margin: '0 0 .5em 0'}}>
                        {viewOptionsList.map((option, i) => {
                            return (
                                <span
                                    key={i}
                                    className={viewOption === i
                                        ? classes.viewOptionActive : classes.viewOption}
                                    onClick={() => setViewOption(i)}
                                >
                                    {option}
                                </span>
                            )
                        })}
                    </div>
                    <div
                        className={classes.row}
                        style={{ flexWrap: 'wrap', alignItems: 'flex-end' }}
                    >
                        {tooltipNames.map((name, i) => {
                            return (
                                <div
                                    key={i}
                                    className={classes.row}
                                    style={{ alignItems: 'center', margin: '0 0 0 1em' }}
                                >
                                    <div
                                        className={classes.square}
                                        style={{ backgroundColor: colorsList[i] }}
                                    ></div>
                                    <span style={{ margin: '0 0 0 .3em', fontSize: '.8em' }}>
                                        {name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <svg
                id="line-chart-container"
                name="line-chart-container"
                className={classes.chart}
                onClick={handleClick}
                ref={chartSvg}
            ></svg>
        </div>
    );
};

export default PerformanceChart;

