(function(){
    'use strict';

    var w = 800;
    var h = 450;

    var margin = {
        top: 60,
        bottom: 80,
        left: 80,
        right: 80
    };

    var width = w - margin.left - margin.right;
    var height = h - margin.top - margin.bottom;

    var svg = d3.select('body').append('svg')
                .attr('id', 'chart')
                .attr('width', w)
                .attr('height', h);

    var chart = svg.append('g')
                    .classed('display', true)
                    .attr('transform', 'translate('+margin.left+','+margin.top+')');

    var x = d3.scale.linear()
                .domain(d3.extent(data, function(d, i){
                    return d.age;
                }))
                .range([0, width]);

    var y = d3.scale.linear()
                .domain([1, 5])
                .range([height, 0]);

    var responseScale = d3.scale.linear()
                            .domain(d3.extent(data, function(d, i){
                                return d.responses;
                            }))
                            .range([2, 15]);

    var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');

    var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');
                    

    function plot(params){

        this.append('g')
            .classed('x axis', true)
            .attr('id', 'axisX')
            .attr('transform', 'translate(0,'+height+')')
            .call(xAxis);

        this.append('g')
            .classed('y axis', true)
            .attr('id', 'axisY')
            .attr('transform', 'translate(0,0)')
            .call(yAxis);
        //enter

        this.append('g')
            .classed('plot-group', true)
            .attr('id', 'plotGroup')
            .attr('transform', 'translate(0,0)');

        this.select('.plot-group')
            .selectAll('.point')
            .data(params.data)
            .enter()
                .append('circle')
                .classed('point', true)

        //update
        this.selectAll('.point')
            .attr('r', function(d, i){
                return responseScale(d.responses);
            })
            .attr('cx', function(d, i){
                return x(d.age);
            })
            .attr('cy', function(d, i){
                return y(d.glazed);
            })
        //exit
        this.selectAll('.point')
            .data(params.data)
            .exit()
            .remove();
    }

    plot.call(chart, {
        data: data
    });
}());