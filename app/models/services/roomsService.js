//====================
// Dependencies
//====================
const eventsService = fw.getService('events');

//====================
// Methods
//====================
async function getRooms()
{
    const SQL = 
    `SELECT * FROM Rooms`;
    return await fw.db.execute('local',SQL);
}

async function getRoomByName(name)
{
    const SQL = 
    `SELECT * FROM Rooms
    WHERE UPPER(name) = ?`;
    return await fw.db.execute('local',SQL,[`${name.toUpperCase()}`]);
}

async function getRoomById(id)
{
    const SQL = 
    `SELECT * FROM Rooms WHERE id = ?`;
    return await fw.db.execute('local',SQL,[id]);
}

async function addRoom(data)
{
    const SQL = 
    `INSERT INTO Rooms(name, description, people_count, image)
    VALUES
    (?,?,?,?)`;
    var databaseResponse = await fw.db.execute('local',SQL,
    [
        data.name,
        data.description,
        data.peopleCount,
        "", //image path
    ]);

    for (let index = 0; index < data.articles.length; index++) {
        const articleId = data.articles[index].articleid;
        const amountArticles = data.articles[index].amount;
        
        const SQL = 
        `INSERT INTO Rooms_Articles(room_id, article_id, amount)
        VALUES
        (?,?,?)`;
        await fw.db.execute('local',SQL,[databaseResponse.insertId, articleId, amountArticles]);
    }
    return databaseResponse;
}

async function updateRoom(data)
{
    const updateRoomSQL = 
    `UPDATE Rooms
    SET name = ?,
    description = ?,
    people_count = ?,
    image = ?
    WHERE ID = ?`;
    
    await fw.db.execute('local',updateRoomSQL,
    [
        data.name, 
        data.description, 
        data.peopleCount, 
        "", //image path
        data.id
    ]);

    //delete all existing articles linked to the room
    const deleteSQL = 
    `DELETE FROM Rooms_Articles
    WHERE room_id = ?`;
    await fw.db.execute('local',deleteSQL,
    [
        data.id
    ]);
    
    //insert new articles linked to the room, in case there are any
    for (let index = 0; index < data.articles.length; index++) {
        const articleId = data.articles[index].articleid;
        const amountArticles = data.articles[index].amount;
        
        const insertSQL = 
        `INSERT INTO Rooms_Articles(room_id, article_id, amount)
        VALUES
        (?,?,?)`;
        await fw.db.execute('local',insertSQL,
        [
            data.id, 
            articleId, 
            amountArticles
        ]);
    }
}

async function deleteRoom(id)
{
    const deleteSQL = 
    `DELETE FROM Rooms_Articles
    WHERE room_id = ?`;
    await fw.db.execute('local',deleteSQL,
    [
        id
    ]);

    // delete room
    const deleteRoomSQL = 
    `DELETE FROM Rooms
    WHERE ID = ?`;
    await fw.db.execute('local',deleteRoomSQL,[id]);
    return;
}

async function hasArticles(data)
{
    const SQL = 
    `SELECT * 
    FROM Rooms_Articles 
    WHERE room_id = ?`;
    var response = await fw.db.execute('local',SQL,[id]);
    return (response.length) ? true : false;
}

async function getTodayDashboard()
{
    var rooms = await getRooms();
    var todayEvents = await eventsService.getTodayEvents();
    var returnObject = [];
    for (var i = 0; i < rooms.length; i++) {
        for (var j = 0; j < todayEvents.length; j++) {
            if(todayEvents[j].room == rooms[i].name){

                returnObject.push(
                    {
                        name: rooms[i].name,
                        event:""
                    }
                );
            }
        }
    }
    return returnObject;
    // return [
    //     {
    //         name: "roomName",
    //         events: [
    //             {
    //                 name: "eventName",
    //                 starttime: "7:00",
    //                 endtime: "8:05",
    //                 eventType: "event-1"
    //             },
    //             {
    //                 name: "eventName2",
    //                 starttime: "8:15",
    //                 endtime: "9:00",
    //                 eventType: "event-2"
    //             }
    //         ]
    //     },
    //     {
    //         name: "roomName2",
    //         events: [
    //             {
    //                 name: "eventName3",
    //                 starttime: "8:00",
    //                 endtime: "9:00",
    //                 eventType: "event-3"
    //             },
    //             {
    //                 name: "eventName4",
    //                 starttime: "10:00",
    //                 endtime: "11:00",
    //                 eventType: "event-4"
    //             }
    //         ]
    //     }
    // ];
}

module.exports = 
{
    getRooms,
    getRoomById,
    getRoomByName,
    addRoom,
    updateRoom,
    deleteRoom,
    hasArticles,
    getTodayDashboard
}