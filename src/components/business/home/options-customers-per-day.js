import i18n from '../../../i18n';

const optionsCustomersPerOrder = {
    chart: {
        type: 'column',
        height: 275,
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [],
        title: {
            text: ''
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of guests'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },

    series: []
}

export default optionsCustomersPerOrder