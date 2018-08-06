/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');

import BackButton from '../../components/BackButton';

import theme from '../../styles/theme';

const { height } = RX.UserInterface.measureWindow();

interface KeywordsViewProps {
    onPressNavigate: () => void;
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
    }),
    notFound: RX.Styles.createViewStyle({
        height: height - theme.header.height,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    })
};

class KeywordsView extends RX.Component<KeywordsViewProps> {
    renderList() {
        const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        const random = Math.floor(Math.random() * list.length);
        list.splice(random, list.length - random);

        if (list.length > 0) {
            return list.map(num => (
                <RX.View key={num} style={styles.listItem}>
                    <RX.Button onPress={this.props.onPressNavigate}>
                        <RX.Text style={ styles.listItemText }>
                            {num}
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            ));
        }
        return (
          <RX.View style={styles.notFound}>
            <RX.Text>Not found.</RX.Text>
          </RX.View>
        );

    }

    render() {
        return (
            <RX.View useSafeInsets={ true } style={ styles.container }>
                <RX.View style={styles.header}>
                    <BackButton onPress={this._onPressBack} />
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
