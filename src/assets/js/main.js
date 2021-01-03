const task = require('./task');
const localDB = require('./pouchDb');
const table = require('./normalization_tabe');
const ica = require('./ica')
const TAG = "[main.js]"
const $ = require('jquery');
const { get, data } = require('jquery');
let Temp = null

initFirebase()
obtData()
obervador()
// newData()
validar()

const downloadReports = document.getElementById('downloadReport');
downloadReports.addEventListener("submit", descargarReport, false);
//Función para la descarga del archivo de excel.
function descargarReport(){
    window.open("https://us-central1-proyectohidra-36f38.cloudfunctions.net/helloWorld/", '_blank');
}

$("#submit").on('click',function(){
    var email = $("#email").val();
    var password = $("#password").val();

    if(email != "" && password != ""){
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
              window.alert("Following error encountered : "+errorMessage+" .");
            });
    }
});

function obtData(){
    let fecha = new Date();
    const fechaToma = "Fecha: " + fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear();
    $('#fecha').append(fechaToma);
}

function obervador(){
    firebase.auth().onAuthStateChanged((user) => {
        if(user){      
            $(function(){
                getUser()
                getRegistros()
                singOut()
                var email = user.email;
                $("#userToma").append(email);
                $("#divInicio").hide(); 
                $("#campoImag").hide();
                $("#divformulario").show();
            })   
        }
        else {
            $("#bienvenido").show(); 
            $("#divInicio").hide();
            $("#divformulario").hide();
            $("#campoImag").show();
            console.log("No hay usuario logeado")
        }
    })
}

function userNoPermitido(){
    firebase.auth().signOut().catch(function(error) {
        // An error happened.
        console.log(error);
    });
}

function serviceWorkerRegister() {
    if (navigator.serviceWorker) {
        console.log('[main | service_worker register]');
        navigator.serviceWorker.register('/sw.js');
    } else {
        console.log('[main | service_worker not register]');
    }
}

//Función para validar el ingreso y el estado del usuario. 
function getUser(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // newData()      
            console.log("usuario logeado")   
            const uid = user.uid;
            let database = firebase.database();
            let ref = database.ref('users/' + uid )
            const divformulario = document.getElementById('divformulario').value;
            const divInicio = document.getElementById('divInicio').value;
            return new Promise((resolve, reject) => {
                ref.on("value", data => {
                    // console.log(TAG, "[dashboard] data from firebase: ", data.val())                  
                    resolve(data.val())
                    users = data.val();
                    correoElectronico = users.correoElectronico;
                    nombreCompleto = users.nombreCompleto;
                    numeroIdentificacion = users.numeroIdentificacion;
                    rol = users.rol;
                 
                    if(rol == "Administrador"){
                        $(function(){
                            $("#bienvenido").hide(); 
                            $("#divInicio").hide();
                            $('#campo').hide();
                            $("#divformulario").show();
                            $("#admini").show();
                            singOut()
                        })
            
                    }else if(rol == "Auxiliar de campo" ){
                        $(function(){
                            $("#divInicio").hide();
                            $("#bienvenido").hide();                              
                            $("#admini").hide();
                            $("#divformulario").show();
                            $('#campo').show();
                            singOut()
                        }) 

                    }else if(rol == "Auxiliar de laboratorio"){
                        $(function(){  
                            alert("No tiene permisos para ingresar a esta sesión")   
                            userNoPermitido()
                        })                    
                        // $("#userToma").empty(); 
                    } else if(rol == "Sin Permisos"){
                        alert("En proceso de solicitud")
                        $("#bienvenido").show(); 
                        $("#divInicio").hide();
                        $("#divformulario").hide();
                        $("#campoImag").show();
                    }
                    else{
                        console.log("Se encontró un error")                      
                    }
                }, (err) => {
                    alert(err)
                })
            })
        }

        else{
            $(function(){
                $("#bienvenido").show(); 
                $("#divformulario").hide();
            })
             
            console.log("No hay usuario logeado")  
        }
    });
}

// function newData(){
//     let database = firebase.database()
//     let ref = database.ref('monitoreo1')
//         ref.on("child_added", function(snap) {
//             // console.log(TAG, "[dashboard] data from firebase: ", data.val())
//         var data = snap.val()
//         coments = data.coments
//             //data = registro
//         filtrar()
     
//         });

//         function filtrar(){
//             let data = Object.keys(coments)

//             var a = [coments]
//             // console.log(a)

            
            
