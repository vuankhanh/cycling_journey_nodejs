const polylinesModel = require('../models/polyline.model');

class PolylinesService {
    static create = async(data)=>{
        const polylines = new polylinesModel(data);
        await polylines.save();
        return polylines;
    }

    static getLastPolylines = async()=>{
        const polylines = await polylinesModel.findOne({}).sort('-createdAt');
        return polylines
    }
}

module.exports = PolylinesService