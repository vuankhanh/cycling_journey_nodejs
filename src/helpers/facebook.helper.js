'use strict'

const axios = require("axios");

const fbUserId = process.env.FB_USER_ID;
class FacebookHelper {
    static getUserInfo = async (accessToken) => {
        return await axios.get(`http://graph.facebook.com/${fbUserId}?access_token=${accessToken}&fields=name,email,picture.width(200).height(200)`);
    }
}

module.exports = FacebookHelper