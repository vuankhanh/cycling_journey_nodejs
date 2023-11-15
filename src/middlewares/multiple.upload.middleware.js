/**
 * Created by trungquandev.com's author on 17/08/2019.
 * multipleUploadMiddleware.js
 */
const util = require("util");
const multer = require("multer");
const fse = require('fs-extra');
const replaceToVietnamese = require('../helpers/replace.to.vietnamese');
const localPathConfig = require('../configs/local_dir');
const imageAlbumService = require('../helpers/image.album');

// Khởi tạo biến cấu hình cho việc lưu trữ file upload
let storage = multer.diskStorage({
    // Định nghĩa nơi file upload sẽ được lưu lại
    destination: async(req, file, callback) => {
        let urlRoute = req.baseUrl + req.path;
        let query = req.query;
        try {
            switch(urlRoute){
                case '/api/album/':
                    if(req.method === 'POST'){
                        let count = await imageAlbumService.checkExistAlbum(query.name);
                        if(count){
                            return callback({ code: 11000 }, null);
                        }
                        const albumFolder = 'cycling-journey-album';
                        const relativePath = albumFolder+'/'+replaceToVietnamese(query.name);
                        const absolutePath = localPathConfig.album+'/'+relativePath;
                        req.customParams = {};
                        req.customParams.relativePath = relativePath;
                        fse.ensureDirSync(absolutePath);
                        return callback(null, absolutePath);
                    }
                    break;
                case '/api/album/'+req.params.id: 
                    if(req.method === 'PATCH'){
                        const relativePath = req.customParams?.relativePath;
                        const absolutePath = localPathConfig.album+'/'+relativePath;
                        fse.ensureDirSync(absolutePath);
                        return callback(null, absolutePath);
                    }
                    break;
                default: 
                    let error = {
                        code: 'UNSOPPORTED_FILE',
                        message: 'This route does not support files'
                    }
                    return callback(error, null);
            }
        } catch (error) {
            return callback(null, error);
        }
    },
    filename: (req, file, callback) => {
        // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
        // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
        // console.log(file);
        let query = req.query;
        let math = ['image/png', 'image/jpeg', 'video/mp4', 'video/quicktime', 'video/webm'];
        if (math.indexOf(file.mimetype) === -1) {
            let error = {
                code: 'INVALID_IMAGE_FORMAT',
                message: 'Only allowed to upload image jpeg or png'
            }
            return callback(error, null);
        }
        // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
        let filename = `${Date.now()}-${replaceToVietnamese(query.name)}-${file.originalname}`;

        callback(null, filename);
    }
});
// Khởi tạo middleware uploadManyFiles với cấu hình như ở trên,
// Bên trong hàm .array() truyền vào name của thẻ input, ở đây mình đặt là "many-files", và tham số thứ hai là giới hạn số file được phép upload mỗi lần
let uploadManyFiles = multer({storage: storage}).array("many-files", 150);

// Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
let multipleUploadMiddleware = util.promisify(uploadManyFiles);
module.exports = multipleUploadMiddleware;