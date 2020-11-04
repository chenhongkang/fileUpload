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
1.前端可以将文件到类型等属性放入header中进行传送
2.前端可以构造formData数据，带其他参数传入（没有实现过）

### 文件分片传输
##### 流程
1. 前端使用blob.slice函数对文件切分上传
2. 携带order,fileId,end三个参数
3. 后端根据这个三个参数进行拼接处理（可以通过redies存储这些值和接收到到文件流）
##### 思考
1. 中间到包遗失重传，可以给前端返回相关order和id数据，前端进行重传，这样到话前端也应该保留整个文件数据，直到文件上传结束
2. 文件上传失败判断：有片段多次上传失败，一段时间后，整个包算作传输失败
##### 优化
1. 实现一个滑动窗口，以防止多个片段同时进行上传请求
##### 问题
1. 图片分片上传，拼接回发生错误（未解决）

### 上传进度条
1. 可以用分片的分片数作为上传进度条
2. 可以用上传的文件数，作为上传进度条
3. 使用XMLHttpRequest的progress事件

### 秒传原理
##### 流程
1.将文件的内容使用md5进行编码
2.访问后端接口，判断是否可以秒传（应该就是判断是否有对应的md5）
##### 优化
1.可以使用work Server多开进程进行这种耗时大的运算

### 文件夹上传
1.给input添加webkitdirectory multiple属性使得其可以选择文件夹
2.onchange方法，返回一个file列表，包括所有文件的File对象
3.将这些文件分别上传就可以了（携带路径信息（webkitRelativePath））
4.后端根据路径信息，创建文件夹，并且按位置存放文件

### 断点序传

### 上传点暂停开始
1.暂停分片传输窗口
2.使用XMLHttpRequest.abort对已经发送对请求进行终止（使用的插件处理）
##### 后端逻辑分析
1.后端没有拿到完整到文件内容，将之前拿到到存在缓存中，等待之后拼接
2.前端，使用同一个到随机生成到fileId来标示这个文件


