
//Bienvenida
console.log("Bienvenid@ al sistema de orientacion vocacional en Data");

//Inicializo array principal
let arregloData =[];
//Array para gráfico de torta
let yValues = [0,0,0];


//Carga el sessionStorage en arregloData. Evita el null que ocurre al iniciar una sesión, ya que no hay nada que cargar desde el storage.
if (JSON.parse(sessionStorage.getItem("data") != null)){
    for(const x of JSON.parse(sessionStorage.getItem("data"))){
        arregloData.push(new Usuario(x.nombre,x.edad,x.resultado));
        role(x.resultado);
}}else{
    swal("Welcome!");
}

//Se carga el gif y se aplican animaciones con un callback.
$("#imagen").prepend(`<img class="img" src="./assets/img/dataflow.gif" alt="Diagrama de flujo de datos">`);  
    $(".img").fadeOut(10, function(){
        $(".img").fadeIn(3500);
    });

    
//Se ejecuta graficar
graficar();

//Se actualiza el número de registrados
$("#user").text("Registered users: "+arregloData.length);


//Carga dinámica del html con aplicación de animaciones concatenadas.
const infoHTML = [{"id": 0, "pregunta":"Which of these tasks do you prefer?","respuesta":["Develop code to order and debug data.","Finding the rigth way to visualize the information ","Develop optimization algorithms."]},
                  {"id": 1, "pregunta":"Data workflow.","respuesta":["Database and pipelines optimization.","Data manipulation.","Develop machine learning classification patterns."]},
                  {"id": 2, "pregunta":"Choose one of the following Python libraries.","respuesta":["PySpark.","Pandas.","TensorFlow."]},
                  {"id": 3, "pregunta":"Choose one of the following activities.","respuesta":["Data preparation.","Exploration and visualization.","Experimentation and prediction."]}];
for (const x of infoHTML){
                $("#padre").append(`<form id=hijo${x.id} class="form-check" name="pregunta"> 
                <span>${x.pregunta}</span><br></form>`); 
                for (const y of x.respuesta){
                    $(`#hijo${x.id}`).append(`<input class="form-check-input" type="radio" name="respuesta" checked>
                    <label class="form-check-label" for="respuesta">${y}</label><br>`);
                }   
                $(`#hijo${x.id}`).hide() //
                                    .delay(500)
                                        .slideDown(1000)
                                        
            }    

//Definición de manejadores de eventos con jquery
$("#btn1").click(function(){
    if($("#nombre").val().length < 4){
        swal("Please enter a valid name.", {
            dangerMode: true
          });
    }else if((parseInt($("#edad").val()))>0){
        enviar();
    }else{
        swal("Please enter a valid age.", {
            dangerMode: true
          });
        }
    });
$("#btn2").click(function(){
    graficar();
});


//Consumo de la API Openweather
navigator.geolocation.getCurrentPosition((position)=>{
let urlClima = "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=3dcdb0a34749877e2212a740084b587c"
$.get(urlClima, function(datos){
let icono = datos.weather[0].icon;
let urlIcono = "http://openweathermap.org/img/w/" + icono +".png"
$("#clima").append((datos.main.temp-273).toFixed(1)+" °C ")
           .append(datos.weather[0].description)
           .prepend(`<img id="icono" src="" alt=""></img>`);
$("#icono").attr("src",urlIcono);
})
});


/* Intenté mil maneras de traer el array de preguntas y respuestas "infoHTML" desde un .json (local, usando ajax, firebase,etc) y siempre me daba error de CORS.
Me funcionó abriendo directamente con live server, o creando el servidor con python:
1) ejecutar por terminal el comando de python para crear servidor:
python -m http.server
2) escribo la url como:
localhost:8000/index.html

Dejo comentado el fetch abajo.*/

/*
fetch("./assets/js/modules/data.json")
    .then(response => response.json())
    .then(data =>{
        console.log(data)
    })
*/


 