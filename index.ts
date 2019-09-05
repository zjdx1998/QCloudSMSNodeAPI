var inits = new Promise(resolve=>require('./lib/init.ts')).then( 
    resolve=>{
        module.exports={
            SMSVerify: require('./lib/SMSVerify.ts')
        }
    }
)
