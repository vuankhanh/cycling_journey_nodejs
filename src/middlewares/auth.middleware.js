const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../core/error.response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

let isAuth = async (req, res, next) => {
    // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
    const accessToken = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization']?.replace('Bearer ', '');
    if(!accessToken){
        const error = new BadRequestError('No token provided', 403);
        next(error);
        return;
    }
    // Thực hiện giải mã token xem có hợp lệ hay không?
    jwt.verify(accessToken, accessTokenSecret, (err, tokenDetails) => {
        if (err) {
            const error = new BadRequestError('Unauthorized', 401)
            next(error);
            return;
        };
        // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
        req.jwtDecoded = tokenDetails;
    })
    // Cho phép req đi tiếp sang controller.
    next();
}

module.exports = isAuth;