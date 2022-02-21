import React, { useState, useEffect } from 'react';

import { makeStyles } from '@mui/styles';

import PerformanceChart from '../../components/PerformanceChart/PerformanceChart';
import PieChart from '../../components/PieChart/PieChart';

import * as SERVICE from './ClientHomeService';

import styles from './ClientHome.styles.js';

const ClientHome = (props) => {

    const [pieChartData, setPieChartData] = useState([
        {
            name: '12362217',
            value: 4235481.827,
        },
        {
            name: '636-201988',
            value: 788055.914,
        },
        {
            name: '1007',
            value: 694395.5252986,
        },
        {
            name: '3002',
            value: 389079.4453422,
        },
        {
            name: '1080',
            value: 294817.7752506,
        },
        {
            name: '2002',
            value: 251726.9898067,
        },
        {
            name: '4060',
            value: 198546.7065878,
        },
    ]);
    const [householdPerformance, setHouseholdPerformance] = useState({
        performance: [
            {
                date: '2021-11-08',
                log_ret: -0.4950471665980917,
                net_log_ret: -0.49505583131688236,
                charged_fees: 0,
                unamortized_fees: -162.71999999999895,
                fees: 0,
                net_daily_balance: 7332612.4664437,
                growth: 776696.3349437001,
                cumulative_contributions: 8556078.8515,
                value: 7332775.1864436995,
                contributions: 4691326.9048,
            },
            {
                date: '2021-11-09',
                log_ret: -0.009590388054229642,
                net_log_ret: -0.009590601900962833,
                charged_fees: 0,
                unamortized_fees: -162.71999999999895,
                fees: 0,
                net_daily_balance: 7262624.4494437,
                growth: 706708.3179436998,
                cumulative_contributions: 8556078.8515,
                value: 7262787.1694436995,
                contributions: 0,
            },
            {
                date: '2021-11-10',
                log_ret: 0.0038283830552949187,
                net_log_ret: 0.003828468666706613,
                charged_fees: 0,
                unamortized_fees: -162.71999999999895,
                fees: 0,
                net_daily_balance: 7290482.472343701,
                growth: 734566.3408437009,
                cumulative_contributions: 7556078.8515,
                value: 7290645.192343701,
                contributions: 0,
            },
            {
                date: '2021-11-11',
                log_ret: 0.003249651338549416,
                net_log_ret: 0.003249723751451803,
                charged_fees: 0,
                unamortized_fees: -162.71999999999895,
                fees: 0,
                net_daily_balance: 7314213.0644437,
                growth: 758296.9329437014,
                cumulative_contributions: 6556078.8515,
                value: 7314375.784443701,
                contributions: 0,
            },
            {
                date: '2021-11-12',
                log_ret: 0.0002237475821379488,
                net_log_ret: 0.0002237525593150711,
                charged_fees: 0,
                unamortized_fees: -162.71999999999895,
                fees: 0,
                net_daily_balance: 7315849.821443699,
                growth: 759933.6899437008,
                cumulative_contributions: 6556078.851499999,
                value: 7316012.541443699,
                contributions: -9.313225746154785e-10,
            },
            {
                date: '2021-11-15',
                log_ret: 0.002787346428391867,
                net_log_ret: 0.002787408338557351,
                charged_fees: 0,
                unamortized_fees: -162.71999999999895,
                fees: 0,
                net_daily_balance: 7336270.529443701,
                growth: 780354.3979437017,
                cumulative_contributions: 6556078.851499999,
                value: 7336433.249443701,
                contributions: 0,
            },
            {
                date: '2021-11-16',
                log_ret: -0.04603999759177157,
                net_log_ret: -0.04604104264143952,
                charged_fees: 0,
                unamortized_fees: -162.71999999999895,
                fees: 0,
                net_daily_balance: 7006158.6444437,
                growth: 450242.51294370147,
                cumulative_contributions: 6556078.851499999,
                value: 7006321.3644437,
                contributions: 0,
            },
            {
                date: '2021-11-17',
                log_ret: 0.0454117071880207,
                net_log_ret: 0.04542441508997195,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 7023213.7264437,
                growth: 1245435.161643701,
                cumulative_contributions: 5777859.594799999,
                value: 7023294.7564437,
                contributions: -294833,
            },
            {
                date: '2021-11-18',
                log_ret: 0.10343008577258343,
                net_log_ret: 0.10342073089737726,
                charged_fees: 0,
                unamortized_fees: -121.86992256348015,
                fees: 0,
                net_daily_balance: 7788448.2314437,
                growth: 1527365.0999437012,
                cumulative_contributions: 6261245.851499999,
                value: 7788610.9514437,
                contributions: 1.1641532182693481e-10,
            },
            {
                date: '2021-11-19',
                log_ret: -0.10982122404751228,
                net_log_ret: -0.10981194314590367,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6978470.0124437,
                growth: 405233.347643701,
                cumulative_contributions: 6573317.694799999,
                value: 6978551.042443699,
                contributions: 0,
            },
            {
                date: '2021-11-22',
                log_ret: -0.015382623616884448,
                net_log_ret: -0.015382803611971663,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6871943.0212437,
                growth: 298706.3564437013,
                cumulative_contributions: 6573317.694799999,
                value: 6872024.0512437,
                contributions: 0,
            },
            {
                date: '2021-11-23',
                log_ret: 0.02179440775253283,
                net_log_ret: 0.022376047222753763,
                charged_fees: 11612.96,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6903078.343643701,
                growth: 435829.528843702,
                cumulative_contributions: 5463317.694799999,
                value: 6899147.223643701,
                contributions: -121612.95999999999,
            },
            {
                date: '2021-11-25',
                log_ret: -0.023253611275550368,
                net_log_ret: -0.024367813717706945,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6736898.360843699,
                growth: 277250.3560437011,
                cumulative_contributions: 6463317.694799999,
                value: 6740568.0508437,
                contributions: 0,
            },
            {
                date: '2021-11-26',
                log_ret: 0.00814918520743525,
                net_log_ret: 0.007033905488460769,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6784452.115443699,
                growth: 339550.92144370027,
                cumulative_contributions: 6456171.693999999,
                value: 6795722.615443699,
                contributions: 0,
            },
            {
                date: '2021-11-29',
                log_ret: -0.018545662012215587,
                net_log_ret: -0.019731025234909848,
                charged_fees: 0,
                unamortized_fees: -121.86992256348015,
                fees: 0,
                net_daily_balance: 6651899.9152859,
                growth: 526753.0645859005,
                cumulative_contributions: 6144099.850699999,
                value: 6670852.915285899,
                contributions: 0,
            },
            {
                date: '2021-11-30',
                log_ret: -0.010829632986805724,
                net_log_ret: -0.012004026281026746,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6572527.6801859,
                growth: 142828.10618590086,
                cumulative_contributions: 6456171.693999999,
                value: 6598999.8001859,
                contributions: 0,
            },
            {
                date: '2021-12-01',
                log_ret: 0.02471984508633178,
                net_log_ret: 0.023677277534256295,
                charged_fees: 0,
                unamortized_fees: -101.44996128173969,
                fees: 0,
                net_daily_balance: 6729827.0477859,
                growth: 612908.8162859011,
                cumulative_contributions: 6151072.851499999,
                value: 6763981.6677859,
                contributions: -173,
            },
            {
                date: '2021-12-02',
                log_ret: -0.01667219695661643,
                net_log_ret: -0.017882385722318973,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6675769.6902859,
                growth: 187900.9854859009,
                cumulative_contributions: 6529542.444799999,
                value: 6717443.4302859,
                contributions: 66395.11,
            },
            {
                date: '2021-12-03',
                log_ret: 0.010372931142993256,
                net_log_ret: 0.009309967514939807,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6738211.1019859,
                growth: 257943.2071859009,
                cumulative_contributions: 6529542.444799999,
                value: 6787485.6519859,
                contributions: 0,
            },
            {
                date: '2021-12-06',
                log_ret: 0.019609682303079228,
                net_log_ret: 0.0186451087596316,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6865024.3302859,
                growth: 392357.2454859016,
                cumulative_contributions: 6529542.444799999,
                value: 6921899.690285901,
                contributions: 0,
            },
            {
                date: '2021-12-07',
                log_ret: 0.0003875829103576357,
                net_log_ret: -0.0007165658594760328,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6860106.8502859,
                growth: 395040.5754859006,
                cumulative_contributions: 6529542.444799999,
                value: 6924583.0202859,
                contributions: 0,
            },
            {
                date: '2021-12-08',
                log_ret: -0.009518089237865986,
                net_log_ret: -0.010727273542924246,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6786909.9112859,
                growth: 329444.44648590067,
                cumulative_contributions: 6529542.444799999,
                value: 6858986.8912859,
                contributions: 0,
            },
            {
                date: '2021-12-09',
                log_ret: 0.005730329427374183,
                net_log_ret: 0.004676933995806864,
                charged_fees: 0,
                unamortized_fees: -81.02999999999923,
                fees: 0,
                net_daily_balance: 6818726.184285901,
                growth: 368861.52948590147,
                cumulative_contributions: 6529542.444799999,
                value: 6898403.974285901,
                contributions: 0,
            },
        ],
        total_contribution: 6529542.444799999,
        total_growth: 92886.60648590112,
    });

    const classes = makeStyles(styles())();
    const renderPerformanceChart = () => {
        const dims = {
            width: window.innerWidth * .99,
            height: 300,
            margin: {
                top: 0,
                right: 45,
                bottom: 0,
                left: 0,
            },
        };
        if (householdPerformance) {
            if (householdPerformance['performance'])
                return (
                    <PerformanceChart
                        data={householdPerformance['performance']}
                        title=""
                        lineNames={['Value', 'Contributions']}
                        tooltipNames={['Value', 'Contributions']}
                        callBack={() => {}}
                        yMetric="dollar"
                        yValues={['value', 'cumulative_contributions']}
                        dimensions={dims}
                    />
                );
            else return <></>;
        } else return <></>;
    };

    const renderPieChart = () => {
        if (pieChartData)
            return (
                <PieChart
                    dataList={pieChartData}
                    valueMetric="dollar"
                    labelPosition={window.innerWidth < 900
                        ? "bottom" : "right"}
                />
            );
        else return <></>;
    };

    return (
        <div className={classes.page}>
            <div className={classes.mainTop}>
                {renderPerformanceChart()}
            </div>
            {renderPieChart()}
        </div>
    );
};

export default ClientHome;
