const redis = require('../dbs/init.redis');
const { BadRequestError } = require("../core/error.response");
const { OK } = require("../core/success.response");
const ConfigService = require("../services/config.service");

class ConfigController {
    get = async (req, res, next) => {
        try {
            const facebookUser = await redis.get('facebookUser') || await ConfigService.getUserAvatar();
            const metaData = {
                facebookUser
            }
            new OK({
                message: 'success',
                metaData
            }).send(res);
        } catch (err) {
            const error = new BadRequestError(err.message, 500)
            next(error)
        }
    }
}

module.exports = new ConfigController();