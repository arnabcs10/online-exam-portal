function create_UUID(){
    let dt = new Date().getTime();
    const uuid = 'xxxx-xxx-yxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16).toUpperCase();
    });
    return uuid;
}

module.exports = create_UUID;