const RoomsCtrl = fw.getController('rooms');

module.exports = [{
        method: 'GET',
        path: '/room',
        options: {
            handler: RoomsCtrl.getRooms,
            tags: ['api'],
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/room/{id}',
        options: {
            handler: RoomsCtrl.getRoomById,
            tags: ['api'],
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/room',
        options: {
            handler: RoomsCtrl.addRoom,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    description: fw.param.string().required(),
                    peopleCount: fw.param.number().required(),
                    articles: fw.param.array().required()
                }
            }
        },
    },
    {
        method: 'PUT',
        path: '/room/{id}',
        options: {
            handler: RoomsCtrl.editRoom,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    description: fw.param.string().required(),
                    peopleCount: fw.param.number().required(),
                    articles: fw.param.array().required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/room/{id}',
        options: {
            handler: RoomsCtrl.deleteRoom,
            tags: ['api']
        }
    }
];