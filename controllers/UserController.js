const { User } = require('../models/UserModel')
const { Profile } = require('../models/ProfileModel')
const { validationResult } = require('express-validator');


const relations = 
[
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
]

const get = (request, response) => {
    const { nombre, apellidos, nick } = request.query
    const filters = {}

    if (nombre) {
        filters.nombre = nombre
    }
    if (apellidos) {
        filters.apellidos = apellidos
    }
    if (nick) {
        filters.nick = nick
    }

    User.findAll({
        where: filters,
        include: relations
    })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.log(err)
            response.status(500).send('Error consultando los datos');
        })
}


const getById = (request, response) => {
    const id = request.params.id;
    User.findByPk(id, {
        include: relations
    })

        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            }
            else {
                response.status(404).send('Recurso no encontrado')
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}

const create = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.mapped() });
    }

    try {
        // 1. Mapeamos el campo 'password' de la petición a 'contraseña' para el modelo.
        const { password, email, ...restOfBody } = request.body;
        const newUser = await User.create({
            ...restOfBody,
            contraseña: password,
            correo: email
        });

        // 2. Respondemos con el usuario creado, pero sin incluir la contraseña.
        // También excluimos el correo para ser consistentes, aunque no es un dato sensible como la contraseña.
        const { contraseña, correo, ...userWithoutPassword } = newUser.get({ plain: true });
        response.status(201).json(userWithoutPassword);
    } catch (err) {
        console.error(err);
        response.status(500).json({ message: 'Error al crear el usuario.', error: err.message });
    }
}

const update = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.mapped() });
    }

    const id = request.params.id;
    User.update(
        request.body
        ,
        {
            where: {
                id: id
            }
        })
        .then(numRowsUpdated => {
            response.status(200).send(`${numRowsUpdated} registro actualizado`);
        })
        .catch(err => {
            response.status(500).send('Error al actualizar');
        });
}

const destroy = (request, response) => {
    const id = request.params.id;
    User.destroy(
        {
            where: {
                id: id
            }
        }
    ).then(numRowsDeleted => {
        response.status(200).send(`${numRowsDeleted} registro eliminado`);
    })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        });
}

module.exports = {
    get,
    getById,
    create,
    update,
    destroy
};