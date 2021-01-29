import express=require('express');
import { json, urlencoded } from 'body-parser';
import router from "./router";

const app:express.Application=express();
app.use(json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
app.use('/', router);

app.listen(8888,function(){
    console.log('Example app listening on http://localhost:8888 !');
})