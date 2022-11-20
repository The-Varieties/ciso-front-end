export const annotationLineSetting = {
    id: 'annotationLine',
    afterDraw: function(chart, easing) {
        if(chart.tooltip._active && chart.tooltip._active.length) {
            const context = chart.ctx;
            const x = chart.tooltip._active[0].element.x;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            for(let i = 0; i < chart.tooltip.labelColors.length; i++) {
                chart.tooltip.labelColors[i]['backgroundColor'] = chart.tooltip.labelColors[i]['borderColor']
            }

            context.save();
            context.beginPath();
            context.moveTo(x, topY);
            context.lineTo(x, bottomY);
            context.lineWidth = 2;
            context.strokeStyle = 'rgba(255,255,255,0.7)';
            context.stroke();
            context.restore();
        }
    }
}