console.log("-------Welcome to foof-SMSServer!-------");
const inquirer = require('inquirer');

const promptList = [{
    type: 'input',
    message: 'Please input your appID',
    name: 'appID',
},{
    type: 'input',
    message: 'Please input your appKey',
    name: 'appKEY',
},{
    type: 'input',
    message: 'Please input your templateID',
    name: 'templatedID'
},{
    type: 'input',
    message: "Please input your SMSSign",
    name: 'smsSign'
}
];

function callback(err, data){
    if(err){console.log(err)};
    console.log('Success');
}
var fs = require('fs');
var sc = require('./lib/secret.ts');
function getQCloudSMSInfo(){
    let ans;
    inquirer.prompt(promptList).then(
        answers=>{
            answers.appID = sc.Encrypt(answers.appID);
            answers.appKEY = sc.Encrypt(answers.appKEY);
            answers.templatedID = sc.Encrypt(answers.templatedID);
            ans = answers;
        }
    ).then(
        ()=>{
            let str = JSON.stringify(ans,null,'\t');
            fs.writeFile('./smsconfig.json',str, callback);
        }
    )
    
}

const deletePromptList = {
    type: 'confirm',
    name: 'delete',
    message: 'Do you want to clean the configuration?',
    default: false
}

fs.exists('smsconfig.json',function(exists){
    if(!exists) {
        console.log("-------Please configure your QCloudSMS Info!-------");
        getQCloudSMSInfo();
    }
    else{
        inquirer.prompt(deletePromptList).then(
            answers=>{
                if (answers.delete===true){
                    fs.unlink('smsconfig.json', function(error){
                        if(error){
                            console.log(error);
                            return false;
                        }
                        console.log("Clean successfully, now you can reconfigure your settings!");
                    });
                }
            }
        )
    }
});