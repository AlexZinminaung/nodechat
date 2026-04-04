// messages store

let messageList = [];
let chatList = [];



const storeMessages = (message) => {
    messageList.push(message)
}


const getRecoverMessages = (userId1, userId2) => {
    const filterMessages = messageList.filter( message => {
        return (message.senderId == userId1 && message.recivierId == userId2) || (message.senderId == userId2 && message.recivierId == userId1);
    })

    return filterMessages;
}

const storeChats = (members) => {

    const membersExist = chatList.some( item => {
        return (
            (item[0].name === members[0].name && item[1].name === members[1].name) ||
            (item[0].name === members[1].name && item[1].name === members[0].name)
        );
    })

    if (membersExist) return;

    chatList.push(members);
    console.log('chat member', chatList);
}

const removeChat = (id) => {
    const filterChat = chatList.filter( chat => {
        return chat[0].id !== id && chat[1].id !== id;
    })
    
    chatList = filterChat;
}

const getRecoverChats = (userId) => {
    const filterChats = chatList.filter( item => {
        return (
            (item[0].id === userId || item[1].id === userId) 
        );
    })

    return filterChats;
}

module.exports = { storeMessages, getRecoverMessages, storeChats, getRecoverChats, removeChat }