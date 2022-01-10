class Moneda{
    constructor(nombre,precio){
        this.nombre = nombre;
        this.precio = precio;
    }
    getPrecio(){
        return this.precio;
    }
    getNombre(){
        return this.nombre;
    }
    setPrecio(unPrecio){
        this.precio = unPrecio;
    }
    precioEnDolaresDeCantidad(cantidad){
        return cantidad * this.getPrecio();
    }
    cantidadConDolares(dolares){
        return dolares /this.getPrecio();
    }
    convertir(moneda,cant){
        return moneda.cantidadConDolares(this.precioEnDolaresDeCantidad(cant));
    }
}

class Conversion{
    constructor(cantA,monedaA,monedaB){
        this.cantA = cantA;
        this.monedaA = monedaA;
        this.cantB = monedaA.convertir(monedaB,cantA);
        this.monedaB = monedaB;
        this.fecha = new Date;
    }
    toString(){
        return (this.cantA + " " + this.monedaA.getNombre() + " son " + this.cantB + " "+ this.monedaB.getNombre()+ " "+ this.fecha.toLocaleDateString()+" "+this.fecha.toLocaleTimeString());
    }
}

class Historial{
    constructor(){
        this.conversiones = [];
        this.listaHTML = $("#conversiones");
    }
    agregarConversion(conversion){
        this.conversiones.push(conversion);
        this.mostrar(conversion);
        let enJSON = JSON.stringify(this.conversiones);
        localStorage.setItem("historial", enJSON);
    }
    mostrar(conversion){
        $('#conversiones').append(`<li>${conversion.toString()}</li>`);
    }
    getConversiones(){
        return this.conversiones;
    }
    recuperar(){
        if (localStorage.getItem('historial') !== null) {
            this.conversiones = JSON.parse(localStorage.getItem('historial'));
            for (let i = 0; i < this.conversiones.length; i++){
                this.mostrarJSON(this.conversiones[i]);
            }
        }
    }
    mostrarJSON(conversionJSON){
        let fecha = new Date(conversionJSON.fecha);
        let string = conversionJSON.cantA + " " + conversionJSON.monedaA.nombre + " son " + conversionJSON.cantB + " "+ conversionJSON.monedaB.nombre+" "+fecha.toLocaleDateString()+" "+fecha.toLocaleTimeString();
        $('#conversiones').append(`<li> ${string} </li>`);
    }
    vaciar(){
        this.conversiones = [];
    }
}