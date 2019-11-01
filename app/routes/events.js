const EventsCtrl = fw.getController('events');

module.exports = [{
        method: 'GET',
        path: '/event',
        options: {
            handler: EventsCtrl.getEvents,
            tags: ['api'],
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/event/{id}',
        options: {
            handler: EventsCtrl.getEventById,
            tags: ['api'],
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/event',
        options: {
            handler: EventsCtrl.addEvent,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    eventtype: fw.param.number().required(),
                    roomid: fw.param.number().required(),
                    userid: fw.param.number().required(),
                    bookDate: fw.param.string().required(),
                    starttime: fw.param.string().required(),
                    endtime: fw.param.string().required(),
                    guests: fw.param.array().required()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/event/{id}',
        options: {
            handler: EventsCtrl.editEvent,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    eventtype: fw.param.number().required(),
                    roomid: fw.param.number().required(),
                    userid: fw.param.number().required(),
                    bookDate: fw.param.string().required(),
                    starttime: fw.param.string().required(),
                    endtime: fw.param.string().required(),
                    guests: fw.param.array().required()
                }
            }
        },
    }
];