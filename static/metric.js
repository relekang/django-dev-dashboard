$(function () {
    var e = $("#graph");
    var url = "/metric/" + e.data('metric') + ".json?days=365";
    $.getJSON(url, function(response) {
        for (var i=0; i < response.data.length; i++) {
            response.data[i][0] = response.data[i][0] * 1000;
        };
        var options = {
            xaxis: {
                mode: "time",
                tickColor: "rgba(0,0,0,0)",
                minTickSize: [1, "day"],
            },
            yaxis: {min: 0, ticks: 4},
            grid: {borderWidth: 0, hoverable: true, color: "white"},
            colors: ["yellow"],
        };
        if (response.period != "instant") {
            options.bars = {
                show: true,
                barWidth: 22 * 60 * 60 * 1000,
                align: "center",
            };
            options.lines = {show: false};
        }
        $.plot(e, [response.data], options);
    });

    hover = {
        show: function(x, y, message, is_bars) {
            $('<div id="hover">').html(message)
                .css({top: y+15, left: x+5})
                .appendTo('body')
                .show();
        },
        hide: function() {
            $("#hover").remove();
        }
    };
    
    var previousPoint = null;
    e.bind("plothover", function(event, pos, item) {
        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;
                hover.hide();
                var d = new Date(item.datapoint[0]);
                var ds = $.plot.formatDate(d, "%b %d, %h:%M%p");
                var m = ds + "<br>" + Math.round(item.datapoint[1]*100)/100;
                hover.show(item.pageX, item.pageY, m, item.series.bars.show);
            }
        } else {
            hover.hide();
            previousPoint = null;
        }
    });
});