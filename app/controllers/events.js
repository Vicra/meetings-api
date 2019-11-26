//====================
// Dependencies
//====================
const eventsService = fw.getService('events');

function getEvents(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {
            data : await eventsService.getEvents()
        };
        resolve(stResponse);
    });    
}

function getEventById(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        if(isNaN(request.params.id))
        {
            let stResponse = {
                success:false,
                message:'Parameter id is not a number'
            };
            resolve(stResponse);
        }

        let stResponse = {
            data: await eventsService.getEventById(request.params.id)
        };
        resolve(stResponse);
    });    
}

function getEventsParticipants(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        if(isNaN(request.params.id))
        {
            let stResponse = {
                success:false,
                message:'Parameter id is not a number'
            };
            resolve(stResponse);
        }

        let stResponse = {
            data: await eventsService.getEventsParticipants(request.params.id)
        };
        resolve(stResponse);
    });    
}



function addEvent(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};

        const Params = 
        {
            name: request.payload.name,
            eventtype: request.payload.eventtype,
            roomid: request.payload.roomid,
            userid: request.payload.userid,
            bookDate: request.payload.bookDate,
            starttime: request.payload.starttime,
            endtime: request.payload.endtime,
            guests: request.payload.guests
        }
    
        await eventsService.addEvent(Params);
        stResponse.success = true;
        resolve(stResponse);
    });    
}

function editEvent(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};

        const Params = 
        {
            id: request.params.id,
            name: request.payload.name,
            eventtype: request.payload.eventtype,
            roomid: request.payload.roomid,
            userid: request.payload.userid,
            bookDate: request.payload.bookDate,
            starttime: request.payload.starttime,
            endtime: request.payload.endtime,
            guests: request.payload.guests
        }

        await eventsService.editEvent(Params);
        stResponse.success = true;
        resolve(stResponse);
    });
}

module.exports = 
{
    getEvents,
    getEventById,
    getEventsParticipants,
    addEvent,
    editEvent
}