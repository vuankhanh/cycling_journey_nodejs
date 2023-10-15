const accountSchema = require('../models/account.model');
class AuthService {
    static getAccount = async (username)=>{
        const account = await accountSchema.findOne({username}).lean();
        return account
    }
}

module.exports = AuthService