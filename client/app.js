//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
// import './vendor/weapp-cookie/index'
import 'weapp-cookie'

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})