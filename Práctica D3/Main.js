// Constantes

const width = 800
const height= 500
const margin = {
    top: 20,
    bottom: 40,
    left: 60,
    right: 20
}

// definición svg y grupos

const svg = d3.select("#chart").append("svg").attr("width",width).attr("height",height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${0},${margin.top+20})`)
const axisgroup = svg.append("g").attr("id", "axisgroup")
const xAxisGroup = axisgroup.append("g").attr("id", "xAxisGroup").attr("transform",`translate(${margin.left}, ${height-margin.bottom + 20})`)
const yAxisGroup = axisgroup.append("g").attr("id","yAxisGroup").attr("transform",`translate(${margin.left}, ${margin.top+20})`)

// Añadir texto al gráfico

svg.append("text")
    .attr("x", width/2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .style("font-size", "36px")
    .text("Worl Cup Winners")

// Definición Escala

const x = d3.scaleLinear().range([0,(width-margin.left-margin.right)])
const y = d3.scaleBand().range([height - margin.top - margin.bottom,0]).padding(0.1)

//Definición ejes

const xAxis = d3.axisBottom().scale(x).ticks(6)
const yAxis = d3.axisLeft().scale(y)

d3.csv("data.csv").then ( data => {

//Tratamiento Datos
    let data2 = data.filter(x => x.winner !="")

    let data3 = data2.map(x => x.winner)

    let data4 = data3.reduce((accumulator, value) => { return{...accumulator, [value]: (accumulator[value] || 0) + 1};},{})

    let dataFinal  = Object.entries(data4).map(entry => {
        let result = {country: entry[0], titles: entry[1]}
        return result})

//Dominios y visualización ejes

    x.domain([0, d3.max(dataFinal.map(d => d.titles))])
    y.domain(dataFinal.map(d => d.country))
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

//Función colorear el máximo

    console.log(d3.max(dataFinal.map(d => d.titles)))
    function colorPicker(v){
        if(v >= d3.max(dataFinal.map(d => d.titles))) { return "red"}
        else {return "green"}}

//Creación de barras

    elementGroup.selectAll("rect").data(dataFinal)
        .join("rect")
            .attr("class", d => d.country)
            .attr("fill", d => colorPicker(d.titles))
            .attr("x", margin.left)
            .attr("y", d => y(d.country))
            .attr("width", d => x(d.titles))
            .attr("height", y.bandwidth())

    }) 

  

   