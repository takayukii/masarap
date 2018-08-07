import RX = require('reactxp');

interface CameraProps extends RX.CommonProps {}

class Camera extends RX.Component<CameraProps, null> {
    private camera: any;
    render() {
        const { RNCamera } = require('react-native-camera');
        const { StyleSheet } = require('react-native');

        const styles = StyleSheet.create({
            camera: {
                flexGrow: 1
            }
        });
        return (
            <RNCamera
                ref={(ref: any) => this.camera = ref}
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            />
        );
    }
}

export default Camera;
