const formatPieChartData = (accounts) => {
    let pieChartData = [];
    if (accounts) {
        for (let i = 0; i < accounts.length; i++) {
            pieChartData.push({
                name: accounts[i]['account_number'],
                value: accounts[i]['value'],
            });
        }
    }
    return pieChartData;
};

export { formatPieChartData };