//====================
// Methods
//====================
async function validLogin(email, password)
{
    const SQL = 
    `SELECT * FROM Users
    WHERE UPPER(Email) = ?`;
    let Account = await fw.db.execute('local',SQL,[`${email.toUpperCase()}`]);
    
    if(Account.length > 0)
    {        
        Account = Account[0];
        if(fw.utils.getMD5(password+Account.salt) == Account.password)
            return Account;
    }
        
    return false;
}

async function getUsers()
{
    const SQL = 
    `SELECT Users.name, Users.id, Users.email,  Roles.name as role FROM Users
    INNER JOIN Roles ON Users.role_id = Roles.id`;
    return await fw.db.execute('local',SQL);
}

async function getUserbyEmail(email)
{
    const SQL = 
    `SELECT * FROM Users
    WHERE UPPER(Email) = ?`;
    var user = await fw.db.execute('local',SQL,[`${email.toUpperCase()}`]);

    if (user.length) {
        return user[0];
    }
    return user;
}

async function getUser(id)
{
    const SQL = 
    `SELECT Users.*, Roles.name as role FROM Users
    INNER JOIN Roles ON Users.role_id = Roles.id
    WHERE Users.id = ?`;
    var user = await fw.db.execute('local',SQL,[id]);
    if (user.length) {
        return user[0];
    }
    return user;
}

async function addUser(data)
{
    const SQL = 
    `INSERT INTO Users(name,email,password,role_id,salt)
    VALUES
    (?,?,?,?,?)`;
    return await fw.db.execute('local',SQL,
    [
        data.name,
        data.email, 
        data.password,
        data.roleid,
        data.salt
    ]);
}

async function updateUser(data)
{
    const SQL = 
    `UPDATE Users
    SET email = ?,
    role_id = ?
    WHERE id = ?`;
    return await fw.db.execute('local',SQL,
    [
        data.email, 
        data.roleid,
        data.id
    ]);
}

async function deleteUser(id)
{
    const SQL = 
    `DELETE FROM Users
    WHERE ID = ?`;
    return await fw.db.execute('local',SQL,[id]);
}

module.exports = 
{
    validLogin,
    getUsers,
    getUser,
    getUserbyEmail,
    addUser,
    updateUser,
    deleteUser
}