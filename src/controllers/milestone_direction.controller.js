
const milestoneService = require('../services/milestone.service');
const GoogleMapApiRequestService = require('../services/google_maps_api.service');
const PolylinesService = require('../services/polylines.service');

const CoordinateMilestoneHelper = require('../helpers/coordinate_milestone.helper');
const { OK } = require('../core/success.response');
const { BadRequestError, InternalServerError } = require('../core/error.response');

class MilestoneDirectionController {
    update = async (req, res, next) => {
        try {
            const milestones = await milestoneService.getAll().sort({numericalOrder: 1});
            const arrSelectives = CoordinateMilestoneHelper.coordinatesInOrderSelective(milestones);
            new OK({
                message: 'success',
                metaData: await GoogleMapApiRequestService.getDirections(arrSelectives)
            }).send(res);
        } catch (err) {
            const error = new InternalServerError(err.message, 500)
            next(error)
        }
    }

    getLastPolylines = async(req, res, next)=>{
        try {
            new OK({
                message: 'success',
                metaData: await PolylinesService.getLastPolylines()
            }).send(res);
        } catch (err) {
            const error = new InternalServerError(err.message, 500)
            next(error)
        }
    }
}

module.exports = new MilestoneDirectionController()