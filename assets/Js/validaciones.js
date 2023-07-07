//--------------Validación del formulario de contacto ON SUBMIT.--------------
function validacionContacto() {

    var contactoNombre = document.getElementById("nombre").value.trim()
    var contactoEmail = document.getElementById("email").value.trim()
    var contactoTelefono = document.getElementById("telefono").value.trim()
    var contactoAsunto = document.getElementById("asunto").value.trim()
    var contactoMensaje = document.getElementById("mensaje").value.trim()


    //Validación de que estén todos los campos completados
    if (contactoNombre === "" || contactoEmail === "" || contactoTelefono === "" || contactoAsunto === "" || contactoMensaje === "") {
        alert("Por favor, complete todos los campos del formulario.");
        return false;
    }
    //Validación de caracteres del nombre
    for (let i = 0; i < contactoNombre.length; i++) {
        let charCode = contactoNombre.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
            alert("El campo 'Nombre' solo puede contener caracteres alfabéticos y espacios.");
            return false;
        }
    }
    //Validación de que el campo "Teléfono" sean sólo números
    for (let i = 0; i < contactoTelefono.length; i++) {
        let charCode = contactoTelefono.charCodeAt(i);
        if (!(charCode >= 48 && charCode <= 57)) {
            alert("El campo 'Teléfono' solo puede contener caracteres numéricos.");
            return false;
        }
    }
}
//--------------Validación del formulario de reserva ON SUBMIT.--------------
function validacionReserva() {

    var reservaNombre = document.getElementById("nombre-r").value.trim()
    var reservaEmail = document.getElementById("email-r").value.trim()
    var reservaTelefono = document.getElementById("telefono-r").value.trim()
    var reservaCantidad = document.getElementById("cantidad-r").value.trim()
    var reservaPeticion = document.getElementById("peticion-r").value.trim()


    //Validación de que estén todos los campos completados
    if (reservaNombre === "" || reservaEmail === "" || reservaTelefono === "" || reservaCantidad === "") {
        alert("Por favor, complete todos los campos obligatorios del formulario del formulario.");
        return false;
    }
    //Validación de caracteres del nombre
    for (let i = 0; i < reservaNombre.length; i++) {
        let charCode = reservaNombre.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
            alert("El campo 'Nombre' solo puede contener caracteres alfabéticos y espacios.");
            return false;
        }
    }
    //Validación de que el campo "Teléfono" sean sólo números
    for (let i = 0; i < reservaTelefono.length; i++) {
        let charCode = reservaTelefono.charCodeAt(i);
        if (!(charCode >= 48 && charCode <= 57)) {
            alert("El campo 'Teléfono' solo puede contener caracteres numéricos.");
            return false;
        }
    }

    if (reservaCantidad > 10) {
        alert("No se puede realizar una reserva para más de 10 personas")
        return false
    }
}

// Validación del formulario EN TIEMPO REAL con VUE.js
const { createApp } = Vue
const appFormContacto = createApp({
    // Datos de la aplicacion
    data() {
        return {
            nombre: null,//Se obtiene con v-model.
            clase: null,//Se asigna con v-bind.
            correo: null,//Se obtiene con v-model.
            claseCorreo: null,//Se asigna con v-bind.
            telefono: null,//Se obtiene con v-model.
            claseTelefono: null,//Se asigna con v-bind.
            nombreR: null,//Se obtiene con v-model.
            claseR: null,//Se asigna con v-bind.
            correoR: null,//Se obtiene con v-model.
            claseCorreoR: null,//Se asigna con v-bind.
            telefonoR: null,//Se obtiene con v-model.
            claseTelefonoR: null//Se asigna con v-bind.
        }
    },
    methods: {
        validacionNombre() {
            for (let i = 0; i < (this.nombre).length; i++) {
                let charCode = (this.nombre).charCodeAt(i);
                if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                    this.clase = "nombre-falso"
                    this.nombre = "El nombre no debe contener caracteres especiales ni numéricos"
                }
            }
        },
        restablecimientoNombre() {
            this.nombre = null
            this.clase = null
        },
        validacionCorreo() {
            if ((this.correo).match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            } else {
                this.claseCorreo = "nombre-falso"
                this.correo = "Por favor introduzca una dirección de correo electrónico válida"
            }
        },
        restablecimientoCorreo() {
            this.correo = null
            this.claseCorreo = null
        },
        validacionTelefono() {
            for (let i = 0; i < (this.telefono).length; i++) {
                let charCode = (this.telefono).charCodeAt(i);
                if (!(charCode >= 48 && charCode <= 57)) {
                    this.claseTelefono = "nombre-falso"
                    this.telefono = "El teléfono debe contener únicamente caracteres numéricos"
                }
            }
        },
        restablecimientoTelefono() {
            this.telefono = null
            this.claseTelefono = null
        },
        validacionNombreR() {
            for (let i = 0; i < (this.nombreR).length; i++) {
                let charCode = (this.nombreR).charCodeAt(i);
                if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                    this.claseR = "nombre-falso"
                    this.nombreR = "El nombre no debe contener caracteres especiales ni numéricos"
                }
            }
        },
        restablecimientoNombreR() {
            this.nombreR = null
            this.claseR = null
        },
        validacionCorreoR() {
            if ((this.correoR).match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            } else {
                this.claseCorreoR = "nombre-falso"
                this.correoR = "Por favor introduzca una dirección de correo electrónico válida"
            }
        },
        restablecimientoCorreoR() {
            this.correoR = null
            this.claseCorreoR = null
        },
        validacionTelefonoR() {
            for (let i = 0; i < (this.telefonoR).length; i++) {
                let charCode = (this.telefonoR).charCodeAt(i);
                if (!(charCode >= 48 && charCode <= 57)) {
                    this.claseTelefonoR = "nombre-falso"
                    this.telefonoR = "El teléfono debe contener únicamente caracteres numéricos"
                }
            }
        },
        restablecimientoTelefonoR() {
            this.telefonoR = null
            this.claseTelefonoR = null
        }

    }
}
)
appFormContacto.mount("#app")