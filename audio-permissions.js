navigator.mediaDevices.getUserMedia({audio: true, video: false});

const playAudioContext = {
    deviceId: "",
    deviceLabel: "CABLE Output",
    audioContext: null,
    sourceAudioNode: null,
    playSoundButton: null
}

{
    const menu = document.getElementById("docs-menubar")
    const playSoundButton = document.createElement('img');
    playSoundButton.setAttribute("class","menu-button goog-control goog-inline-block ks1ke3-menu-height");
    playSoundButton.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3UlEQVR4nN3Wz4tOURzH8RcG2WoIifx4BiWbKdnYYCOkPFlY2pBfaz82iPwPomRBmZRYKUVDTc1qVnYy+bUxFiRkITr63jrd7vPTnafGp073Od97n/Pufr/f+zmHOaYhjMR1YNqIl/iNccwfFPRdQIvRmG1oA+9L0DRGWzx/FE+wbTag7cDDuIWfONMPdKQNtB240AF8xrVeoR/aQKvAJ3Aei7LYdnyJe7VAq8B7MIOJSHehJn5gSxFYgiM4FiM1w6ouoa1Snf4/GWNxFr+Hh8XkcWmh/bjaJbRdjVdEb+S13YRfkc2/P8oLXe8RvBrTuIyFGegQvmNZFhuP5yoX6hU8L2r4GvczyIKIncxiqfGe1QUutAbfsDuL3cDdbL4Xn+oGJz3AlWx+Di+y+WiU9/8Ar41U78piN3GnlOqZOsHN6OyxUnNNlxzrAp7W9TktxytcLB0OmpGB4Sz2HJeqDGRf1KguA0lmVGhzvGijyjK3YmXFht+PZU6UNouxaL6eTxvdgHfiY6R0aRY/HC6W3rqjNuBtj+AEOFuyzh34iuPdQLuFdzoIHIy9OK91LfBW4LQx3I6jz6l+oJ3grcCn47CXmvWftR5vSuDkVgPROkwF9JEBayg+t2SJc0t/AC6MQ4qkrL/HAAAAAElFTkSuQmCC");
    //playSoundButton.innerText = 'C';
    menu.appendChild(playSoundButton);
    playAudioContext.playSoundButton = playSoundButton;
    
    const stopSoundButton = document.createElement('img');
    stopSoundButton.setAttribute("class","menu-button goog-control goog-inline-block ks1ke3-menu-height");
    stopSoundButton.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABG0lEQVR4nN3WsU6DQBzH8a/KwiO0C2oKg60uMPgO9QW6deqmD6HdO/c1OnXtG7i4aoy6Gl2bGJpL/iSEIlyE/5H6Sy5cGP4fuBx/Dg4sHhDJ1VkGwBOQAhvg2BX6Jmg2Qm00BN4LqBlxF2iqCYcVqBoc1qAqcGSBNoJ9YALMZFwBfeDDAm0ErwuFboC5JdoI/ikptPwDPATuSuonspJ7SVuCL4EvYJGrfS335powMv8UPMnN0Yazt/wGtlXov4Hj3PLm50ea8EXF5rrX/JxMp7stqW822dSmgYyBBxcNxC+0zBHQK/nhtw7/llPgpQvYJLDA1Q4CQQ2uevQJgOcu4CpcHTY5B14LsHkgJzkDHgVd4TieHO5PXMONswM/MBcBugKnUwAAAABJRU5ErkJggg==");
    //stopSoundButton.innerText = 'D';
    menu.appendChild(stopSoundButton);
     
    if (!navigator.mediaDevices?.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
      } else {
        // List cameras and microphones.
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            devices.forEach((device) => {
              if(device.label.includes(playAudioContext.deviceLabel)){
                playAudioContext.deviceId = device.deviceId;
                console.log(`Selected: ${device.kind}: ${device.label} id = ${device.deviceId}`);
              } else {
                console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
              }
            });
          })
          .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
          });
      }
  
    playSoundButton.addEventListener('click', () => {
        initAudio();
    });
    stopSoundButton.addEventListener('click', () => {
        disconnectStream() ;
    });
  
  }
  
  function connectStream(stream) {
    if(playAudioContext.audioContext == null){
        playAudioContext.audioContext = new AudioContext();
    }
    playAudioContext.sourceAudioNode = playAudioContext.audioContext.createMediaStreamSource(stream);
    playAudioContext.sourceAudioNode.connect(playAudioContext.audioContext.destination);
    playAudioContext.playSoundButton.setAttribute("class","menu-button goog-control goog-inline-block ks1ke3-menu-height ks1ke3-playing");
  }

  function disconnectStream() {
    if(playAudioContext.audioContext != null){
      playAudioContext.sourceAudioNode.disconnect();
      playAudioContext.audioContext.close();
      playAudioContext.sourceAudioNode = null;
      playAudioContext.audioContext = null;
    }
    playAudioContext.playSoundButton.setAttribute("class","menu-button goog-control goog-inline-block ks1ke3-menu-height");
  }
  
  function initAudio() {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;
  
    const mediaConstrains = {
        "audio": { 
            deviceId: playAudioContext.deviceId,
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            voiceIsolation: false,
            suppressLocalAudioPlayback: false
        },
    }
    console.log(`Loading device ${mediaConstrains.audio.deviceId}`);
    navigator.getUserMedia(mediaConstrains, connectStream, function(e) {
            alert('Error getting audio');
            console.log(e);
    });

  }