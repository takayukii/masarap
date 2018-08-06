/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');

import BackButton from '../../components/BackButton';
import SearchBox from '../../components/SearchBox';

import theme from '../../styles/theme';

const { width, height } = RX.UserInterface.measureWindow();

interface ImagesViewProps {
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
    search: RX.Styles.createViewStyle({
        flexGrow: 1,
        justifyContent: 'flex-end'
    }),
    scroll: RX.Styles.createScrollViewStyle({
        height: height - theme.header.height,
        alignSelf: 'stretch'
    }),
    listItems: RX.Styles.createViewStyle({
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20
    }),
    listItem: RX.Styles.createViewStyle({
        width: width / 2,
        marginTop: 20,
        paddingHorizontal: 10
    }),
    listItemImage: RX.Styles.createImageStyle({
        width: (width / 2) - (10 * 2),
        height: (width / 2) - (10 * 2),
    }),
    listItemText: RX.Styles.createTextStyle({
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center'
    })
};

class KeywordsView extends RX.Component<ImagesViewProps> {
    renderList() {
        return [1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(num => (
            <RX.View key={num} style={styles.listItem}>
                <RX.Button >
                    <RX.Image style={styles.listItemImage} source={'http://placekitten.com/g/300/300'} />
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
                    <BackButton onPress={this._onPressBack} />
                    <SearchBox style={ styles.search } />
                </RX.View>
                <RX.ScrollView style={ styles.scroll }>
                    <RX.View style={ styles.listItems }>
                        {this.renderList()}
                    </RX.View>
                </RX.ScrollView>
            </RX.View>
        );
    }

    private _onPressBack = () => {
        this.props.onNavigateBack();
    }

}

export = KeywordsView;