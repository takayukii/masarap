/*
* This file demonstrates a basic ReactXP app.
*/

import Camera from 'modules/Camera';
import RX = require('reactxp');

import theme from '../styles/theme';

interface MainPanelProps {
    onPressNavigate: (dataUrl: string) => void;
}

const { height } = RX.UserInterface.measureWindow();

const styles = {
    container: RX.Styles.createViewStyle({
        flexDirection: 'column',
        minHeight: height,
        backgroundColor: theme.base.backgroundColor
    }),
    camera: RX.Styles.createViewStyle({
        flexGrow: 1
    }),
    buttons: RX.Styles.createViewStyle({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    }),
    roundButton: RX.Styles.createViewStyle({
        height: theme.snapButton.height,
        width: theme.snapButton.width,
        margin: 16,
        borderRadius: theme.snapButton.width / 2,
        backgroundColor: theme.snapButton.backgroundColor
    })
};

class CameraView extends RX.Component<MainPanelProps, null> {
    private camera: any;

    render() {
        return (
            <RX.View style={styles.container}>
                <RX.View style={styles.camera}>
                    <Camera ref={(ref: any) => (this.camera = ref)} />
                </RX.View>
                <RX.View style={styles.buttons}>
                    <RX.Button style={styles.roundButton} onPress={this._onPressNavigate} />
                </RX.View>
            </RX.View>
        );
    }

    private _onPressNavigate = () => {
        if (this.camera) {
            this.camera
                .takePicAsync()
                .then((base64: string) => {
                    this.props.onPressNavigate(base64);
                })
                .catch(console.log);
        }
    };
}

export = CameraView;
