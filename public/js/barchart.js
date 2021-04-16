angular.module('AngularChart', []).directive('chart', function() {
    return {
        restrict: 'E',
        template: '<div></div>',
        transclude: true,
        replace: true,
        scope: '=',
        link: function(scope, element, attrs) {
            var opt = {
                chart: {
                    renderTo: element[0],
                    type: 'bar',
                    marginRight: 130,
                    marginBottom: 40
                },
                title: {
                    text: attrs.title,
                    x: -20 //center
                },

                plotOptions: {
                    lineWidth: 1
                },
                yAxis: {
                    title: {
                        text: attrs.yname
                    },
                    tickInterval: (attrs.yinterval) ? new Number(attrs.yinterval) : null,
                    max: attrs.ymax,
                    min: attrs.ymi
                },
                tooltip: {
                    formatter: scope[attrs.formatter] || function() {
                        return '<b>' + this.y + '</b>'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 100,
                    borderWidth: 0
                }
            }


            //Update when charts data changes
            scope.$watch(function(scope) {
                return JSON.stringify({
                    xAxis: {
                        categories: scope[attrs.xdata]
                    },
                    series: scope[attrs.ydata]
                });
            }, function(news) {

                news = JSON.parse(news)
                if (!news.series) return;
                angular.extend(opt, news)
                var chart = new Highcharts.Chart(opt);
            });
        }
    }

})