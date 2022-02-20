import React, { useEffect, useState, useRef } from 'react';

import * as d3 from 'd3';

import { makeStyles } from '@mui/styles';
import { Paper, Button } from '@mui/material';


import { colorsList } from '../../utils/constants/constants';
import * as SERVICE from './PerformanceChart.service';


import styles from './PerformanceChart.styles';

const PerformanceChart = (props) => {

    const { dimensions, data, yMetric, yValues, lineNames, tooltipNames, callBack } = props;

    const [initialLinesData, setInitialLinesData] = useState(null);
    const [linesData, setLinesData] = useState(null);
    const [isBrushing, setIsBrushing] = useState(false);

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
            right: 70,
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
    }, [linesData, isBrushing, dimensions]);

    const handleClick = (e) => {
        const { name } = e.currentTarget;
        if (name === 'reset-data') {
            setLinesData(JSON.parse(JSON.stringify(initialLinesData)));
            setIsBrushing(false);
        } else if (name === 'brush-zoom') {
            setIsBrushing(true);
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
        const yAxisLabel = yAxis
            .append('text')
            .attr('x', dims.boundedHeight / 2)
            .attr('y', -dims.margin.left - 50)
            .attr('fill', 'black')
            .style('font-size', '1.4em')
            .text(yMetric === 'dollar' ? 'Value' : 'Performance %')
            .style('transform', 'rotate(90deg)')
            .style('text-anchor', 'middle');
        // X axis
        const xAxisGenerator = d3.axisBottom()
            .scale(xScale)
            .tickSizeOuter(0)
            .ticks(dims.width < 500 ? 5 : 10)
        const xAxis = bounds
            .append('g')
            .call(xAxisGenerator)
            .style('transform', `translateY(${dims.boundedHeight}px)`)
        const xAxisLabel = xAxis
            .append('text')
            .attr('x', dims.boundedWidth / 2)
            .attr('y', dims.margin.bottom - 10)
            .attr('fill', 'black')
            .style('font-size', '1.4em')
            .html('Timeline (Day)');
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
        const tooltip = d3.select('#tooltip');
        tooltip.select('#date').text(SERVICE.humanDateParser(linesData[0]['date']));
        tooltip
            .select('#performance')
            .html(SERVICE.formatPerformance(
                linesData[0], yValues, yMetric, tooltipNames, colorsList));
        // Display tooltip detail rectangle
        const displayTooltipInfo = (dataPoint, index, mousePosition) => {
            tooltip.select('#date').text(SERVICE.humanDateParser(dataPoint['date']));
            tooltip
                .select('#performance')
                .html(SERVICE.formatPerformance(
                    dataPoint, yValues, yMetric, tooltipNames, colorsList));
            let largestYValue = null;
            for (let i = 0; i < yValues.length; i++) {
                if (largestYValue === null) largestYValue = yValues[i];
                else {
                    if (dataPoint[largestYValue] <= dataPoint[yValues[i]])
                        largestYValue = yValues[i];
                }
            }
            const tooltipXValue = SERVICE.xAccessor(dataPoint);
            const tooltipYValue = SERVICE.getYAccessor(yMetric)(dataPoint, largestYValue);
            let midPoint = (dims.width - dims.margin.right) / 2 ;
            let y = yScale(tooltipYValue) + 20;
            let x = xScale(tooltipXValue);
            if (x >= midPoint) x -= 220
            else x += 20

            tooltip.style('transform', `translate(${x}px, ${y}px)`);

            tooltipCircles.each(function (d, i) {
                const closestXValue = SERVICE.xAccessor(dataPoint);
                const closestYValue = SERVICE.getYAccessor(yMetric)(
                    dataPoint,
                    yValues[i]
                );
                d3.select(this)
                    .attr('cx', xScale(closestXValue))
                    .attr('cy', yScale(closestYValue))
                    .style('opacity', 1);
            });
        };
        const hoveredDate = new Date(linesData[linesData.length - 1]['date']);
        const closestIndex = SERVICE.getClosestIndex(linesData, hoveredDate);
        const closestDataPoint = SERVICE.getClosestDataPoints(linesData, closestIndex);
        displayTooltipInfo(closestDataPoint, closestIndex);
        // Handle mousemove on canvas
        const onMouseMove = (event) => {
            const mousePosition = d3.pointer(event);
            const hoveredDate = xScale.invert(mousePosition[0]);
            const closestIndex = SERVICE.getClosestIndex(linesData, hoveredDate);
            const closestDataPoint = SERVICE.getClosestDataPoints(
                linesData,
                closestIndex
            );
            displayTooltipInfo(closestDataPoint, closestIndex, mousePosition);
        };
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
        };
        // Add event listener
        if (!isBrushing) {
            const listeningRect = wrapper
                .append('rect')
                .attr('class', 'listening-rect')
                .attr('opacity', 0)
                .attr('width', dims.width)
                .attr('height', dims.height)
                .on('mousemove', onMouseMove)
                .on('click', onClick);
        }
        // Handle brushing
        if (isBrushing) {
            const brush = d3
                .brushX()
                .extent([
                    [0, 0],
                    [dims.boundedWidth, dims.boundedHeight],
                ])
                .on('end', handleBrush);
            bounds.append('g').attr('class', 'brush').call(brush);
            function handleBrush(event) {
                const brushArea = event.selection;
                if (!brushArea) return null;
                else {
                    const startDate = xScale.invert(brushArea[0]);
                    const endDate = xScale.invert(brushArea[1]);
                    const brushedAreaData = SERVICE.getBrushAreaData(
                        linesData,
                        startDate,
                        endDate
                    );
                    if (brushedAreaData.length > 0) {
                        setLinesData(brushedAreaData);
                        xScale.domain([startDate, endDate]);
                        bounds.select('.brush').call(brush.move, null);
                        xAxis.transition().duration(1000).call(xAxisGenerator);
                        bounds.select('.line').each(function (d, i) {
                            d3.select(this)
                                .transition()
                                .duration(1000)
                                .attr('d', lineConstructor(brushedAreaData, yValues[i]))
                                .attr('fill', 'none')
                                .attr('stroke', (d) => colorsList[i]);
                        });
                    }
                    setIsBrushing(false);
                }
            }
        }
    };

    return (
        <div>
            <Paper
                id="tooltip"
                variant="outlined"
                className={classes.tooltip}
            >
                <span id="date" className={classes.date}>
                </span>
                <span id="performance" className={classes.performance}>
                </span>
            </Paper>
            <div className={classes.main} id="main">
                <div className={classes.btnContainer}>
                    <Button
                        variant="outlined"
                        name="brush-zoom"
                        color="primary"
                        onClick={handleClick}
                        disabled={isBrushing ? true : false}
                        size="small"
                        className={classes.actionBtn}
                    >
                        Zoom
                    </Button>
                    <Button
                        variant="outlined"
                        name="reset-data"
                        color="primary"
                        onClick={handleClick}
                        style={{ marginLeft: '.5em' }}
                        size="small"
                        className={classes.actionBtn}
                    >
                        Reset
                    </Button>
                </div>
                <svg
                    id="line-chart-container"
                    name="line-chart-container"
                    className={classes.chart}
                    onClick={handleClick}
                    ref={chartSvg}
                ></svg>
            </div>
        </div>
    );
};

export default PerformanceChart;

