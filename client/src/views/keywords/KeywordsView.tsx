/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');

import BackButton from '../../components/BackButton';

import theme from '../../styles/theme';

const { height } = RX.UserInterface.measureWindow();

interface SecondPanelProps {
    onNavigateBack: () => void;
}

const styles = {
    container: RX.Styles.createViewStyle({
        flexDirection: 'column',
        minHeight: height,
        backgroundColor: theme.base.backgroundColor
    }),
    header: RX.Styles.createViewStyle({
        flexDirection: 'row',
        height: theme.header.height,
        borderBottomWidth: 1,
        borderColor: 'silver',
        shadowOffset: { height: 3, width: 0 },
        shadowColor: '#f0f0f0'
    }),
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        height: height - theme.header.height
    }),
    listItem: RX.Styles.createViewStyle({
        justifyContent: 'center',
        height: 60,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0'
    }),
    listItemText: RX.Styles.createTextStyle({
        fontSize: 20
    })
};

class KeywordsView extends RX.Component<SecondPanelProps> {
    renderList() {
        return [1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(num => (
            <RX.View key={num} style={styles.listItem}>
                <RX.Button >
                    <RX.Text style={ styles.listItemText }>
                        {num}
                    </RX.Text>
                </RX.Button>
            </RX.View>
        ));
    }

    render() {
        return (
            <RX.View useSafeInsets={ true } style={ styles.container }>
                <RX.View style={styles.header}>
                    <BackButton size={theme.backButton.size} onPress={this._onPressBack} />
                </RX.View>
                <RX.ScrollView style={ styles.scroll }>
                    {this.renderList()}
                </RX.ScrollView>
            </RX.View>
        );
    }

    private _onPressBack = () => {
        this.props.onNavigateBack();
    }

}

export = KeywordsView;