const { User } = require('../models/UserModel')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    User.findOne({
        where: {
            correo: request.body.correo,
            contraseña: request.body.contraseña,
            activo: true
        },
        attributes: ['id', 'perfil_id', 'nombre', 'apellidos', 'nick']
    }).then(usuario => {
        if (usuario) {
            const token = jwt.sign({ usuario }, 'mi_llave_secreta', { expiresIn: '24h' });
            response.status(201).json({ message: "Login con éxito", token: token });
        }
        else {
            response.status(401).json({ message: "Sin autorización" });

        }
    })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}


const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    request.body.perfil_id = 2
    request.body.activo = true

    User.create(request.body).then(
        newEntitie => {
            // Excluimos la contraseña de la respuesta para mayor seguridad.
            // Solo se debe enviar UNA respuesta.
            const { contraseña, ...userWithoutPassword } = newEntitie.get({ plain: true });
            response.status(201).json(userWithoutPassword);
        }
    )
        .catch(err => {
            // Solo se debe enviar UNA respuesta en caso de error.
            response.status(500).json({ message: 'Error al crear el usuario', error: err.message });
        })
}

module.exports = {
    login,
    register,
};