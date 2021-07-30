"use strict";
/* function idRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
} 
const idSuper = idRandom(1, 731)
*/

/*
* Acción al enviar el formulario 
*/
$("#heroForm").submit(function (event) {
    event.preventDefault();
    
    let idSuper = $("#heroNumber_input").val() // Captura el valor del input
    
    //console.log(idSuper)

    /*
    * Condicional para ingresar un número válido
    */
    if (idSuper < 1 || idSuper > 731 ){
        alert("Write a number between 1 and 731")
    }else{
        
        $("#hero__info").css("display", "flex") // Muestra las estadísticas al ingresar un número válido
        
        $.ajax({
            type: "GET",
            url: `https://www.superheroapi.com/api.php/526108071974965/${idSuper}`,
            dataType: 'JSON',
            success: function(idSuper){
                $("#hero__img").attr("src", idSuper.image.url); // Vincula la url de la imagen del Superhero
                $("#hero__name").html(`I'm ${idSuper.name}`) // Muestra el nombre del Superhero
                /*
                * Biography 
                */
                $("#hero__full-name").html(`<strong>Full Name:</strong> ${idSuper.biography["full-name"]}`)
                $("#hero__alter-egos").html(`<strong>Alter Egos:</strong> ${idSuper.biography["alter-egos"]}`)
                $("#hero__aliases").html(`<strong>Aliases:</strong> ${idSuper.biography.aliases}`)
                $("#hero__place-of-birth").html(`<strong>Place of birth:</strong> ${idSuper.biography["place-of-birth"]}`)
                $("#hero__first-appearance").html(`<strong>First Appearance:</strong> ${idSuper.biography["first-appearance"]}`)
                $("#hero__publisher").html(`<strong>Publisher:</strong> ${idSuper.biography.publisher}`)
                $("#hero__alignment").html(`<strong>Alignment:</strong> ${idSuper.biography.alignment}`)
                /*
                * Appearance 
                */
                $("#hero__gender").html(`<strong>Gender:</strong> ${idSuper.appearance.gender}`)
                $("#hero__race").html(`<strong>Race:</strong> ${idSuper.appearance.race}`)
                $("#hero__height").html(`<strong>Height:</strong> ${idSuper.appearance.height}`)
                $("#hero__weight").html(`<strong>Weight:</strong> ${idSuper.appearance.weight}`)
                $("#hero__eye-color").html(`<strong>Eye color:</strong> ${idSuper.appearance["eye-color"]}`)
                $("#hero__hair-color").html(`<strong>Hair color:</strong> ${idSuper.appearance["hair-color"]}`)
                /*
                * Work 
                */
                $("#hero__occupation").html(`<strong>Occupation:</strong> ${idSuper.work.occupation}`)
                $("#hero__base").html(`<strong>Base:</strong> ${idSuper.work.base}`)
                /*
                * Connections 
                */
                $("#hero__group-affiliation").html(`<strong>Group affiliation:</strong> ${idSuper.connections["group-affiliation"]}`)
                $("#hero__relatives").html(`<strong>Relatives:</strong> ${idSuper.connections.relatives}`)
                
                
                /*
                * Canvas.js
                */
                var options = {
                    title: {
                        text: "Powerstats"
                    },
                    subtitles: [{
                        text: `${idSuper.name}`
                    }],
                    animationEnabled: true,
                    data: [{
                        type: "pie",
        //                startAngle: 40,
                        toolTipContent: "<b> {label}</b>: {y} ",
        //                showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: " {label}: {y} ",
                        dataPoints: [
                            { y: idSuper.powerstats.intelligence, label: "Intelligence" },
                            { y: idSuper.powerstats.strength, label: "Strength" },
                            { y: idSuper.powerstats.speed, label: "Speed" },
                            { y: idSuper.powerstats.durability, label: "Durability" },
                            { y: idSuper.powerstats.power, label: "Power" },
                            { y: idSuper.powerstats.combat, label: "Combat" }
                        ]
                    }]
                };
                $("#chartContainer").CanvasJSChart(options);

            },
            /*
            * Despliega un mensaje de error si falló la conexión con la API 
            */
            error: function(idSuper){
                $('body').append("Failure while fetching data :(")
            },
            async: true,
        });
    }
})