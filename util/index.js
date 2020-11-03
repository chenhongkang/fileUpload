const fs = require('fs')
const { contentType } = require('../config/index.js')
// 从url中获取文件名
const getFilenameFromUrl = function (url) {
    return url.split('/').pop()
}
// 获取文件名后缀
const getSuffix = function (fileName) {
    let tempArr = fileName.split('.')
    return contentType[tempArr.length > 1 ? tempArr.pop() : 'stream']
}
// 创建文件
const createFile = (content) => {
    const path = './uploadFile/'
    fs.writeFile(path + `${Math.random().toFixed(3)}.txt`, content, {encoding: 'binary'}, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

module.exports = {
    getFilenameFromUrl,
    getSuffix,
    createFile
}