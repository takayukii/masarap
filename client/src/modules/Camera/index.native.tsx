import RX = require('reactxp');
import { RNCamera } from 'react-native-camera';
import { StyleSheet } from 'react-native';

interface CameraProps extends RX.CommonProps {}

class Camera extends RX.Component<CameraProps, null> {
    private camera: any;

    public takePicAsync: () => Promise<string> = () => {
        return new Promise((resolve, reject) => {
            this.camera
                .takePictureAsync({ quality: 0.5, base64: true })
                .then((result: any) => {
                    resolve(result.base64);
                })
                .catch(reject);
        });
    };

    render() {
        const styles = StyleSheet.create({
            camera: {
                flexGrow: 1
            }
        });
        return (
            <RNCamera
                ref={(ref: any) => (this.camera = ref)}
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            />
        );
    }
}

export default Camera;
