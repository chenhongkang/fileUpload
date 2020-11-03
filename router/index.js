const fs = require('fs')
const { getFilenameFromUrl, getSuffix, createFile } = require('../util/index.js')
let uploadFileMap = {}
// 返回数据
const responseData = (req, res) => {
    if (req.url.includes('upload') && req.method.toLowerCase() === 'post') {
        // let msg = []
        // req.on('data', (chunk) => {
        //     if(chunk){
        //         msg.push(chunk);
        //     }
        // })
        // req.on('end', () => {
        //     // 对buffer数组阵列列表进行buffer合并返回一个Buffer
        //     let buf = Buffer.concat(msg);
        //     createFile(String(buf))
        //     res.end('保存成功')
        // })
        handleSplitUpload(req, res)
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

// 处理分片上传
const handleSplitUpload = (req, res) => {
    const { 'upload-file-end': uploadFileEnd, 'upload-file-id': uploadFileId, 'upload-file-order': uploadFileOrder } = req.headers
    let msg = []
    req.on('data', (chunk) => {
        if(chunk){
            msg.push(chunk);
        }
    })
    req.on('end', () => {
        // 对buffer数组阵列列表进行buffer合并返回一个Buffer
        let buf = Buffer.concat(msg)
        let result = true
        uploadFileMap[uploadFileId] || (uploadFileMap[uploadFileId] = [])
        uploadFileMap[uploadFileId][uploadFileOrder] = String(buf)
        uploadFileMap[uploadFileId].status = uploadFileEnd === 'true'
        if (uploadFileMap[uploadFileId].status) {
            for (i = 0; i < uploadFileMap[uploadFileId].length; i++) {
                if (!uploadFileMap[uploadFileId][i]) {
                    result = false
                    break
                }
            }
        } else {
            console.log('1234567890')
            result = false
        }
        console.log(uploadFileMap[uploadFileId].status, result)
        result && createFile(''.concat(...uploadFileMap[uploadFileId]))
        res.end('保存成功')
    })
}

module.exports = {
    responseData
}