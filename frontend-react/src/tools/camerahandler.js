const CameraHandler = () => {
    if(!("mediaDevices" in navigator)){
        console.log("Camera not supported");
        return;
    }
    
    let video = document.createElement("video");
    let stream = null;

    // https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos

    const switchOn = async () =>{
        //create video element
        

        // Get camera media stream and set it to player
       await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480 },
                    audio: false,
                    facingMode: 'user', // or environment
                    }).then( mediaStream => {
                        video.srcObject = stream = mediaStream;
                        video.play();
                    })
    }

    const switchOff = () => {
        video.pause();

        video = null;
        stream = null;
        //stream.getTracks()[0].stop();
    }

    const takePhoto = () => {
        // Create a canvcas to draw on
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', 640);
        canvas.setAttribute('height', 480);
        let context = canvas.getContext('2d');

        // Copy image from video to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert image to data string
         const photo = context.canvas.toDataURL();
        
        // Release resources
        context = null;
        canvas = null;

        return photo;
    }   
    
    return {

        switchOn,
        switchOff,
        takePhoto
    } ;
}

export default CameraHandler;