import * as d3 from 'd3';

const humanDateParser = (dateStr) => {
    let dateInstance = new Date(dateStr);
    const userTimeZoneOffSet = dateInstance.getTimezoneOffset() * 60000;
    let dateWithTimeZone = new Date(dateInstance.getTime() + userTimeZoneOffSet);
    const year = dateWithTimeZone.getFullYear();
    const month = dateWithTimeZone.toLocaleString('default', { month: 'long' });
    const day =
        dateWithTimeZone.getDate() < 10
            ? `0${dateWithTimeZone.getDate()}`
            : dateWithTimeZone.getDate();
    const parsedDate = `${month} ${day}, ${year}`;
    return parsedDate;
};

const USDFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const dollarFormat = (d) => '$' + d3.format('~s')(d);
const xAccessor = (data) => (data ? Date.parse(data.date) : null);

const getYAccessor = (yMetric) => {
    const yAccessor =
        yMetric === 'dollar'
            ? (data, yValue) => (data ? data[yValue] : null)
            : (data, yValue) => (data ? data[yValue] * 100 : null);
    return yAccessor;
};

const getDistanceFromHoveredDate = (d, hoveredDate) => {
    return Math.abs(xAccessor(d) - hoveredDate);
};

const getClosestIndex = (data, hoveredDate) => {
    return d3.scan(
        data,
        (a, b) =>
            getDistanceFromHoveredDate(a, hoveredDate) -
            getDistanceFromHoveredDate(b, hoveredDate)
    );
};

const getClosestDataPoints = (data, closestIndex) => data[closestIndex];

const getSmallestLargestYValues = (dataList, keysList, yMetric) => {
    let largestYValue = null;
    let smallestYValue = null;
    dataList.forEach((dataPoint) => {
        for (let i = 0; i < keysList.length; i++) {
            if (largestYValue === null || smallestYValue === null) {
                if (!largestYValue) largestYValue = dataPoint[keysList[i]];
                if (!smallestYValue) smallestYValue = dataPoint[keysList[i]];
            } else {
                if (dataPoint[keysList[i]] > largestYValue)
                    largestYValue = dataPoint[keysList[i]];
                if (dataPoint[keysList[i]] < smallestYValue)
                    smallestYValue = dataPoint[keysList[i]];
            }
        }
    });
    return yMetric === 'dollar'
        ? [smallestYValue, largestYValue]
        : [smallestYValue * 100, largestYValue * 100];
};

const getSmallestLargestXValues = (dataList) => {
    let smallestXValue = new Date(dataList[0].date);
    let largestXValue = new Date(dataList[dataList.length - 1].date);
    return [smallestXValue, largestXValue];
};

const getYMargin = (yDomain, yMetric) => {
    let marginTop = 0.2;
    let marginBottom = 0.2;
    if (yMetric === 'dollar' && yDomain) {
        let diff = (yDomain[1] - yDomain[0]).toString().split('.')[0];
        let large = yDomain[1].toString().split('.')[0];
        let small = yDomain[0].toString().split('.')[0];
        if (large.length >= 7) {
            marginTop = 0.03;
            marginBottom = 0.03;
            if (large.length === small.length) {
                marginTop = 0.008;
                marginBottom = 0.008;
            }
            if (diff.length === large.length) marginBottom = 0.5;
        } else {
            marginTop = 0.1;
            marginBottom = 0.1;
            if (large.length === small.length) {
                marginTop = 0.05;
                marginBottom = 0.05;
            }
            if (diff.length === large.length) marginBottom = 0.2;
        }
    }
    return [marginBottom, marginTop];
};

const getBrushAreaData = (dataList, startX, endX) => {
    let brushedData = [];
    dataList.forEach((dataPoint) => {
        if (
            new Date(dataPoint['date']) >= startX &&
            new Date(dataPoint['date']) <= endX
        ) {
            brushedData.push(dataPoint);
        }
    });
    return brushedData;
};

const formatPerformance = (data, yValues, yMetric, tooltipNames, colorsList) => {
    if (data) {
        let performance = '';
        if (yMetric === 'dollar') {
            yValues.forEach((d, i) => {
                performance += `<span style="color:${colorsList[i]}">
                    ${tooltipNames[i]}
                    </span>: ${USDFormat.format(
                    data[yValues[i]]
                )}`;
                performance += `<br/>`;
            });
        } else {
            yValues.forEach((d, i) => {
                performance += `<span style="color:${colorsList[i]}">
                    ${tooltipNames[i]}</span>: ${(data[yValues[i]] * 100).toFixed(2)} %`;
                performance += `<br/>`;
            });
        }
        return performance;
    }
};

export {
    formatPerformance,
    USDFormat,
    humanDateParser,
    dollarFormat,
    xAccessor,
    getYAccessor,
    getClosestIndex,
    getClosestDataPoints,
    getSmallestLargestYValues,
    getSmallestLargestXValues,
    getYMargin,
    getBrushAreaData,
};
