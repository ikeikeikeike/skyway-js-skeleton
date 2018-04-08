window.Recorder = window.Recorder || {};


(function() {
"use strict";


window.Recorder.recordVideo = async function(stream) {
  const atag = document.getElementById('download');
  const btn = document.getElementById('stop');

  const chunks = [];
  const rec = await new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9'
  });

  btn.addEventListener('click', function() {
    console.log('click');
    rec.stop();
  })

  rec.addEventListener('dataavailable', function(e) {
    console.log(e.data);
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  });

  rec.addEventListener('stop', function() {
    console.log('stop');
    atag.href = URL.createObjectURL(new Blob(chunks));
    atag.download = 'recorded-stream.wav';
  });

  rec.start();
}



})();
