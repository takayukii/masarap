/*
* This file demonstrates a basic ReactXP app.
*/
// This example uses ExperimentalNavigation on iOS and Android

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import RX = require('reactxp');
import Navigator, {
    NavigatorDelegateSelector as DelegateSelector,
    Types
} from 'reactxp-navigation';

import CameraView = require('./views/CameraView');
import ImagesView = require('./views/ImagesView');
import KeywordsView = require('./views/KeywordsView');

const client = new ApolloClient({ uri: 'https://fc4wys6td2.execute-api.us-east-1.amazonaws.com/dev/graphql' });

enum NavigationRouteId {
    MainPanel,
    SecondPanel,
    ThirdPanel
}

interface AppState {
    dataUrl: string;
    keyword: string;
}

class App extends RX.Component<{}, AppState> {
    private _navigator: Navigator;

    constructor(props: {}) {
        super(props);
        this.state = {
            dataUrl: '',
            keyword: ''
        };
    }

    componentDidMount() {
        this._navigator.immediatelyResetRouteStack([
            {
                routeId: NavigationRouteId.MainPanel,
                sceneConfigType: Types.NavigatorSceneConfigType.Fade
            }
        ]);
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <Navigator
                    ref={this._onNavigatorRef}
                    renderScene={this._renderScene}
                    delegateSelector={DelegateSelector}
                />
            </ApolloProvider>
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        this._navigator = navigator;
    };

    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return <CameraView onPressNavigate={this._onPressNavigateToSecond} />;

            case NavigationRouteId.SecondPanel:
                return (
                    <KeywordsView
                        dataUrl={this.state.dataUrl}
                        onPressNavigate={this._onPressNavigateToThird}
                        onNavigateBack={this._onPressBack}
                    />
                );

            case NavigationRouteId.ThirdPanel:
                return (
                    <ImagesView
                        keyword={this.state.keyword}
                        onNavigateBack={this._onPressBack}
                    />
                );
        }

        return null;
    };

    private _onPressNavigateToSecond = (dataUrl: string) => {
        this.setState({
            dataUrl
        });
        this._navigator.push({
            routeId: NavigationRouteId.SecondPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        });
    };

    private _onPressNavigateToThird = (keyword: string) => {
        this.setState({
            keyword
        });
        this._navigator.push({
            routeId: NavigationRouteId.ThirdPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        });
    };

    private _onPressBack = () => {
        this._navigator.pop();
    };
}

export = App;
