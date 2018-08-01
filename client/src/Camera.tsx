import RX = require('reactxp');

export interface CameraProps extends RX.CommonProps {
}

const constraints = {
    audio: false,
    video: {
        // facingMode: {
        //     exact: "environment"
        // }
    }
};

class Camera extends RX.Component<CameraProps, null> {
    private video: HTMLVideoElement;

    componentDidMount() {
        this.video = document.querySelector('video');
        window.navigator.mediaDevices.getUserMedia(constraints).then(this.handleSuccess).catch(this.handleError);
    }

    handleSuccess = (stream: MediaStream) => {
        const videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints:', constraints);
        console.log('Using video device: ' + videoTracks[0].label);
        stream.oninactive = function() {
            console.log('Stream inactive');
        };
        this.video.srcObject = stream;
    };

    handleError = (error: Error) => {
        console.log('navigator.getUserMedia error: ', error);
    };

    render() {
        if (RX.Platform.getType() === 'web') {
            return (
                <video autoPlay playsInline />
            );
        }
        return null;
    }
}

export default Camera;
