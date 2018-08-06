/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');

import Camera from '../../components/Camera';
import theme from '../../styles/theme';

const { height } = RX.UserInterface.measureWindow();

interface MainPanelProps {
    onPressNavigate: () => void;
}

const styles = {
    container: RX.Styles.createViewStyle({
        flexDirection: 'column',
        minHeight: height
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
    render() {
        return (
            <RX.View style={ styles.container }>
                <RX.View style={ styles.camera }>
                    <Camera />
                </RX.View>
                <RX.View style={ styles.buttons }>
                    <RX.Button style={ styles.roundButton } onPress={ this._onPressNavigate }/>
                </RX.View>
            </RX.View>
        );
    }
    
    private _onPressNavigate = () => {
        this.props.onPressNavigate();
    }
}

export = CameraView;
