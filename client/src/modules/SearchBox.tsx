import RX = require('reactxp');
import { default as RXImageSvg, SvgPath as RXSvgPath, Types as SvgTypes } from 'reactxp-imagesvg';

import theme from '../styles/theme';

const styles = {
    container: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    }),
    text: RX.Styles.createTextInputStyle({
        flexGrow: 1,
        borderColor: 'silver',
        borderBottomWidth: 1,
        fontSize: 20,
        height: theme.header.height - 20,
        backgroundColor: '#f8f8f8'
    }),
    button: RX.Styles.createButtonStyle({
        flexGrow: 0,
        height: theme.header.height - 20
    }),
    svg: RX.Styles.createImageStyle({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    })
};

interface SearchBoxProps extends RX.CommonStyledProps<SvgTypes.ImageSvgStyleRuleSet> {
    keyword?: string;
    onSearch: (keyword: string) => void;
}

interface SearchBoxState {
    keyword: string;
}

class SearchBox extends RX.Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = { keyword: props.keyword };
    }

    private onChangeText = (keyword: string) => {
        this.setState({ keyword });
    };

    private onKeyPress = (e: RX.Types.KeyboardEvent) => {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
            this.props.onSearch(this.state.keyword);
        }
    };

    render() {
        // http://evil-icons.io/
        // ei-search
        const path1 =
            'M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13zm0-' +
            '24c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11z';
        const path2 = 'M32.682 31.267l8.98 8.98-1.414 1.414-8.98-8.98z';

        const { onSearch } = this.props;
        return (
            <RX.View style={styles.container}>
                <RX.TextInput
                    style={styles.text}
                    value={this.state.keyword}
                    onChangeText={this.onChangeText}
                    onKeyPress={this.onKeyPress}
                />
                <RX.Button style={styles.button} onPress={() => onSearch(this.state.keyword)}>
                    <RXImageSvg
                        width={theme.header.height - 1}
                        height={theme.header.height - 1}
                        style={styles.svg}
                    >
                        <RXSvgPath fillColor='black' d={path1} />
                        <RXSvgPath fillColor='black' d={path2} />
                    </RXImageSvg>
                </RX.Button>
            </RX.View>
        );
    }
}

export default SearchBox;
