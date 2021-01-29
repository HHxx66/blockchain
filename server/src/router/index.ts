import UserHandler = require("../user/user.controller");
import FiscoHandler = require('../fisco/fisco.controller');
import { Response, Request, Router } from 'express';

const router = Router();

router.get('/',function(req:Request,res:Response){
  res.send('Hello World!');
});

router.get('/fisco/getBlockNumber',FiscoHandler.getBlockNumber);
router.get('/fisco/deployContract',FiscoHandler.deployContract);

router.get('/user/test',UserHandler.test);
router.post('/user/test',UserHandler.test);
router.post('/user/regist',UserHandler.regist);
router.post('/user/companyInfo',UserHandler.getCompanyInfo);
router.post('/user/getReceiptsOutList',UserHandler.getReceiptsOut);
router.post('/user/getReceiptsInList',UserHandler.getReceiptsIn);
router.post('/user/tradingWithBalance',UserHandler.balanceTrading);
router.post('/user/tradingWithCredit',UserHandler.creditTrading);
router.post('/user/tradingWithReceipt',UserHandler.receiptTrading);
router.post('/user/financing',UserHandler.financing);
router.post('/user/arrearsPaying',UserHandler.arrearsPaying);

router.post('/user/addbalance',UserHandler.addbalance);
router.post('/user/addcredit',UserHandler.addcredit);

export default router;
