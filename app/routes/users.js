const UsersCtrl = fw.getController('users');

module.exports = [{
        method: 'GET',
        path: '/user',
        options: {
            handler: UsersCtrl.getUsers,
            tags: ['api'],
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/user/{id}',
        options: {
            handler: UsersCtrl.getUserById,
            tags: ['api'],
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/user',
        options: {
            handler: UsersCtrl.addUser,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    password: fw.param.string().required(),
                    email: fw.param.string().required(),
                    roleid: fw.param.number().required()
                }
            }
        },
    },
    {
        method: 'PUT',
        path: '/user/{id}',
        options: {
            handler: UsersCtrl.editUser,
            tags: ['api'],
            validate: {
                payload: {
                    email: fw.param.string().email().required(),
                    roleid: fw.param.number().required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        options: {
            handler: UsersCtrl.deleteUserById,
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/users/add',
        options: {
            handler: UsersCtrl.addUser,

            validate: {
                payload: {
                    name: fw.param.string().required(),
                    password: fw.param.string().required(),
                    email: fw.param.string().required(),
                    roleid: fw.param.number().required()
                }
            }
        },
    },
    {
        method: 'POST',
        path: '/users/edit',
        options: {
            handler: UsersCtrl.editUser,

            validate: {
                payload: {
                    userid: fw.param.number().required(),
                    email: fw.param.string().email().required(),
                    roleid: fw.param.number().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/users/delete',
        options: {
            handler: UsersCtrl.deleteUser,

            validate: {
                payload: {
                    userid: fw.param.number().required(),
                }
            }
        }
    }
];