/*
* This file demonstrates a basic ReactXP app.
*/

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import RX = require('reactxp');

import BackButton from '../modules/BackButton';
import Loading from '../modules/Loading';

import theme from '../styles/theme';

interface KeywordsViewProps {
    dataUrl: string;
    onPressNavigate: () => void;
    onNavigateBack: () => void;
}

const DECODE = gql`
    query decode($dataUrl: String!) {
        words: decodeImage(dataUrl: $dataUrl)
    }
`;

const { height } = RX.UserInterface.measureWindow();

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
    renderList(data: {words: Array<string>}) {
        if (data.words.length > 0) {
            return data.words.map(word => (
                <RX.View key={word} style={styles.listItem}>
                    <RX.Button onPress={this.props.onPressNavigate}>
                        <RX.Text style={styles.listItemText}>{word}</RX.Text>
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
        const { dataUrl } = this.props;
        return (
          <Query query={DECODE} variables={{ dataUrl }}>
              {({ loading, error, data }) => {
                  console.log('data', data);
                  if (loading || error) {
                      return <Loading />;
                  }
                  return (
                      <RX.View useSafeInsets={true} style={styles.container}>
                          <RX.View style={styles.header}>
                              <BackButton onPress={this._onPressBack} />
                          </RX.View>
                          <RX.ScrollView style={styles.scroll}>{this.renderList(data)}</RX.ScrollView>
                      </RX.View>
                  );
              }}
          </Query>
        );
    }

    private _onPressBack = () => {
        this.props.onNavigateBack();
    };
}

export = KeywordsView;
