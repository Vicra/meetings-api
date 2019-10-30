const EventTypesCtrl = fw.getController('event-types');

module.exports = [{
        method: 'POST',
        path: '/event-type',
        options: {
            handler: EventTypesCtrl.addEventType,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    description: fw.param.string().required()
                }
            }
        },
    },
    {
        method: 'PUT',
        path: '/event-type/{id}',
        options: {
            handler: EventTypesCtrl.editEventType,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    description: fw.param.string().required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/event-type/{id}',
        options: {
            handler: EventTypesCtrl.deleteEventType,
            tags: ['api']
        }
    }
];