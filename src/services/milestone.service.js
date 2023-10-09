'use strict'

const milestoneModel = require('../models/milestone.model');

class MilestoneService {
    static create = async (data)=>{
        const milestone = new milestoneModel(data);
        await milestone.save();
        return milestone;
    }

    static getAll = async ()=>{
        try {
            const milestones = await milestoneModel.find().lean();
            return milestones
        } catch (error) {
            return error;
        }
    }

    static getDetail = async (id)=>{
        try {
            const milestone = await milestoneModel.findById(id).populate('albumId');
            return milestone
        } catch (error) {
            return error;
        }
    }

    static replace = async (id, data)=>{
        try {
            const milestone = await milestoneModel.findByIdAndReplace(id, data);
            return milestone;
        } catch (error) {
            return error;
        }
    }

    static modify = async (id, data)=>{
        const milestone = await milestoneModel.findByIdAndUpdate(id, data);
        return milestone
    }

    static remove = async (id, data)=>{
        const milestone = await milestoneModel.findOneAndRemove(id);
        return milestone
    }
}

module.exports = MilestoneService;