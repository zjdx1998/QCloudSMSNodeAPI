/*
    @version: 1.0
    @author: 71117123张建东
    @date: 2019/9/4
*/
//npm install qcloudsms_js --save
var sc = require('./secret.ts')
var QCloudSMS = require("qcloudsms_js");
var fs = require('fs');
let jsondata = JSON.parse(fs.readFileSync('./smsconfig.json'));
var appID = sc.Decrypt(jsondata.appID);
var appKEY = sc.Decrypt(jsondata.appKEY);
var templatedID = sc.Decrypt(jsondata.templatedID);
var smsSign = jsondata.smsSign;
var qcloudsms = QCloudSMS(appID, appKEY);
var ssender = qcloudsms.SmsSingleSender;
function genCode(){
    var str = "";
    for(var i=1;i<=6;i++)
        str+=Math.floor(Math.random()*10);
    return parseInt(str);
}

function callback(err, res, resData) {
    if (err) {
        console.log("err: ", err);
    } else {
        console.log("request data: ", res.req);
        console.log("response data: ", resData);
    }
}

function SMSVerify(phoneNumber){
    let VerifyCode = genCode();
    ssender(86, phoneNumber, templatedID, [VerifyCode], smsSign, "", "", callback);
    return VerifyCode;
}

module.exports = SMSVerify;