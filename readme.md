### fileReader对象方法
readAsArrayBuffer(Blob | File): 读取为ArrayBuffer格式
readAsBinaryString(): 读取文件原始二进制格式
readAsDataURL(): 读取为base64格式
readAsText(): 读取为文本格式
返回一个异步对象，当处理完成后触发该对象当loadend事件


### 文本文件的收发
##### 文本发送步骤（txt）
1.使用input的onchange事件获取选中的文件，此时为File类型
2.使用FileReader类的函数，将该File生成Blob或者ArrayBuffer类型，或者二进制形式
3.创建XMLHttpRequest类，open，send(send可以直接发送Blob,ArrayBuffer,FormData类型数据)
##### 服务端文件接收
1.监听Request对象的chunk事件，收集发送过来的数据
2.监听Request对象的end事件，拼接所有数据
3.使用fs中的api写入文件

### 图片文件的收发
##### 图片文件发送
1.使用FileRead的将图片的File对象转为二进制形式
2.使用XMLHttpRequest发送
##### 服务端图片接收
1.使用post的chunk和end进行数据接收
2.使用fs.writeFile(data, content, {encoding: 'brinary'}) 以二进制的格式写入图片
##### 服务端图片对象返回
1.使用二进制格式读取文件
2.修改content-type并将二进制流返回

### 判断上传文件的类型
### 文件分片传输
### 断点序传
### 上传点暂停开始
