import { Configuration, Web3jService, decode } from './fisco.api';
import { join } from 'path';
import { abi, bin, getAbi } from '../tool/contract'

let configFile = join(process.cwd(), 'src/conf/config.json');
let companyFile = join(process.cwd(), 'src/conf/company.pem');

let config = new Configuration(configFile);
let web3jService = new Web3jService(config);

export const getBlockNumber = async ():Promise<any> => {
    var filter = (result:any)=>{
        result.result = parseInt(result.result, 16).toString();
        return result.result
    };
    return web3jService.getBlockNumber().then(filter);
}

var contractAddress:string = ''
var fs = require("fs");

export const deployContract = async ():Promise<any> => {
    if(!!contractAddress){
        return new Promise<any>((resolve, _reject)=>{
            resolve("contract already exists!");
        })
    }else{
        return web3jService.deploy(abi,bin,[],"bank").then((result:any)=>{
            if(result.status == "0x0"){
                contractAddress = result.contractAddress;
            }
            return "success";
        })
    }
}

export const getBalance = async (privateKey:string):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status !== '0x0')
            return result.statusMsg;
        result.output = parseInt(result.output, 16).toString();
        return result.output
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('getbalance'),[],"company").then(filter);
}

export const getCredit = async (privateKey:string):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status !== '0x0')
            return result.statusMsg;
        result.output = parseInt(result.output, 16).toString();
        return result.output
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('getcredit'),[],"company").then(filter);
}

export const getReceiptsOutList = async (privateKey:string):Promise<any> => {
    var filter = (result:any)=>{
        let abi = getAbi('getReceiptsOutList');
        let decoder = decode.createMethodDecoder(abi, null);
        let res = decoder.decodeOutput(result.output).result[0];
        console.log(res);
        return res;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('getReceiptsOutList'),[],"company").then(filter);
}

export const getReceiptsInList = async (privateKey:string):Promise<any> => {
    var filter = (result:any)=>{
        console.log(result)
        let abi = getAbi('getReceiptsInList');
        let decoder = decode.createMethodDecoder(abi, null);
        let res = decoder.decodeOutput(result.output).result[0];
        console.log(res);
        return res;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('getReceiptsInList'),[],"company").then(filter);
}

export const tradingWithBalance = async (privateKey:string, receiver:string, amount:number):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status == '0x0')
            return 'success';
        else
            return result.statusMsg;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('tradingWithBalance'),[receiver, amount],"company").then(filter);
}

export const tradingWithCredit = async (privateKey:string, receiver:string, amount:number, validity:number):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status == '0x0')
            return 'success';
        else
            return result.statusMsg;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('tradingWithCredit'),[receiver, amount, validity],"company").then(filter);
}

export const tradingWithReceipt = async (privateKey:string, receiver:string, amount:number, timestamp:number):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status == '0x0')
            return 'success';
        else
            return result.statusMsg;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('tradingWithReceipt'),[receiver, amount, timestamp],"company").then(filter);
}

export const financing = async (privateKey:string, amount:number, timestamp:number):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status == '0x0')
            return 'success';
        else
            return result.statusMsg;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('financing'),[amount, timestamp],"company").then(filter);
}

export const arrearsPaying = async (privateKey:string, timestamp:number):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status == '0x0')
            return 'success';
        else
            return result.statusMsg;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('arrearsPaying'),[timestamp],"company").then(filter);
}

export const addbalance = async (privateKey:string, receiver:string, balance:number):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status == '0x0')
            return 'success';
        else
            return result.statusMsg;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('addbalance'),[receiver, balance],"company").then(filter);
}

export const addcredit = async (privateKey:string, receiver:string, credit:number):Promise<any> => {
    var filter = (result:any)=>{
        if(result.status == '0x0')
            return 'success';
        else
            return result.statusMsg;
    };
    fs.writeFileSync(companyFile, privateKey);
    var config_temp = new Configuration(configFile);
    var web3jService_Temp = new Web3jService(config_temp);
    return web3jService_Temp.sendRawTransaction(contractAddress,getAbi('addcredit'),[receiver, credit],"company").then(filter);
}