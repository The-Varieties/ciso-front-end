export const lineChartSetting = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                padding: 30,
                color: 'white'
            }
        }
    },
    scales: {
        y: {
            grid: {
                color: 'rgba(47,79,79,0.3)',
                borderColor: 'white'
            },
            ticks: {
                color: 'white'
            }
        },
        x: {
            grid: {
                color: 'rgba(47,79,79,0.3)',
                borderColor: 'white'
            },
            ticks: {
                color: 'white',
            }
        }
    },
    interaction: {
        mode: 'index',
        intersect: false
    },
    tooltips: {
        mode: 'index',
        intersect: false
    },
    hover: {
        mode: 'index',
        intersect: false
    }
}