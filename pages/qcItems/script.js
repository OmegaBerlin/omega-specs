var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var list = document.querySelector('#decoded');

var worker = new Worker('../../lib/zbar-processor.js');
worker.onmessage = function(event) {
    if (event.data.length == 0) {
        return;
    } else {
        var d = event.data[0];
        list.textContent = `${d[2]} (${d[0]})`;
        return displayQCValidation();
    }

};

function snapshot() {
    if (localMediaStream === null) return;
    var k = (320 + 240) / (video.videoWidth + video.videoHeight);
    canvas.width = Math.ceil(video.videoWidth * k);
    canvas.height = Math.ceil(video.videoHeight * k);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
        0, 0, canvas.width, canvas.height);

    var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    worker.postMessage(data);
}

setInterval(snapshot, 500);

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

if (navigator.getUserMedia) {
    navigator.getUserMedia({
            video: true
        },
        function(stream) { // success callback
            if (video.mozSrcObject !== undefined) {
                video.mozSrcObject = stream;
            } else {
                video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
            }
            localMediaStream = true;
        },
        function(error) {
            console.error(error);
        });
}

function displayQCValidation() {
    let footer = document.querySelector('#actions');
    if (!footer.innerHTML) {
        let button = document.createElement('button');
        button.className = 'button success';
        button.setAttribute('type', 'button');
        button.textContent = 'Pass';
        let button2 = document.createElement('button');
        button2.className = 'button alert pull-right';
        button2.setAttribute('type', 'button');
        button2.textContent = 'Fail';

        footer.appendChild(button);
        return footer.appendChild(button2);
    }
}
