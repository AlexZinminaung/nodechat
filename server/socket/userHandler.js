// if user connect then put the user id into the list so everyon can search the user except the user itself
let onlineUserList = [];


const addUsers = (user) => {
    // check if user already exist
    const userExist = onlineUserList.some( onlineUser => {
        return onlineUser.id == user.id
    })

    if (userExist)
    {
        console.log('User already Exist');
        return;
    }

    onlineUserList.push(user);
    console.log(onlineUserList)
}

const removeUsers = (user) => {
    const filterOnlineUserList = onlineUserList.filter( onlineUser => onlineUser.id != user.id);
    onlineUserList = filterOnlineUserList;
}

const searchUsers = (io, socket, search) => {
    const filterUsers = onlineUserList.filter(user => user.id != search.id)
                                      .filter(user => user.name.toLowerCase()
                                      .includes(search.name.toLowerCase()));

    // send the user list back to user privatly
    // if search is empty string then send emprt array []
    if (search.name.trim() == '')
    {
        io.to(socket.id).emit('search', []);
        return 
    }

    io.to(socket.id).emit('search', filterUsers);

}

module.exports = { addUsers, removeUsers, searchUsers}