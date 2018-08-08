/*
* This file demonstrates a basic ReactXP app.
*/

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import RX = require('reactxp');

import BackButton from '../modules/BackButton';
import SearchBox from '../modules/SearchBox';

import Loading from '../modules/Loading';
import theme from '../styles/theme';

interface ImagesViewProps {
    keyword: string;
    onNavigateBack: () => void;
}

interface ImagesViewState {
    keyword: string;
}

const SEARCH = gql`
    query search($keyword: String!) {
        results: searchImages(keyword: $keyword)  {
            title
            link
            imageLink
            thumbnailImageLink
        }
    }
`;

const { width, height } = RX.UserInterface.measureWindow();

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
        width: width / 2 - 10 * 2,
        height: width / 2 - 10 * 2
    }),
    listItemText: RX.Styles.createTextStyle({
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center'
    }),
    notFound: RX.Styles.createViewStyle({
        height: height - theme.header.height,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    })
};

type SearchImageResult = {
    title: string,
    link: string,
    imageLink: string,
    thumbnailImageLink: string
};

class ImagesView extends RX.Component<ImagesViewProps, ImagesViewState> {
    constructor(props: ImagesViewProps) {
        super(props);
        this.state = { keyword: props.keyword };
    }

    onSearch = (keyword: string) => {
        this.setState({ keyword });
    };

    renderList(data: { results: Array<SearchImageResult> }) {
        if (data.results.length > 0) {
            return data.results.map(result => (
                <RX.View key={result.imageLink} style={styles.listItem}>
                    <RX.Button>
                        <RX.Image
                            style={styles.listItemImage}
                            source={result.thumbnailImageLink}
                        />
                        <RX.Text style={styles.listItemText}>{result.title}</RX.Text>
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
        const { keyword } = this.state;
        return (
            <Query query={SEARCH} variables={{ keyword }}>
                {({ loading, error, data }) => {
                    if (loading || error) {
                        return <Loading />;
                    }
                    return (
                        <RX.View useSafeInsets={true} style={styles.container}>
                            <RX.View style={styles.header}>
                                <BackButton onPress={this._onPressBack} />
                                <SearchBox keyword={keyword}  onSearch={this.onSearch} />
                            </RX.View>
                            <RX.ScrollView style={styles.scroll}>
                                {
                                    loading || error ?
                                    <Loading/> :
                                    <RX.View style={styles.listItems}>{this.renderList(data)}</RX.View>
                                }
                            </RX.ScrollView>
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

export = ImagesView;
