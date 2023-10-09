'use strict'

const MilestoneService = require('../services/milestone.service');
const { OK, CREATED } = require('../core/success.response');
const { BadRequestError } = require('../core/error.response');

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
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }
    getAll = async(req, res, next)=>{
        try {
            new OK({
                message: 'success',
                metaData: await MilestoneService.getAll()
            }).send(res);
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    getDetail = async(req, res, next)=>{
        try {
            const id = req.params.id;
            console.log(`id: ${id}`);
            new OK({
                message: 'success',
                metaData: await MilestoneService.getDetail(id)
            }).send(res);
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    replace = async(req, res, next)=>{
        try {
            const id = req.params.id;
            const data = req.body;
            new OK({
                message: 'success',
                metaData: await MilestoneService.replace(id, data)
            }).send(res);
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    modify = async(req, res, next)=>{
        try {
            const id = req.params.id;
            const data = req.body;
            if(!data){

            }
            new OK({
                message: 'success',
                metaData: await MilestoneService.modify(id, data)
            }).send(res);
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    delete = async(req, res, next)=>{
        try {
            const id = req.params.id;
            return res.status(200).json(await MilestoneService.remove());
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }
}

module.exports = new MilestoneController();