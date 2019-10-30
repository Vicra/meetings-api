//====================
// Dependencies
//====================
const usersService = fw.getService('user');
const rolesService = fw.getService('roles');

//====================
// Methods
//====================
function addUser(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const user = await usersService.getUserbyEmail(request.payload.email);
        if(user.length > 0)
        {
            stResponse.message = "User already exist";
            resolve(stResponse);
            return;
        }


        const salt = fw.utils.getUUID();
        const hashPassword = fw.utils.getMD5(request.payload.password + salt);

        const Params = 
        {
            name: request.payload.name,
            password: hashPassword,
            salt: salt,
            email: request.payload.email, 
            roleid: request.payload.roleid
        }
    
        await usersService.addUser(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}


function editUser(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const user = await usersService.getUser(request.params.id);
        if(user.length != 1)
        {
            stResponse.message = "User does not exist";
            resolve(stResponse);
            return;
        }

        //Make sure he is not adding an already existing email
        if(request.payload.email != user[0].email)
        {
            const userExist = await usersService.getUserbyEmail(request.payload.email);
            if(userExist.length > 0)
            {
                stResponse.message = "Email account is already linked to another user. Please use another email address.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            email: request.payload.email, 
            roleid: request.payload.roleid, 
            id: request.params.id
        }
    
        await usersService.updateUser(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteUser(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const user = await usersService.getUser(request.payload.userid);
        if(user.length != 1)
        {
            stResponse.message = "User does not exist";
            resolve(stResponse);
            return;
        }

        await usersService.deleteUser(request.payload.userid);
        stResponse.success = true;
        resolve(stResponse);        
    });    
}

function getUsers(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        console.log(request);
        let response = {data:await usersService.getUsers()};
        resolve(response);
    });  
}

function getUserById(request,h)
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
        const users = await usersService.getUser(request.params.id);
        resolve(users);
    }); 
}

function editUserById(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        if(isNaN(request.params.id))
        {
            let stResponse = {success:false,message:'Parameter id is not a number'};
            resolve(stResponse);
        }
        
        const user = await usersService.getUser(request.params.id);
        if(user.length != 1)
        {
            stResponse.message = "User does not exist";
            resolve(stResponse);
            return;
        }

        //Make sure he is not adding an already existing email
        if(request.payload.email != user[0].email)
        {
            const userExist = await usersService.getUserbyEmail(request.payload.email);
            if(userExist.length > 0)
            {
                stResponse.message = "Email account is already linked to another user. Please use another email address.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            email: request.payload.email, 
            roleid: request.payload.roleid, 
            id: request.params.id
        }
    
        await usersService.updateUser(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    }); 
}

function deleteUserById(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        if(isNaN(request.params.id))
        {
            stResponse = {success:false,message:'Parameter id is not a number'};
            resolve(stResponse);
        }

        const user = await usersService.getUser(request.params.id);
        if(user.length != 1)
        {
            stResponse.message = "User does not exist";
            resolve(stResponse);
            return;
        }

        await usersService.deleteUser(request.params.id);
        stResponse.success = true;
        resolve(stResponse);
    });
}

module.exports = 
{
    addUser,
    editUser,
    deleteUser,
    getUsers,
    getUserById,
    editUserById,
    deleteUserById
}