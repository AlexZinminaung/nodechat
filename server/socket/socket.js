const { addUsers, removeUsers, searchUsers, getUserById }  = require('./userHandler')
const { storeMessages, getRecoverMessages, storeChats, getRecoverChats, removeChat } = require('./chatHandler');





const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connect : Id ', socket.id);

        // when user leave the socket
        socket.on('disconnect', () => {
            console.log(socket.id, 'has disconnected')
            removeUsers(socket)
            removeChat(socket.id);
        })

        // add news user to online list
        socket.on('online', (user) => {
            addUsers({id: socket.id, name: user.name})
            // check if user have chats and return
            const chats = getRecoverChats(socket.id);
            io.to(socket.id).emit('restore chats', chats)
        })

        // search user by name except user itself
        socket.on('search', (user) => {
            searchUsers(io, socket, user)
        })

        // sending private messages
        socket.on('message', (message) => {
            // restore messages
            storeMessages(message)

            io.to(message.senderId).emit('message', {senderId: message.senderId, recivierId: message.recivierId, context: message.context})
            io.to(message.recivierId).emit('message', {senderId: message.senderId, recivierId: message.recivierId, context: message.context})

            // to create recent chat
            // store recent chat into recent chat lists
            user1 = getUserById(message.senderId)
            user2 = getUserById(message.recivierId)
            const members = [user1, user2];
            console.log('memeber', members)
            storeChats(members);

            // get the name of the user
            const sender = getUserById(socket.id);
            io.to(message.recivierId).emit('chat', sender);
        })

        // restoring messages
        socket.on('restore', (id) => {
            // find the message in messageList [] and return;
            const recoverMessages = getRecoverMessages(socket.id, id);
            const user = getUserById(id);
            io.to(socket.id).emit('restore', recoverMessages, user.name);
        })

    })
}


module.exports = socketHandler;