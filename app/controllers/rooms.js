//====================
// Dependencies
//====================
const roomsService = fw.getService('rooms');
const rolesService = fw.getService('roles');

function addRoom(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const room = await roomsService.getRoomByName(request.payload.name);
        if(room.length > 0)
        {
            stResponse.message = "Room already exist";
            resolve(stResponse);
            return;
        }

        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description,
            peopleCount: request.payload.peopleCount,
            articles: request.payload.articles
        }
    
        await roomsService.addRoom(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}


function editRoom(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const room = await roomsService.getRoom(request.params.id);
        if(room.length != 1)
        {
            stResponse.message = "Room does not exist";
            resolve(stResponse);
            return;
        }

        //Make sure he is not adding an already existing email
        if(request.payload.name != room[0].name)
        {
            const roomExist = await roomsService.getRoomByName(request.payload.name);
            if(roomExist.length > 0)
            {
                stResponse.message = "Meeting name is already in use.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description,
            peopleCount: request.payload.peopleCount,
            id: request.params.id,
            articles: request.payload.articles
        }
        await roomsService.updateRoom(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteRoom(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const room = await roomsService.getRoom(request.payload.id);
        if(room.length != 1)
        {
            stResponse.message = "Room does not exist";
            resolve(stResponse);
            return;
        }

        await roomsService.deleteRoom(request.payload.id);
        stResponse.success = true;
        resolve(stResponse);        
    });
}

function getRooms(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        try
        {
            let response = {data:await roomsService.getRooms()};
            resolve(response);
        }
        catch(e)
        {
            let response = { success:false, errorMessage : "Error in server"};
            console.log(response);
            reject(response);
        }
    });  
}

function getRoomById(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        try
        {
            let response = {data:await roomsService.getRoomById(request.params.id)};
            resolve(response);
        }
        catch(e)
        {
            let response = { success:false, errorMessage : "Error in server"};
            console.log(e);
            reject(response);
        }
    });  
}

module.exports = 
{
    addRoom,
    editRoom,
    deleteRoom,
    getRooms,
    getRoomById
}