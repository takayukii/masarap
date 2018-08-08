import RX = require('reactxp');
import { default as RXImageSvg, SvgPath as RXSvgPath, Types as SvgTypes } from 'reactxp-imagesvg';
import { SyntheticEvent } from 'reactxp/dist/common/Types';

import theme from '../styles/theme';

const { width, height } = RX.UserInterface.measureWindow();

const styles = {
    container: RX.Styles.createViewStyle({
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }),
    loading: RX.Styles.createViewStyle({})
};

interface LoadingProps extends RX.CommonStyledProps<SvgTypes.ImageSvgStyleRuleSet> {
    message?: string;
    onPress?: (e: SyntheticEvent) => void;
}

class Loading extends RX.Component<LoadingProps, RX.Stateless> {
    private angle = new RX.Animated.Value(0);
    private animateStyle = RX.Styles.createAnimatedViewStyle({
        transform: [
            {
                rotate: RX.Animated.interpolate(this.angle, [0, 1], ['0deg', '360deg'])
            }
        ]
    });
    private animation = RX.Animated.timing(this.angle, {
        toValue: 1,
        duration: 1000,
        easing: RX.Animated.Easing.Linear(),
        delay: 0,
        loop: {
            restartFrom: 0
        }
    });

    componentDidMount() {
        console.log('animation start');
        this.animation.start();
    }

    componentWillUnmount() {
        console.log('animation stop');
        this.animation.stop();
    }

    render() {
        const { onPress, message } = this.props;
        // http://evil-icons.io/
        // ei-spinner-3
        const path =
            'M41.9 23.9c-.3-6.1-4-11.8-9.5-14.4-6-2.7-13.3-1.6-18.3 2.6-4.8 4-7 10.5-5.6 ' +
            '16.6 1.3 6 6 10.9 11.9 12.5 7.1 2 13.6-1.4 17.6-7.2-3.6 4.8-9.1 8-15.2 6.9-6' +
            '.1-1.1-11.1-5.7-12.5-11.7-1.5-6.4 1.5-13.1 7.2-16.4 5.9-3.4 14.2-2.1 18.1 3.' +
            '7 1 1.4 1.7 3.1 2 4.8.3 1.4.2 2.9.4 4.3.2 1.3 1.3 3 2.8 2.1 1.3-.8 1.2-2.5 1' +
            '.1-3.8 0-.4.1.7 0 0z';
        return (
            <RX.Button onPress={onPress ? onPress : () => {}} style={styles.container}>
                <RX.Animated.View style={[styles.loading, this.animateStyle]}>
                    <RXImageSvg width={theme.header.height} height={theme.header.height}>
                        <RXSvgPath fillColor='black' d={path} />
                    </RXImageSvg>
                </RX.Animated.View>
                {message ? <RX.Text>{message}</RX.Text> : null}
            </RX.Button>
        );
    }
}

export = Loading;
