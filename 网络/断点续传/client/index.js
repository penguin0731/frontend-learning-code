const domControls = {
    // 设置进度条
    setProgress(percent) {
        const inner = $(".progress").show().find(".inner");
        inner[0].clientHeight; // force reflow
        const percentStr = `${percent}%`;
        inner.css("width", percentStr);
        inner.find("span").text(percentStr);
    },
    // 设置按钮状态
    setControlStatus() {
        const btn = $(".btn.control");
        const status = btn[0].dataset.status;
        switch (status) {
            case "unchoose":
                btn.hide();
                break;
            case "choose":
                btn.show();
                btn.text("开始上传");
                break;
            case "uploading":
                btn.show();
                btn.text("暂停");
                break;
            case "pause":
                btn.show();
                btn.text("继续");
                break;
            case "finish":
                btn.hide();
                break;
        }
    },
    // 设置文件链接
    setLink(link) {
        $("#link").show().find("a").prop("href", link).text(link);
    },
};

// 文件分片
async function splitFile(file) {
    return new Promise((resolve) => {
        // 分片尺寸 1M
        const chunkSize = 1024 * 1024;
        // 分片数量（向上取整）
        const chunkCount = Math.ceil(file.size / chunkSize);
        // 当前chunk的下标
        let chunkIndex = 0;
        // 使用ArrayBuffer完成文件MD5加密
        const spark = new SparkMD5.ArrayBuffer();
        // 文件读取器
        const fileReader = new FileReader();
        // 存放分片的数组
        const chunks = [];

        // 读取下一个分片
        function loadNext() {
            const start = chunkIndex * chunkSize;
            const end = start + chunkSize > file.size ? file.size : start + chunkSize;
            // 以arrayBuffer的形式读取下一个分片文件，读取操作成功时触发load事件
            fileReader.readAsArrayBuffer(file.slice(start, end));
        }

        // 获取文件的后缀名
        function extname(filename) {
            // 获取文件名符号.最后出现的索引
            const i = filename.lastIndexOf(".");
            if (i < 0) {
                return "";
            }
            return filename.substr(i);
        }

        // 读取一个分片后的回调
        fileReader.onload = function (e) {
            // 分片的内容（arrayBuffer类型）
            const result = e.target.result;
            // 将分片数据加到MD5编码器中
            spark.append(result);
            const chunkMD5 = SparkMD5.ArrayBuffer.hash(result) + chunkIndex;
            chunkIndex++;
            chunks.push({
                id: chunkMD5,
                content: new Blob([result]),
            });

            if (chunkIndex < chunkCount) {
                loadNext();
            } else {
                // 读取完成
                const fileId = spark.end();
                resolve({
                    fileId,
                    ext: extname(file.name),
                    chunks,
                });
            }
        };

        loadNext();
    });
}

$(".btn.choose").click(function () {
    $("#file").click();
});

let fileInfo;
let needs; // 未上传的分片
const serverHost = "http://localhost:8888";
function setProgress() {
    const total = fileInfo.chunks.length;
    const percent = Math.ceil(((total - needs.length) / total) * 100);
    domControls.setProgress(percent);
}
$("#file").change(async function () {
    $(".modal").show();
    console.log(this.files);
    fileInfo = await splitFile(this.files[0]);
    const resp = await fetch(`${serverHost}/api/upload/handshake`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            fileId: fileInfo.fileId,
            ext: fileInfo.ext,
            chunkIds: fileInfo.chunks.map((it) => it.id),
        }),
    }).then((resp) => resp.json());
    console.log(resp);
    $(".modal").hide();
    const data = resp.data;
    if (Array.isArray(data)) {
        needs = data;
        $(".btn.control")[0].dataset.status = "choose";
    } else {
        needs = [];
        $(".btn.control")[0].dataset.stauts = "unchoose";
        domControls.setLink(data);
    }
    setProgress();
    domControls.setControlStatus();
});

// 上传分片
async function uploadPiece() {
    if (!needs) return;
    if (needs.length === 0) {
        // 上传完成
        setProgress();
        $(".btn.control")[0].dataset.status = "finish";
        domControls.setControlStatus();
        const link = `${serverHost}/upload/${fileInfo.fileId}${fileInfo.ext}`;
        domControls.setLink(link);
        return;
    }
    const status = $(".btn.control")[0].dataset.status;
    if (status !== "uploading") return;
    const nextChunkId = needs[0];
    const file = fileInfo.chunks.find((it) => it.id === nextChunkId).content;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("chunkId", nextChunkId);
    formData.append("fileId", fileInfo.fileId);
    const resp = await fetch(`${serverHost}/api/upload`, {
        method: "post",
        body: formData,
    }).then((resp) => resp.json());
    needs = resp.data;
    setProgress();
    uploadPiece(); // 递归调用
}
$(".btn.control").click(function () {
    const status = this.dataset.status;
    switch (status) {
        case "unchoose":
        case "finish":
            break;
        case "uploading":
            this.dataset.status = "pause";
            domControls.setControlStatus();
            break;
        case "choose":
        case "pause":
            this.dataset.status = "uploading";
            uploadPiece();
            domControls.setControlStatus();
            break;
    }
});
