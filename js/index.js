const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cbinancecoin%2Ctether%2Csolana%2Cripple%2Ccardano%2Clitecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false"
let precios = [1];

// funcion para cargar precios desde la api
function cargarPrecios(precios, callback){
    $.get(URL, function (respuesta, estado) {
        if(estado === "success") {
            let misDatos = respuesta;
            for (const dato of misDatos){
                precios.push(parseFloat(dato.current_price));
            }
        }
        callback();
    });
}

// función para cargar en un select las monedas
function cargarMonedas(monedas,select){
    for (let i = 0; i < monedas.length; i++){
        select.append(new Option(monedas[i].nombre, i));
    }
}

function readyFunction(){
    cargarPrecios(precios, function() {
    // creo las monedas
    const usd = new Moneda("USD",precios[0]);
    const btc = new Moneda("BTC",precios[1]);
    const eth = new Moneda("ETH",precios[2]);
    const usdt = new Moneda("USDT",precios[3]);
    const bnb = new Moneda("BNB",precios[4]);
    const sol = new Moneda("SOL",precios[5]);
    const xrp = new Moneda("XRP",precios[6]);
    const ada = new Moneda("ADA",precios[7]);
    const ltc = new Moneda("LTC",precios[8]);
    let monedas = [usd,btc,eth,usdt,bnb,sol,xrp,ada,ltc];
    // cargo los select
    let select = $('.select');
    cargarMonedas(monedas,select[0]);
    cargarMonedas(monedas,select[1]);
    // creo y recupero el historial
    let historial = new Historial();
    historial.recuperar();
    // traigo los botones y uso el evento click
    $('#boton-convertir').on('click',(event) => {
        event.preventDefault();
        let cantidad = $('#numero').val();
        let moneda1 = $('#moneda1').find(":selected").val();
        let moneda2 = $('#moneda2').find(":selected").val();
        let conversion = new Conversion(cantidad,monedas[moneda1],monedas[moneda2]);
        historial.agregarConversion(conversion);
        $('#boton-limpiar-historial').show();
    })
    $('#boton-limpiar-historial').on('click', () => {
        $('#conversiones').empty();
        localStorage.removeItem("historial");
        historial.vaciar();
        $('#boton-limpiar-historial').hide();
    })
    //animaciones
    $('#card').slideDown(800,() =>{
        for(let i = 0; i < 5; i++) {
            $('#card').animate({marginTop: '-=40px'}, 800)
                .animate({marginTop: '+=40px'}, 800);
        }    
    });
    // actualizo los precios cada 30 segundos
    setInterval(() => {
        $.get(URL, function (respuesta, estado) {
            if(estado === "success") {
                let misDatos = respuesta;
                for (let i=0; i < 8; i++){
                    monedas[i+1].setPrecio(parseFloat(misDatos[i].current_price));
                }
            }
        });
    }, 30000);
    });
}
$('#card').hide();
if (localStorage.length === 0) {
    $('#boton-limpiar-historial').hide();
}
let fecha = new Date;
$(document).ready(readyFunction);