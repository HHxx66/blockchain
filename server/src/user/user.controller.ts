import { Response, Request } from 'express';
import { join } from 'path';
import { exec, ExecException } from "child_process"
import { readdirSync, readFileSync } from "fs";
import service = require('../fisco/fisco.service')

let getAccount = join(process.cwd(), 'get_account.sh');
let accountsDir = join(process.cwd(), 'accounts');

export const test = (req:Request,res:Response) => {
    res.send('user test');
};

export const regist = (req:Request,res:Response) => {
    exec(join('bash ', getAccount),(error: ExecException|null, _stdout:string, _stdin:string)=>{
        if(error){
            console.log(error.message)
            res.json({publicKey:"获取失败",privateKey:"请联系管理员"});
        } else {
            var files = readdirSync(accountsDir);
            var publicKey = files[1].replace(/.public.pem/g, '');
            var privateKey = readFileSync(join(accountsDir, files[0]));
            exec(join('rm -rf ', accountsDir));
            res.json({publicKey:publicKey.toString(),privateKey:privateKey.toString()});
        }
    });
};

export const getCompanyInfo = async (req:Request,res:Response) => {
    const errHandler = (e:Error)=>{
        console.log(e);
        return "error"
    };
    var balance = await service.getBalance(req.body.privateKey).catch(errHandler);
    var credit  = await service.getCredit(req.body.privateKey).catch(errHandler);
    res.json({balance:balance,credit:credit});
};

export const getReceiptsOut = async (req:Request,res:Response) => {
    const errHandler = (e:Error)=>{
        console.log(e);
        return "error"
    };
    var receiptsOut = await service.getReceiptsOutList(req.body.privateKey).catch(errHandler);
    res.json(receiptsOut);
};

export const getReceiptsIn = async (req:Request,res:Response) => {
    const errHandler = (e:Error)=>{
        console.log(e);
        return "error"
    };
    var receiptsIn = await service.getReceiptsInList(req.body.privateKey).catch(errHandler);
    res.json(receiptsIn);
};

export const balanceTrading = async (req:Request,res:Response) => {
    var status:string = await service.tradingWithBalance(req.body.privateKey, req.body.receiver, req.body.amount).catch((e:Error)=>{
        console.log(e)
        return "interal error"
    });
    res.send({status:status});
};

export const creditTrading = async (req:Request,res:Response) => {
    var status:string = await service.tradingWithCredit(req.body.privateKey, req.body.receiver, req.body.amount, req.body.validity).catch((e:Error)=>{
        console.log(e)
        return "interal error"
    });
    res.send({status:status});
};

export const receiptTrading = async (req:Request,res:Response) => {
    var status:string = await service.tradingWithReceipt(req.body.privateKey, req.body.receiver, req.body.amount, req.body.timestamp).catch((e:Error)=>{
        console.log(e)
        return "interal error"
    });
    res.send({status:status});
};

export const financing = async (req:Request,res:Response) => {
    var status:string = await service.financing(req.body.privateKey, req.body.amount, req.body.timestamp).catch((e:Error)=>{
        console.log(e)
        return "interal error"
    });
    res.send({status:status});
};

export const arrearsPaying = async (req:Request,res:Response) => {
    var status:string = await service.arrearsPaying(req.body.privateKey, req.body.timestamp).catch((e:Error)=>{
        console.log(e)
        return "interal error"
    });
    res.send({status:status});
};

export const addbalance = async (req:Request,res:Response) => {
    var status:string = await service.addbalance(req.body.privateKey, req.body.receiver, req.body.balance).catch((e:Error)=>{
        console.log(e)
        return "interal error"
    });
    res.send({status:status});
};

export const addcredit = async (req:Request,res:Response) => {
    var status:string = await service.addcredit(req.body.privateKey, req.body.receiver, req.body.credit).catch((e:Error)=>{
        console.log(e)
        return "interal error"
    });
    res.send({status:status});
};