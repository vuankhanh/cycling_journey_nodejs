const path = require('path');

module.exports = {
    album: path.join(__dirname+'../../../../Server_File/Album').replace(/\\/g,"/"),
    icon: path.join(__dirname,'../../assets/icon/svg').replace(/\\/g,"/")
}