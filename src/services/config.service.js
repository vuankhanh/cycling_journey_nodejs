const FacebookHelper = require("../helpers/facebook.helper");
const redis = require('../dbs/init.redis');

class ConfigService{
    static getUserAvatar = async ()=>{
        try {
            const accessToken = '835097325034034|QpIS1kwIGS2kEHwpjiTRBvBTFQY';
            const response = await FacebookHelper.getUserInfo(accessToken);
            const facebookUser = response.data;
            redis.set('facebookUser', facebookUser)
            return facebookUser;
        } catch (error) {
            console.log(error);
            return 'error';
        }
    }
}

module.exports = ConfigService;