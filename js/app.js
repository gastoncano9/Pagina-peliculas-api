'use strict';

let contenedorTarjetas = document.querySelector(".contenedor-tarjetas");
let contadorAfuera = 1;
const contenedorDerecha = document.querySelector(".derecha");
const contenedorIzquierda = document.querySelector(".izquierda");
const formulario = document.getElementById("formulario");
let tituloh2 = document.querySelector(".contenedor-titulo_general");
const options = 
{
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'data-imdb1.p.rapidapi.com',
		'X-RapidAPI-Key': 'f00d49ceb7mshf01c1507b7cca46p102f61jsnc0c40fb4fad4'
	}
};

const obtenerDatos = (contador) =>
{
    obtenerResponse(contador)
    .then(response => response.json())
    .then(response =>
    {
        console.log(response);

        contenedorTarjetas.innerHTML = "";

        for(let respuesta of response.results)
        {
            if(respuesta.primaryImage != null && respuesta.titleText.text != null && respuesta.releaseDate != null)
            {
                contenedorTarjetas.innerHTML += 
                `
                <div class = 'tarjeta'>
                    <div class = 'contenedor-titulo_pelicula'>
                        <h3>${respuesta.titleText.text}</h3>
                    </div>

                    <div class = 'contenedor-imagen_pelicula'>
                        <img src = ${respuesta.primaryImage.url} >
                    </div>

                    <div class = 'hover'>
                        Año de su lanzamiento
                        ${respuesta.releaseDate.year}
                    </div>
                </div>
                `;
            }
        }
    })
    .catch(error => 
    {
        console.log(error);
    });
}

contenedorDerecha.addEventListener("click", () =>
{
    if(tituloh2.innerHTML == "BUSQUEDA")
    {
        contadorAfuera++;
        obtenerDatosBusqueda(contadorAfuera, localStorage.getItem("busqueda"));
    }
    else
    {
        contadorAfuera++;
        obtenerDatos(contadorAfuera);
    }
    
});

contenedorIzquierda.addEventListener("click", () =>
{

    if(contadorAfuera == 1)
    {
        alert("No puedes volver atras");
    }
    else
    {
        if(tituloh2.innerHTML == "BUSQUEDA")
        {
            contadorAfuera--;
            obtenerDatosBusqueda(contadorAfuera, localStorage.getItem("busqueda"));
        }
        else
        {
            contadorAfuera--;
            obtenerDatos(contadorAfuera);
        }
    }
});

formulario.addEventListener("submit", (e) => 
{
    contadorAfuera = 1;
    localStorage.clear();
    e.preventDefault();
    let texto = document.getElementById("texto").value;
    localStorage.setItem("busqueda", texto);
    obtenerDatosBusqueda(contadorAfuera, texto);
});

window.onload
{
    obtenerDatos(contadorAfuera);
}

function obtenerResponse(contador)
{
    return fetch(`https://data-imdb1.p.rapidapi.com/titles?info=mini_info&limit=10&page=${contador}&titleType=movie&genre=Action&year=2022`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": "f00d49ceb7mshf01c1507b7cca46p102f61jsnc0c40fb4fad4"
        }
    });
}

function realizarBusqueda(busqueda, contador, opciones)
{
    return fetch(`https://data-imdb1.p.rapidapi.com/titles/search/title/${busqueda}?info=mini_info&limit=10&page=${contador}&titleType=movie`, opciones);
}

function obtenerDatosBusqueda(contador, busqueda)
{
    realizarBusqueda(busqueda, contador, options)
    .then(response => response.json())
    .then(response => 
    {   
        if(response.results != 0)
        {
            contenedorTarjetas.innerHTML = "";

            for(let respuesta of response.results)
            {
                if(respuesta.primaryImage != null && respuesta.titleText.text != null && respuesta.releaseDate != null)
                {
                    contenedorTarjetas.innerHTML += 
                    `
                    <div class = 'tarjeta'>
                        <div class = 'contenedor-titulo_pelicula'>
                            <h3>${respuesta.titleText.text}</h3>
                        </div>

                        <div class = 'contenedor-imagen_pelicula'>
                            <img src = ${respuesta.primaryImage.url} >
                        </div>

                        <div class = 'hover'>
                            Año de su lanzamiento
                            ${respuesta.releaseDate.year}
                        </div>
                    </div>
                    `;
                }
            }

            tituloh2.innerHTML = "BUSQUEDA";
            tituloh2.style.fontFamily = "creepy";
            tituloh2.style.fontSize = "40px";
        }
        else
        {
            alert("No se encontraron coincidencias");
        }
        
    });
}