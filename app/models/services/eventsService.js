//====================
// Methods
//====================
async function getEvents()
{
    const SQL = 
    `
    select 
        e.id, 
        e.room_id, 
        e.name, 
        DATE_FORMAT(e.start_time, '%Y-%m-%d %T') as start_time, 
        DATE_FORMAT(e.end_time, '%Y-%m-%d %T') as end_time, 
        e.user_id,
        e.event_type_id
    from Events e
    `;
    return await fw.db.execute('local',SQL);
}

async function getEventById(id)
{
    const SQL = 
    `
    select 
        e.id, 
        e.room_id, 
        e.name, 
        DATE_FORMAT(e.start_time, '%Y-%m-%d %T') as start_time, 
        DATE_FORMAT(e.end_time, '%Y-%m-%d %T') as end_time, 
        u.name as owner, 
        e.event_type_id
    from Events e
    inner join Users u on u.id = e.user_id
    where e.id = ?
    `;
    return await fw.db.execute('local',SQL, [id]);
}

async function getEventsParticipants(id)
{
    const SQL =
    `
    SELECT u.id, u.name
    FROM Events e
    INNER JOIN Events_Participants ep on ep.event_id = e.id
    INNER JOIN Users u on u.id = ep.user_id
    WHERE e.id = ?
    `;
    return await fw.db.execute('local',SQL, [id]);
}

async function getUpcomingEvents()
{
    const SQL = 
    `SELECT r.name AS 'Room', 
        e.id AS 'EventId', 
        e.name AS 'Event', 
        DATE_FORMAT(e.start_time, '%Y-%m-%d %T') AS 'StartTime', 
        DATE_FORMAT(e.end_time, '%Y-%m-%d %T') AS 'EndTime', 
        u.name AS 'Organizer', 
        et.name AS 'EventType'
    FROM Events e
    INNER JOIN Rooms r ON r.id = e.room_id
    INNER JOIN Users u ON u.id = e.user_id
    INNER JOIN EventTypes et ON et.id = e.event_type_id
    WHERE e.start_time > SYSDATE()
    ORDER BY e.start_time ASC`;
    return await fw.db.execute('local',SQL);
}

async function getTodayEvents()
{
    const SQL = 
    `SELECT r.name AS 'Room', 
        e.id AS 'EventId', 
        e.name AS 'Event', 
        DATE_FORMAT(e.start_time, '%Y-%m-%d %T') AS 'StartTime', 
        DATE_FORMAT(e.end_time, '%Y-%m-%d %T') AS 'EndTime', 
        u.name AS 'Organizer', 
        et.name AS 'EventType'
    FROM Events e
    INNER JOIN Rooms r ON r.id = e.room_id
    INNER JOIN Users u ON u.id = e.user_id
    INNER JOIN EventTypes et ON et.id = e.event_type_id
    WHERE DATE(e.start_time) = DATE(NOW())
    ORDER BY e.start_time ASC`;
    return await fw.db.execute('local',SQL);
}

async function getTodayEventsByRoom(id)
{
    const SQL = 
    `SELECT
        e.id AS 'EventId', 
        e.name AS 'Event', 
        DATE_FORMAT(e.start_time, '%Y-%m-%d %T') AS 'StartTime', 
        DATE_FORMAT(e.end_time, '%Y-%m-%d %T') AS 'EndTime', 
        u.name AS 'Organizer', 
        et.name AS 'EventType'
    FROM Events e
    INNER JOIN Rooms r ON r.id = e.room_id
    INNER JOIN Users u ON u.id = e.user_id
    INNER JOIN EventTypes et ON et.id = e.event_type_id
    WHERE DATE(e.start_time) = DATE(NOW())
    AND r.id = ?
    ORDER BY e.start_time ASC`;
    return await fw.db.execute('local',SQL, [id]);
}

async function addEvent(data)
{
    const insertEventSQL = 
    `INSERT INTO Events (room_id,
        name,
        start_time,
        end_time,
        user_id,
        event_type_id)
    VALUES (?,?,?,?,?,?)`;
    var response = await fw.db.execute('local',insertEventSQL,
    [
        data.roomid,
        data.name,
        data.bookDate + " " + data.starttime + ":00",
        data.bookDate + " " + data.endtime + ":00",
        data.userid,
        data.eventtype
    ]);

    for (var i = 0; i < data.guests.length; i++) {
        const insertParticipantSQL = 
        `INSERT INTO Events_Participants
            (event_id,
            user_id,
            confirm_attendance)
        VALUES
        (?,?,?)`;

        await fw.db.execute('local',insertParticipantSQL,
        [
            response.insertId,
            data.guests[i],
            "no"
        ]);
    }
    return response;
}

// pendiente implementacion
async function editEvent(data)
{
    const updateEventSQL = `
        UPDATE Events
        SET room_id = ?,
            name = ?,
            start_time = ?,
            end_time = ?,
            event_type_id = ?
        WHERE id = ?`;
    
    var response = await fw.db.execute('local',updateEventSQL,
    [
        data.roomid,
        data.name,
        data.bookDate + " " + data.starttime + ":00",
        data.bookDate + " " + data.endtime + ":00",
        data.eventtype,
        data.id
    ]);

    //borrar participantes
    await fw.db.execute('local',`delete from Events_Participants where event_id = ?`, [data.id]);

    for (var i = 0; i < data.guests.length; i++) {
        const insertParticipantSQL = 
        `INSERT INTO Events_Participants
            (event_id,
            user_id,
            confirm_attendance)
        VALUES
        (?,?,?)`;

        await fw.db.execute('local',insertParticipantSQL,
        [
            data.id,
            data.guests[i],
            "no"
        ]);
    }
    return response;
}

module.exports = 
{
    getEvents,
    getEventById,
    getEventsParticipants,
    getUpcomingEvents,
    getTodayEvents,
    getTodayEventsByRoom,
    addEvent,
    editEvent
}