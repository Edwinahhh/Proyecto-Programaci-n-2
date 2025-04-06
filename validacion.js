const form = document.getElementById('form');
const entrada_primer_nombre = document.getElementById('entrada-primer-nombre');
const entrada_email = document.getElementById('entrada-email');
const entrada_contraseña = document.getElementById('entrada-contraseña');
const entrada_repetir_contraseña = document.getElementById('entrada-repetir-contraseña');
const mensaje_error = document.getElementById('mensaje-error')

form.addEventListener('submit', (e) => {
    let errors = [];

    if (entrada_primer_nombre) {
        errors = getSignUpFormErrors(
            entrada_primer_nombre.value,
            entrada_email.value,
            entrada_contraseña.value,
            entrada_repetir_contraseña.value
        );
    } else {
        errors = getLoginFormErrors(entrada_email.value, entrada_contraseña.value);
    }

    if (errors.length > 0) {
        e.preventDefault();
        mensaje_error.innerText = errors.join(" - ")
    }
});

function getSignUpFormErrors(primerNombre, email, contraseña, repetirContraseña) {
    let errors = [];


    if (primerNombre.trim() === '') {
        errors.push('El primer nombre es obligatorio');
        entrada_primer_nombre.parentElement.classList.add('incorrect');
    } else {
        entrada_primer_nombre.parentElement.classList.remove('incorrect');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('El correo electrónico no es válido');
        entrada_email.parentElement.classList.add('incorrect');
    } else {
        entrada_email.parentElement.classList.remove('incorrect');
    }

    if (contraseña.trim() === '') {
        errors.push('La contraseña es obligatoria');
        entrada_contraseña.parentElement.classList.add('incorrect');
    } else {
        entrada_contraseña.parentElement.classList.remove('incorrect');
    }

    if (contraseña !== repetirContraseña) {
        errors.push('Las contraseñas no coinciden');
        entrada_contraseña.parentElement.classList.add('incorrect');
        entrada_repetir_contraseña.parentElement.classList.add('incorrect');
    } else {
        entrada_repetir_contraseña.parentElement.classList.remove('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, contraseña){
    let errors = []


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('El correo electrónico no es válido');
        entrada_email.parentElement.classList.add('incorrect');
    } else {
        entrada_email.parentElement.classList.remove('incorrect');
    }

    if (contraseña.trim() === '') {
        errors.push('La contraseña es obligatoria');
        entrada_contraseña.parentElement.classList.add('incorrect');
    } else {
        entrada_contraseña.parentElement.classList.remove('incorrect');
    }

    return errors;
}