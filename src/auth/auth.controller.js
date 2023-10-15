'use strict'
const bcrypt = require('bcrypt');
const { OK } = require('../core/success.response');
const { BadRequestError } = require('../core/error.response');

const authService = require('../services/auth.service');

const tokenUtil = require('../utils/token.util');

class AuthController {
    login = async (req, res, next)=>{
        const username = req.body.username;
        const password = req.body.password;
        if(!username || !password){
            const error = new BadRequestError('username or password is not found', 404);
            next(error);
            return;
        }
        const account = await authService.getAccount(username);
        if (!account) {
            const error = new BadRequestError('username is not exist', 401);
            next(error);
            return;
        }
    
        const isPasswordValid = bcrypt.compareSync(password, account.password);
        if (!isPasswordValid) {
            const error = new BadRequestError('password is incorrect', 401);
            next(error);
            return;
        }

        new OK({
            message: 'Login is success',
            metaData: await tokenUtil.generateToken(account)
        }).send(res);
    }
}

module.exports = new AuthController()