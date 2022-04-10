var exports = module.exports = {}

exports.get_clients_by_room = async function(io, roomId, namespace) {
    let sockets = await io.in(roomId).fetchSockets();
    sockets.forEach(socket => {
        console.log(socket.emit('publicOnlineClients', 'some thing'))
    });

}


exports.findClientsSocket = async function(io, roomName, socket_reciver) {
        var res = [];
        let sockets = await io.in(roomName).fetchSockets()
        return sockets;

    }
    // exports.findClientsSocket = async function(io, roomName, socket_reciver) {
    //     var res = [];
    //     let sockets = await io.in(roomName).fetchSockets()
    //     if (sockets.length) {
    //         sockets.forEach((socket) => {
    //             console.log(socket.id)
    //             socket.emit('publicMessage', socket.id)

//         })
//     }

// }