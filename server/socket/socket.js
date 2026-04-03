const { addUsers, removeUsers, searchUsers}  = require('./userHandler')


const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connect : Id ', socket.id);

        // when user leave the socket
        socket.on('disconnect', () => {
            console.log(socket.id, 'has disconnected')
            removeUsers(socket)
        })

        // add news user to online list
        socket.on('online', (user) => {
            console.log('user name is', user.name);
            addUsers({id: socket.id, name: user.name})

        })

        // search user by name except user itself
        socket.on('search', (user) => {
            searchUsers(io, socket, user)
        })

        // sending private messages
        socket.on('message', (message) => {
            console.log(`Id ${socket.id} sending ${message.context} to ${message.to}`)
            io.to(socket.id).emit('message', {senderId: socket.id, recivierId: message.to, context: message.context})
            io.to(message.to).emit('message', {senderId: socket.id, recivierId: message.to, context: message.context})
        })

    })
}


module.exports = socketHandler;