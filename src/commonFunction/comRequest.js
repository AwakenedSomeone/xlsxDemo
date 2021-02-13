//存放常用的请求函数

export default {
    uploadFile (obj,files, func, conf) {
        let fd = new FormData();
        for (var i = 0; i < files.length; i++) {
            fd.append('file', files[i].raw);
        }
        let config = Object.assign({}, conf);
        config.headers= {
            'Content-Type': 'multipart/form-data'
        };
        obj.postF(obj, "UploadPic", fd, config).then((res) => {
            if (res.state == 0) {
                var items = res.ext;
                var fileArr = [];
                items.forEach((item) => {
                    fileArr.push(item.filePath);
                })
                func(fileArr);
            } else {
                this.$tip({ isTip: true, message: "上传失败" })
            }
        })
    }
}