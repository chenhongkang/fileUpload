const querystring = require("querystring")
const fs = require('fs')

const { responseData } = require('./router/index')

// 处理cookie, 是指转变成对象
const handleCookie = (req) => {
    let cookieStr = req.headers.cookie || ""
    req.cookie = {}
    cookieStr.split("; ").map((item) => {
        if(!item){
            return;
        }
        let key = item.split("=")[0]
        let value = item.split("=")[1]
        req.cookie[key] = value
    })
    // console.log('cookie', cookieStr)
}

const httpHandle = (req, res) => {    
    const {method, url} = req
    const query = url.split("?")[1]
    let handleResult = ""

    //处理请求数据
    //允许跨域
    res.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
    res.setHeader("Access-Control-Allow-Credentials", true); // 设置可访问的源
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-pingother,Upload-File-Id,Upload-File-Order,Upload-File-End"); 
    res.setHeader("content-type", "application/json")
    //解析query
    req.query = querystring.parse(query)
    //解析cookie
    handleCookie(req)
    // 返回结果
    console.log()
    responseData(req, res)
};

module.exports = httpHandle