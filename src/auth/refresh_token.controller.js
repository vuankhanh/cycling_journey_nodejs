const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../core/error.response');
const validationSchemaUtil = require('../utils/validation_schema.util');
const tokenUtil = require('../utils/token.util');
const { OK } = require('../core/success.response');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

class RefreshTokenController {
    refresh = async (req, res, next)=>{
        const body = req.body;
        const { error } = validationSchemaUtil.refreshTokenBodyValidation(body);
        if(error){
            const newError = new BadRequestError(error.details[0].message, 400);
            next(newError);
            return;
        }
        try {
            const payload = await tokenUtil.verifyRefreshToken(body.refreshToken);
            const accessToken = jwt.sign(
                payload,
                accessTokenSecret,
                { expiresIn: accessTokenLife }
            );
            new OK({
                message: 'Access token created successfully',
                metaData: { accessToken }
            }).send(res);
        } catch (error) {
            const newError = new BadRequestError(error.message, 400);
            next(newError);
            return;
        }

    }
}

module.exports = new RefreshTokenController();