const fs = require('fs')
const { getFilenameFromUrl, getSuffix, createFile } = require('../util/index.js')
// 返回数据
const responseData = (req, res) => {
    if (req.url.includes('upload') && req.method.toLowerCase() === 'post') {
        let msg = []
        req.on('data',(chunk)=>{
            if(chunk){
                msg.push(chunk);
            }
        })
        req.on('end',()=>{
            // 对buffer数组阵列列表进行buffer合并返回一个Buffer
            let buf=Buffer.concat(msg);
            createFile(String(buf))
            res.end('保存成功')
        })  
    }
    if (req.url.includes('show')) {
        let fileName = getFilenameFromUrl(req.url)
        res.setHeader('content-type', getSuffix(fileName))
        fs.readFile(`./${fileName}`, 'binary', (err, data) => {
            if (err) throw err;
            res.write(data, 'binary')
            res.end()
        });
    }
    if (req.method.toLowerCase() === 'options') {
        res.end()
    }
}

module.exports = {
    responseData
}