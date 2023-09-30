'use strict'

const milestoneModel = require('../models/milestone.model');

class MilestoneService {
    static create = async (data)=>{
        try {
            const milestone = new milestoneModel(data);
            await milestone.save();
            return milestone
        } catch (error) {
            return error;
        }
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
            const milestone = await milestoneModel.findOne(id).lean();
            return  milestone
        } catch (error) {
            return error;
        }
    }

    static replace = async (id, data)=>{
        try {

            const milestone = await milestoneModel.findOneAndReplace(id);
            return milestone
        } catch (error) {
            return error;
        }
    }

    static modify = async (id, data)=>{
        try {
            const milestone = await milestoneModel.findOneAndUpdate(id);
            return milestone
        } catch (error) {
            return error;
        }
    }

    static remove = async (id, data)=>{
        try {
            const milestone = await milestoneModel.findOneAndRemove(id);
            return milestone
        } catch (error) {
            return error;
        }
    }
}

module.exports = MilestoneService;