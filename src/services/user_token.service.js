const userTokenSchema = require('../models/user_token.model');

class UserTokenClass{
    static get = async (refreshToken)=>{
        const conditional = { token: refreshToken };
        const userToken = await userTokenSchema.findOne(conditional);
        return userToken;
    }

    static remove = async (account)=>{
        const conditional = { userId: account._id }
        await userTokenSchema.findOneAndDelete(conditional);
    }

    static add = async (user, refreshToken)=>{
        const data = { userId: user._id, token: refreshToken }
        await new userTokenSchema(data).save();
    }

}

module.exports = UserTokenClass