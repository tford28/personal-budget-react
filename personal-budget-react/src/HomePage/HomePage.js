import React, { useEffect } from 'react';
import Chart from 'chart.js';
import * as d3 from 'd3';
import axios from 'axios';

function HomePage() {
    useEffect(() => {
        var dataSource = {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19',
                    '#2dd654',
                    '#d62dd6',
                    '#34c2c0',
                    '#abc234',
                    '#ff69b4',
                    '#ffc0cb',
                ],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
            ]
        };

        function createChart() {
            var ctx = document.getElementById("myChart").getContext("2d");
            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: dataSource
            });
        }

        function createD3Chart() {
            axios.get('http://localhost:3030/budget')
            .then(function(res) {
                var data = res.data.myBudget;
                console.log(data);
                var text = "";
    
                var width = 200;
                var height = 200;
                var thickness = 20;
    
                var radius = Math.min(width, height) / 2;
                var color = d3.scaleOrdinal(d3.schemeCategory10);
    
                var svg = d3.select("#chart")
                .append('svg')
                .attr('class', 'pie')
                .attr('width', width)
                .attr('height', height);
    
                var g = svg.append('g')
                .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
    
                var arc = d3.arc()
                .innerRadius(radius - thickness)
                .outerRadius(radius);
    
                var pie = d3.pie()
                .value(function(d) { return d.budget; })
                .sort(null);
    
                var path = g.selectAll('path')
                .data(pie(data))
                .enter()
                .append("g")
                .on("mouseover", function(d) {
                    console.log(d);
                    let g = d3.select(this)
                        .style("cursor", "pointer")
                        .style("fill", "black")
                        .append("g")
                        .attr("class", "text-group");
    
                    g.append("text")
                        .attr("class", "title-text")
                        .attr('text-anchor', 'middle')
                        .attr('dy', '-1.2em');
                
                    g.append("text")
                        .attr("class", "budget-text")
                        .attr('text-anchor', 'middle')
                        .attr('dy', '.6em');
                    })
                .on("mouseout", function(d) {
                    d3.select(this)
                        .style("cursor", "none")  
                        .style("fill", color(this._current))
                        .select(".text-group").remove();
                    })
                .append('path')
                .attr('d', arc)
                .attr('fill', (d,i) => color(i))
                .on("mouseover", function(d) {
                    d3.select(this)     
                        .style("cursor", "pointer")
                        .style("fill", "black");
                    })
                .on("mouseout", function(d) {
                    d3.select(this)
                        .style("cursor", "none")  
                        .style("fill", color(this._current));
                    })
                .each(function(d, i) { this._current = i; });
    
    
                g.append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', '.35em')
                .text(text);
            })
        }

        function getBudget() {
            axios.get('http://localhost:3030/budget')
            .then(function(res) {
                console.log(res.data);
                for(var i = 0; i < res.data.myBudget.length; i++) {
                    dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                    dataSource.labels[i] = res.data.myBudget[i].title;
                }
                createChart();
                createD3Chart();
            })
        }
        getBudget();
    });

  return (
    <main className="container center">

        <div className="page-area">

            <article className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>

            <article className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>

            <article className="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>

            <article className="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>

            <article className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>

            <article className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go 
                    over the budget.
                </p>
            </article>

            <article className="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear...
                    because they know it is all good and accounted for.
                </p>
            </article>

            <article className="text-box">
            <h1>Chart</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>

                <h1>D3JS Chart</h1>
                <p>
                    <div id="chart"></div>
                </p>
            </article>

        </div>
    </main>
  );
}

export default HomePage;