//             // let regis = new Array()
//             // data.forEach((element, i) => {
//             //     let point = {
//             //         // id: ´element´,
//             //         id_complete: element,
//             //         id: `${element.substr(0, 6)}...`,
//             //         lat: _data[element].lat,
//             //         lng: _data[element].long,
//             //         coments: _data[element].coments,
//             //         ICA: _data[element].ICA,
//             //         IWTotal: _data[element].IWTotal,
//             //         generalTotalWeight: _data[element].pesoGeneralTotal,
//             //         answerByVariableArray: _data[element]._answersByVariableArray,
//             //         temp: _data[element].tempC,
//             //         userToma: _data[element].userToma,
//             //         zonaHoraria:_data[element].zonaHoraria,
//             //         userEditor:_data[element].userEditor,
//             //         margenError: _data[element].margenError,
//             //         puntoscardenales: _data[element].puntoscardenales,
//             //         pesoTotalIndicados: _data[element].pesoTotalIndicados,
//             //         indicadoresConsideradosTotal: _data[element].indicadoresConsideradosTotal,
//             //         criterio:_data[element].criterio,
//             //         observaciones:_data[element].observaciones
//             //     }
//             //     // console.log(point)
//             //     regis.push(point)
//             // })
//             // console.log(regis)
//         }

// }

//Funcion para obtener las cordenadas existentes en la base de datos.  
function getRegistros (){
    let database = firebase.database()
    let ref = database.ref('monitoreo1')
    ref.orderByChild("coments").on("child_added", function(snapshot) {
        registros = snapshot.val();
        coments = registros.coments
        var lat = registros.lat
        var long = registros.long
        const nombrePuntos = [coments]

        nombrePuntos.sort();
        addOptions("nombrePunto", nombrePuntos);     
        function addOptions(domElement, nombrePuntos){
            const select = document.getElementsByName(domElement)[0]; 
            for(value in nombrePuntos){
                const option = document.createElement("option");
                option.text = nombrePuntos[value];
                select.add(option); 
            } 
        }  

        $("#nombrePunto").change(function(){
            const selecCorde = $(this).children(":selected").text();
            $("#comentarios").val(selecCorde);
            $("#long").val(long);
            $("#lat").val(lat);
        })
    }) 
}

$(document).ready(function(){
    $('#mostrarMenos').hide();
    $('#mostrarMas').on('click', function(){
        $('#formulario').show();
        $('#mostrarMenos').show();
        $('#mostrarMas').hide();
    })
    $('#mostrarMenos').on('click', function(){
        $('#formulario').hide();
        $('#mostrarMenos').hide();
        $('#mostrarMas').show();
    })
}) 

function initFirebase(evet) {
    try {
        var config = {
            apiKey: "AIzaSyCs2o0kIt4IldnnScf9mv1jHDz-oINjAKU",
            authDomain: "proyectohidra-36f38.firebaseapp.com",
            databaseURL: "https://proyectohidra-36f38.firebaseio.com",
            projectId: "proyectohidra-36f38",
            storageBucket: "proyectohidra-36f38.appspot.com",
            messagingSenderId: "995223720720"
        };

        firebase.initializeApp(config);
        console.log('Firebase: ', firebase)
        console.log(firebase);
    } catch (error) {
        console.log('error: ' + error);
    }
}

function sendFormData(event) {
    // calculateMargin()
    let oData = new FormData(document.getElementById("ica"));
    let actualData = calculateIca(oData)
    let dataToSync = new Array()
    // console.log("[main | sendFormData] actualData", actualData);

    task.checkOnline({
        success: () => {
            localDB.getAllPouchDBDocs({
                success: function (results) {
                    // console.log("[main | sendFormData] PouchDBResults: ", results.rows)
                    if (!firebase.apps.length) {
                        initFirebase();
                    }
                    let database = firebase.database();
                    let ref = database.ref('monitoreo1');

                    if (results.total_rows > 0) {
                        results.rows.forEach(element => {
                            // console.log(element.doc.data)
                            dataToSync.push(element.doc.data)
                            localDB.deletePouchDBDoc(element)
                        });
                    }

                    dataToSync.push(actualData)
                    syncData(dataToSync, ref)
                    $('#margenError').empty();
                    $('#nombrePunto').prop('selectedIndex',0);
                    clearForm()
                },
                failure: function (err) {
                    console.log('Error en la obtención de datos de PouchDB: ', err)
                    alert("Error en la obtención de datos de PouchDB: ", err)
                }
            })

        }, failure: (err) => {
            localDB.addDataPouchDB(actualData)
            clearForm()
        }
    })
}

