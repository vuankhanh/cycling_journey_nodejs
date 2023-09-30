'use strict'

const MilestoneService = require('../services/milestone.service');
const { OK, CREATED } = require('../core/success.response');

class MilestoneController{
    create = async(req, res, next)=>{
        try {
            const data = req.body;
            console.log(`body: ${data}`);
            console.log(data);
            new CREATED({
                message: 'A new milestone has been created!',
                metaData: await MilestoneService.create(data)
            }).send(res);
        } catch (error) {
            next(error)
        }
    }
    getAll = async(req, res, next)=>{
        try {
            new OK({
                message: 'success',
                metaData: await MilestoneService.getAll()
            }).send(res);
        } catch (error) {
            next(error)
        }
    }

    getDetail = async(req, res, next)=>{
        try {
            const id = req.params.id;
            console.log(`id: ${id}`);
            return res.status(200).json(await MilestoneService.getDetail(id));
        } catch (error) {
            next(error)
        }
    }

    replace = async(req, res, next)=>{
        try {
            req.params.id
            return res.status(200).json(await MilestoneService.replace());
        } catch (error) {
            next(error)
        }
    }

    modify = async(req, res, next)=>{
        try {
            req.params.id
            return res.status(200).json(await MilestoneService.modify());
        } catch (error) {
            next(error)
        }
    }

    delete = async(req, res, next)=>{
        try {
            req.params.id
            return res.status(200).json(await MilestoneService.remove());
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new MilestoneController();