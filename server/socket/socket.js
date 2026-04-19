const { addUsers, removeUsers, searchUsers, getUserById }  = require('./userHandler')
const { storeMessages, getRecoverMessages, storeChats, getRecoverChats, removeChat, removeMessage } = require('./chatHandler');





const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connect : Id ', socket.id);

        // when user leave the socket
        socket.on('disconnect', () => {
            console.log(socket.id, 'has disconnected')
            removeUsers(socket)
            removeChat(socket.id);
            removeMessage(socket.id);
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
            const sender = getUserById(message.senderId)
            const recivier = getUserById(message.recivierId)
            //check if user disconnect 
            if (!recivier) {
                io.to(socket.id).emit('redirect', {message: "User is disconnected"})
                return;
            }
            // restore messages
            storeMessages(message)
            
            io.to(message.senderId).emit('message', message)
            io.to(message.recivierId).emit('message', message)

            // to create recent chat
            // store recent chat into recent chat lists
            user1 = getUserById(message.senderId)
            user2 = getUserById(message.recivierId)

            // check if both member is still exit 
            // if one or both disconnect then don't restore 
            if (!user1 || !user2) {
                io.emit('redirect')
                return;
            }
            
            const members = [user1, user2];
            console.log('memeber', members)
            storeChats(members);

            // get the name of the user
            io.to(message.recivierId).emit('chat', sender);
        })

        // restoring messages
        socket.on('restore', (id) => {
            // find the message in messageList [] and return;
            const recoverMessages = getRecoverMessages(socket.id, id);
            const user = getUserById(id);
            const sender = getUserById(socket.id)
            // if user does not exist then redirect
            if (!user) {
                io.to(socket.id).emit('redirect', {message: "User is disconnected", sender: sender.name})
                return;
            }
            // else user exist then restore message if exist
            io.to(socket.id).emit('restore', recoverMessages, user.name);
        })

    })
}


module.exports = socketHandler;