function calculateIndex(_oData) {
    // let object = {};
    let tempC = Number(document.getElementById("temperatura").value)
        Temp = tempC
    let userToma = document.getElementById("userToma").innerHTML
        usuario = userToma
    let zonaHoraria = document.getElementById("fecha").innerHTML
        fecha = zonaHoraria
    let lat = document.getElementById("lat").value
        latitud = lat 
    let long = document.getElementById("long").value
        longitud = long
    let lats = document.getElementById("lat").value
    let longs = document.getElementById("long").value
    let puntoscardenales = "Long: " + longs.concat(" - Latitud: "+lats);
        cordenadas = puntoscardenales
    let userEditor = document.getElementById("userEditor").value
        usuarioEditor = userEditor
    let ObservaLabo = document.getElementById("ObservaLabo").value
        ObservaLaboratorio = ObservaLabo
    let desPunto = document.getElementById("desPunto").value
        descripPunto = desPunto

    _oData.forEach((value, key) => {
        // console.log(TAG, `value : ${value}`)
        // console.log(TAG, `key : ${key}`)
        // el object se usa para ir pasando del form data a un objeto q se puede usar más fácil 
        // object[key] = value
        if (key != "comentarios" && key != "temperatura" && key != "lat" && key != "long" && key != "userToma" && key != "fecha" && key != "userEditor" && key !="observaciones" && key !="ObservaLabo" && key != "desPunto") {
            // aunque es un comentario se sigue ejecutando el método y continúa el flujo de la aplicación
            console.log(TAG, ica.calculateIndex(key, value, tempC))

        }
        // console.log(TAG, `object : ${object}`)
    });
}

function calculateIca(_oData) {
    calculateIndex(_oData)
    let ICAAnswerObject = ica.calculateICA()
    ICAAnswerObject.lat = latitud
    latitud=null
    ICAAnswerObject.long = longitud
    longitud=null
    ICAAnswerObject.tempC = Temp
    Temp = null
    ICAAnswerObject.userToma = usuario
    usuario=null
    ICAAnswerObject.zonaHoraria = fecha
    fecha=null
    ICAAnswerObject.puntoscardenales =cordenadas
    cordenadas = null
    ICAAnswerObject.coments = _oData.get("comentarios")
    ICAAnswerObject.observaciones=_oData.get("observaciones")
    ICAAnswerObject.userEditor = usuarioEditor
    usuarioEditor=null
    ICAAnswerObject.ObservaLabo = ObservaLaboratorio
    ObservaLaboratorio=null
    ICAAnswerObject.desPunto = descripPunto
    descripPunto=null
    return ICAAnswerObject
}

function syncData(data, refDB) {
    let error = false
    // console.log("[main | syncData] syncData.length: ", data.length)
    data.forEach((element) => {
        refDB.push(element, (error) => {
            if (error) {
                error = true
                alert("Data could not be saved." + error);
            }
            // else {
                // alert("Data saved successfully.");
            // }
        });
    })

    if (error) {
        return alert("Data no se pudo guardar." + error);
    }
    alert("Data guardada exitosamente.");
}

function clearForm() {
    //  https://stackoverflow.com/questions/4431162/get-all-the-elements-of-a-particular-form
    Object.values(document.forms["ica"].getElementsByTagName("input")).forEach(element => {
        element.value = "";
    });
    document.getElementById("comentarios").value = "";
    document.getElementById("observaciones").value = "";
    document.getElementById("desPunto").value = "";
}
//Función para limpiar inputs despues de que ha iniciado sesion.
function limpiarform() {
    Object.values(document.forms["forminiciarSeccion"].getElementsByTagName("input")).forEach(element => {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    });
}

function singOut(){
    $("#btnSingOunt").on('click',function(){
        $("#userToma").empty();
        firebase.auth().signOut().catch(function(error) {
            // An error happened.
            console.log(error);
        });
    })
}

window.addEventListener("load", function() {
    // ica.color.addEventListener("keypress", soloNumeros, false);
    $('.lat').on('input', function () {
        this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
    });
    $('.long').on('input', function () {
        this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
    });
    $('.ph').on('input', function () {
        this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');;

    });
    $('.validate').on('input', function () {
        this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');;
    });
    $("#divformulario").hide();
    
  
});

function validar(){
    var lat = document.getElementById('lat').value;
    var long = document.getElementById('long').value;
    var comentarios = document.getElementById('comentarios').value;
    var desPunto = document.getElementById('desPunto').value;
    var ph = document.getElementById('ph').value;

    if(lat === undefined ){
        $("#send-div").hide();
        // if(long == undefined ){
        //     if(comentarios == undefined ){
        //         if(desPunto == undefined ){
        //             $("#send-div").hide();
        //         }
        //     }
        // }
    }
    else{
        $("#send-div").show();
    }
}

module.exports = {
    serviceWorkerRegister,
    initFirebase,
    sendFormData
}