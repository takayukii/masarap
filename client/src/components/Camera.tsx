import extend = require('lodash/extend');
import RX = require('reactxp');

import {StyleRuleSetRecursive, ViewStyleRuleSet} from 'reactxp/dist/common/Types';

export interface CameraProps extends RX.CommonProps {
    style?: StyleRuleSetRecursive<ViewStyleRuleSet>
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
            let combinedStyles = extend({
                display: 'flex'
            }, RX.Styles.combine(this.props.style));
            combinedStyles = extend({
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
            }, combinedStyles);
            return (
                <video
                    ref='video'
                    style={ combinedStyles }
                    autoPlay
                    playsInline
                />
            );
        }
        return null;
    }
}

export default Camera;
