import RX = require('reactxp');

interface CameraProps extends RX.CommonProps {}

class Camera extends RX.Component<CameraProps, null> {
    private video: HTMLVideoElement;
    private constraints = {
        audio: false,
        video: {
            // facingMode: {
            //     exact: "environment"
            // }
        }
    };

    componentDidMount() {
        this.video = document.querySelector('video');
        window.navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess).catch(this.handleError);
    }

    handleSuccess = (stream: MediaStream) => {
        const videoTracks = stream.getVideoTracks();
        console.log('Using video device: ' + videoTracks[0].label);
        this.video.srcObject = stream;
    };

    handleError = (error: Error) => {
        console.log('navigator.getUserMedia error: ', error);
    };

    render() {
        return (
            <video
                ref='video'
                style={{
                    display: 'flex',
                    position: 'absolute',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    top: '50%',
                    left: '50%',
                    WebkitTransform: 'translate(-50%,-50%)',
                    MozTransform: 'translate(-50%,-50%)',
                    msTransform: 'translate(-50%,-50%)',
                    transform: 'translate(-50%,-50%)'
                }}
                autoPlay
                playsInline
            />
        );
    }
}

export default Camera;
