//====================
// Dependencies
//====================
const eventTypeService = fw.getService('eventType');

//====================
// Methods
//====================
function getEventTypes(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let response = {data:await eventTypeService.getEventTypes()};
        resolve(response);
    });    
}

function getEventTypeById(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let response = {
            data:await eventTypeService.getEventTypeById(request.params.id)
        };
        resolve(response);
    });    
}


function addEventType(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const eventType = await eventTypeService.getEventTypeByName(request.payload.name);
        if(eventType.length > 0)
        {
            stResponse.message = "Event Type already exist";
            resolve(stResponse);
            return;
        }

        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description
        }
    
        await eventTypeService.addEventType(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}


function editEventType(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const eventType = await eventTypeService.getEventTypeById(request.params.id);
        if(eventType.length != 1)
        {
            stResponse.message = "Event Type does not exist";
            resolve(stResponse);
            return;
        }

        if(request.payload.name != eventType[0].name)
        {
            const eventTypeExists = await eventTypeService.getEventTypeByName(request.payload.name);
            if(eventTypeExists.length > 0 && eventTypeExists.name == request.payload.name)
            {
                stResponse.message = "Event Type name is already in use.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description,
            id: request.params.id
        }
    
        await eventTypeService.updateEventType(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteEventType(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const eventType = await eventTypeService.getEventTypeById(request.payload.id);
        if(eventType.length != 1)
        {
            stResponse.message = "EventType does not exist";
            resolve(stResponse);
            return;
        }

        await eventTypeService.deleteEventType(request.payload.id);
        stResponse.success = true;
        resolve(stResponse);        
    });    
}

module.exports = 
{
    getEventTypes,
    getEventTypeById,
    addEventType,
    editEventType,
    deleteEventType
}