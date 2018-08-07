import RX = require('reactxp');
import { SyntheticEvent } from 'reactxp/dist/common/Types';
import { default as RXImageSvg, SvgPath as RXSvgPath, Types as SvgTypes } from 'reactxp-imagesvg';

import theme from '../styles/theme';

export interface BackButtonProps extends RX.CommonStyledProps<SvgTypes.ImageSvgStyleRuleSet> {
    onPress: (e: SyntheticEvent) => void;
}

class BackButton extends RX.Component<BackButtonProps, RX.Stateless> {
    render() {
        // http://evil-icons.io/
        // ei-chevron-left
        const path = 'M27.3 34.7L17.6 25l9.7-9.7 1.4 1.4-8.3 8.3 8.3 8.3z';
        return (
            <RX.Button onPress={this.props.onPress}>
                <RXImageSvg width={theme.header.height} height={theme.header.height}>
                    <RXSvgPath fillColor="black" d={path} />
                </RXImageSvg>
            </RX.Button>
        );
    }
}

export default BackButton;
