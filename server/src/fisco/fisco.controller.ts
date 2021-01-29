import service = require('./fisco.service')
import { Response, Request } from 'express';

export const getBlockNumber = async (req:Request,res:Response) => {
    var blocknumber = await service.getBlockNumber().catch((e:Error)=>{
        console.log(e)
        return -1;
    });
    res.send(blocknumber);
}

export const deployContract = async (req:Request,res:Response) => {
    var status:string = await service.deployContract().catch((e:Error)=>{
        console.log(e)
        return "interal error"
    });
    res.send({status:status});
}