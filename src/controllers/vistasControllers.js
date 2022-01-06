module.exports = {
    renderQuienesSomos: (req, res) => {
        res.render('quienesSomos', {title: "Domino | ¿Quienes somos?"});
    },
    renderTerminos: (req, res) => {
        res.render('terminos', {title: "Domino | Terminos y Condiciones"});
    },
    renderContacto: (req, res) => {
        res.render('contacto', {title: "Domino | Contacto"});
    },
    renderPreguntas: (req, res) => {
        res.render('preguntas', {title: "Domino | FAQ"});
    },
    renderCambios: (req, res) => {
        res.render('cambios', {title: "Domino | Sobre cambios..."});
    },
    renderCompra: (req, res) => {
        res.render('compra', {title: "Domino | Como comprar"});
    },
    renderEnvios: (req, res) => {
        res.render('envios', {title: "Domino | Envios"});
    }
}