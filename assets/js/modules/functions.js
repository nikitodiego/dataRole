
/* Función que devuelve el resultado del formulario*/
function suma(){  
    contador = 0;
    for (i=0; i < infoHTML.length;i++){
        for (j = 0; j < infoHTML[0].respuesta.length; j++){ 
            if (document.pregunta[i].respuesta[j].checked){
                contador += j;
                break;
                }   
            }    
        }
    return contador;
}


/* La función role toma como parámetro la salida de suma, y retorna el rol del usuario.
También se trabaja con el vector "yValues" para obtener la cantidad de registrados en cada rol (engineer, analyst o scientist).*/ 
function role(a){
    let role;    
    if (a < 3){
        role = "DATA ENGINEER!";
        yValues[0]+=1;
    }else if(a >= 3 && a <= 5){
        role = "DATA ANALYST!";
        yValues[1]+=1;
    }else{
        role = "DATA SCIENTIST!";
        yValues[2]+=1;
    } return role;
}  
    

//Función enviar formulario. Instancia la clase Usuario, almacena en sessionStorage, muestra el resultado y la cantidad de registros, y limpia los inputs.
function enviar(){
    arregloData.push(new Usuario($("#nombre").val(),parseInt($("#edad").val()),suma()));
    sessionStorage.setItem("data",JSON.stringify(arregloData));
    swal({
        title: role(suma()),
        className: "swal-overlay"
      });
    $("#nombre").val("");
    $("#edad").val("");
    $("#user").text("Registered users: "+arregloData.length);
}  


//Funcion que arma los array para el gráfico de tendencia de edades.
function arrayEdad(){
    xyValues=[];
    xyValues2=[];
    xyValues3=[];
    for (z of arregloData){
        if (z.resultado < 3){
            xyValues.push({x:z.resultado, y:z.edad});
        }else if(z.resultado >= 3 && z.resultado <= 5){
            xyValues2.push({x:z.resultado, y:z.edad});
        }else{
            xyValues3.push({x:z.resultado, y:z.edad});
        }
    }
}

//Función que muestra en pantalla un gráfico de torta para los registros y un scatter con tendencia de edades.
function graficar(){
    arrayEdad();
    let xValues = ["Engineer","Analyst","Scientist"];
    var barColors = ["rgb(72, 213, 223)", "rgb(71, 223, 104)","rgb(223, 72, 97)"];
    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
        legend: {display: false},
        title: {
          display: false,
          text: "Data Role"
            }, 
        }
    });

    new Chart("myChart2", {
          type: "scatter",
          data: {
            datasets: [{
              label: "Engineer",
              backgroundColor: "rgb(72, 213, 223)",
              pointRadius: 6,
              pointBackgroundColor: "rgb(72, 213, 223)",
              data: xyValues
            },{
              label: "Analyst",
              backgroundColor: "rgb(71, 223, 104)",
              pointRadius: 6,
              pointBackgroundColor: "rgb(71, 223, 104)",
              data: xyValues2
            },{
                label: "Scientist",
                backgroundColor: "rgb(223, 72, 97)",
                pointRadius: 6,
                pointBackgroundColor: "rgb(223, 72, 97)",
                data: xyValues3
              }],
          },
          options: {
            legend: {display: true},
            scales: {
              xAxes: [{ticks: {min: 0, max:10}}],
              yAxes: [{ticks: {min: 0, max:70}}],
            },
            xLabel: {display: true}
          }
    });

}










