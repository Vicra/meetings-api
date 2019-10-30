//====================
// Dependencies
//====================
const eventsService = fw.getService('events');

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

module.exports = 
{
    addEvent : addEvent
}