const { createApp } = Vue
const galeria = createApp({
    //DATOS de la aplicacion
    data() {
        // Definimos que devuelve nuestra aplicación
        return {
            indice: 1,//Nro de imagen a mostrar.
            imagen: "/assets/Imagenes/foto" + this.indice + ".png", //Ruta y nombre de la foto.
            ultimaImagen: 7,//Última imágen.
            primeraImagen: 1,//Primera imagen                      
        }
    },
    mounted() {
        //Al cargar la página, muestro la primer imágen
        this.imagen = "/assets/Imagenes/foto" + this.indice + ".png"//Ruta y nombre de la foto
    },
    // Defino metodos:
    methods: {
        imagenSiguiente() {
            //Veo si es la última imagen:
            if (this.indice < this.ultimaImagen) {
                // Paso a la imágen siguiente
                this.indice++     // Nro de imagen a mostrar
            } else {
                this.indice = this.primeraImagen   // Nro de imagen a mostrar
            }
            this.imagen = "/assets/Imagenes/foto" + this.indice + ".png"    // Ruta y nombre de la foto
        },
        imagenAnterior() {
            //Veo si es la primer imagen:
            if (this.indice > this.primeraImagen) {
                // Paso a la imágen anterior
                this.indice--    // Nro de imagen a mostrar
            } else {
                this.indice = this.ultimaImagen   // Nro de imagen a mostrar
            }
            this.imagen = "/assets/Imagenes/foto" + this.indice + ".png"    // Ruta y nombre de la foto
        }

    }
})
galeria.mount('#appgaleria')