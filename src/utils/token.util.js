const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const userTokenService = require('../services/user_token.service');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;

class TokenUtil{
    static generateToken = async (account) => {
        const payload = lodash.omit(account, 'password');
        const accessToken = jwt.sign(
            payload,
            accessTokenSecret,
            { expiresIn: accessTokenLife }
        );
        const refreshToken = jwt.sign(
            payload,
            refreshTokenSecret,
            { expiresIn: refreshTokenLife }
        );
    
        await userTokenService.remove(account);
        await userTokenService.add(account, refreshToken);
        
        return { accessToken, refreshToken };
    };
    
    static verifyRefreshToken = async (refreshToken)=>{
        const userToken = await userTokenService.get(refreshToken);
        if(!userToken){
            throw new Error('Invalid refresh token');
        }
        return new Promise((resolve, reject)=>{
            jwt.verify(refreshToken, refreshTokenSecret, (err, tokenDetails) => {
                if (err) reject({ error: true, message: "Invalid refresh token" });
                resolve({ tokenDetails });
            })
        })
    }
}

module.exports = TokenUtil