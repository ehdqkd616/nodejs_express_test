// Client Util 모음

var util = {};

// 이미지 파일 인코딩 함수
util.imageURLToBase64 = function (url) {
    return new Promise(function (resolve, reject) {
        var canvas = document.createElement("canvas");
        var image = new Image();
        image.src = url;
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);

            var dataURL = canvas.toDataURL("image/png");

            resolve(dataURL);
        }
    });
}