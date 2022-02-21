import React, { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@mui/styles';
import { Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';

import * as d3 from 'd3';

import { colorsList } from '../../utils/constants/constants';
import { USDFormat } from '../../utils/helpers/formatters';


import styles from './PieChart.styles';

const PieChart = ({ dataList, valueMetric, labelPosition = 'right' }) => {
    const [clickedRowId, setClickedRowId] = useState(null);
    const [resetValue, setResetValue] = useState(1000000);

    const classes = makeStyles(styles())();

    const pieChartStatic = useRef(null);
    const nameAccessor = (data) => data.name;
    const valueAccessor = (data) =>
        valueMetric === 'dollar' ? USDFormat.format(data.value) : `${data.value * 100}%`;

    let dims = {
        width: 300,
        height: 300,
        margin: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
        },
    };

    useEffect(() => {
        if (dataList) drawPieChart('initial');
    }, [dataList]);

    useEffect(() => {
        if (dataList && clickedRowId !== null) drawPieChart('interact');
    }, [clickedRowId]);

    const drawPieChart = (drawType) => {
        if (dataList) {
            // Clear svg before drawing
            d3.selectAll('#pie-chart-svg > *').remove();

            const data = dataList.sort((a, b) => b.value - a.value);
            // Wrapper
            const wrapper = d3
                .select(pieChartStatic.current)
                .attr('width', dims.width)
                .attr('height', dims.height)
                .attr('overflow', 'visible');

            // Pie generator scale
            const radius = 130;
            const arcGenerator = d3
                .pie()
                .padAngle(0.03)
                .value((d) => d.value);
            const arcs = arcGenerator(data);
            const arc = d3
                .arc()
                .innerRadius((d) => radius * 0.5)
                .outerRadius((d) => {
                    if (clickedRowId === resetValue) return radius * 0.9;
                    if (d['index'] === clickedRowId) return radius * 1.05;
                    else return radius * 0.9;
                })
                .cornerRadius(3)
            const pie = wrapper.append('g').attr('transform', `translate(${150},${150})`);
            pie.selectAll('path')
                .data(arcs)
                .enter()
                .append('path')
                .attr('fill', (d, i) => {
                    return colorsList[i];
                })
                .attr('fill-opacity', (d, i) => {
                    if (clickedRowId === resetValue || drawType === 'initial') return 1;
                    if (clickedRowId === i) return 1;
                    else return 0.5;
                })
                .transition()
                .delay(function (d, i) {
                    if (drawType === 'initial') {
                        return i * 30;
                    } else return 0;
                })
                .duration(1000)
                .attrTween('d', function (d) {
                    if (drawType === 'initial') {
                        let i = d3.interpolate(d.startAngle, d.endAngle);
                        return function (t) {
                            d.endAngle = i(t);
                            return arc(d)
                        };
                    } else return () => arc(d);
                })
        }
    };

    const renderLabelTable = () => {
        return (
            <Table>
                <TableBody>
                    {dataList &&
                        dataList.map((d, i) => {
                            return (
                                <TableRow
                                    key={i}
                                    className={classes.labelRow}
                                    onMouseEnter={() => setClickedRowId(i)}
                                    onMouseLeave={() => setClickedRowId(resetValue)}
                                >
                                    <TableCell className={classes.cellL}>
                                        <div
                                            className={classes.square}
                                            style={{ backgroundColor: colorsList[i] }}
                                        ></div>
                                    </TableCell>
                                    <TableCell className={classes.cellC}>
                                        {nameAccessor(d)}
                                    </TableCell>
                                    <TableCell className={classes.cellR}>
                                        {valueAccessor(d)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        );
    };

    const renderMain = () => {
        if (labelPosition === 'left') {
            return (
                <div className={classes.mainRow}>
                    <Paper variant="outlined" style={{ margin: '1em 1em 0 0' }}>
                        {renderLabelTable()}
                    </Paper>
                    <svg id="pie-chart-svg" ref={pieChartStatic} />
                </div>
            );
        }
        if (labelPosition === 'right') {
            return (
                <div className={classes.mainRow}>
                    <svg id="pie-chart-svg" ref={pieChartStatic} />
                    <Paper variant="outlined" style={{ margin: '1em 0 0 1em' }}>
                        {renderLabelTable()}
                    </Paper>
                </div>
            );
        }
        if (labelPosition === 'bottom') {
            return (
                <div className={classes.mainColumn}>
                    <svg id="pie-chart-svg" ref={pieChartStatic} />
                    <Paper variant="outlined">{renderLabelTable()}</Paper>
                </div>
            );
        }
    };
    return renderMain();
};

export default PieChart;