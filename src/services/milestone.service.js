'use strict'

const milestoneModel = require('../models/milestone.model');

class MilestoneService {
    static create = async (data)=>{
        console.log('creating...');
        try {
            const milestone = new milestoneModel(data);
            await milestone.save();
            console.log(milestone);
            return {
                code: 'xxxx',
                message: '',
                metadata: milestone
            }
        } catch (error) {
            console.error(error);
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }

    static getAll = async ()=>{
        try {
            const milestones = await milestoneModel.find().lean();
            return {
                code: 'xxxx',
                message: '',
                metadata: milestones
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }

    static getDetail = async (id)=>{
        try {
            const milestone = await milestoneModel.findOne(id).lean();
            return {
                code: 'xxxx',
                message: '',
                metadata: milestone
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }

    static replace = async (id, data)=>{
        try {

            const milestone = await milestoneModel.findOneAndReplace(id);
            return {
                code: 'xxxx',
                message: '',
                metadata: milestone
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }

    static modify = async (id, data)=>{
        try {
            const milestone = await milestoneModel.findOneAndUpdate(id);
            return {
                code: 'xxxx',
                message: '',
                metadata: milestone
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }

    static remove = async (id, data)=>{
        try {
            const milestone = await milestoneModel.findOneAndRemove(id);
            return {
                code: 'xxxx',
                message: '',
                metadata: milestone
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = MilestoneService;