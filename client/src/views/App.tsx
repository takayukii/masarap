/*
* This file demonstrates a basic ReactXP app.
*/
// This example uses ExperimentalNavigation on iOS and Android
import Navigator, { Types, NavigatorDelegateSelector as DelegateSelector } from 'reactxp-navigation';
import RX = require('reactxp');

import CameraView = require('./camera/CameraView');
import KeywordsView = require('./keywords/KeywordsView');
import ImagesView = require('./images/ImagesView');
import Loading = require('../modules/Loading');

enum NavigationRouteId {
    MainPanel,
    SecondPanel,
    ThirdPanel
}

class App extends RX.Component<{}, null> {
    private _navigator: Navigator;

    componentDidMount() {
        this._navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.MainPanel,
            sceneConfigType: Types.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        return (
            <Navigator
                ref={ this._onNavigatorRef }
                renderScene={ this._renderScene }
                delegateSelector={ DelegateSelector }
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        this._navigator = navigator;
    };

    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return <CameraView onPressNavigate={ this._onPressNavigateToSecond } />;

            case NavigationRouteId.SecondPanel:
                return <KeywordsView onPressNavigate={ this._onPressNavigateToThird } onNavigateBack={ this._onPressBack } />;

            case NavigationRouteId.ThirdPanel:
                return <ImagesView onNavigateBack={ this._onPressBack } />;
        }

        return null;
    };

    private _onPressNavigateToSecond = () => {
        const modalId = 'loading';
        RX.Modal.show(<Loading onPress={()=>{}} />, modalId);
        setTimeout(() => {
            this._navigator.push({
                routeId: NavigationRouteId.SecondPanel,
                sceneConfigType: Types.NavigatorSceneConfigType.Fade
            });
            setTimeout(() => {
                RX.Modal.dismiss(modalId);
            }, 1000);
        }, 1000);
    };

    private _onPressNavigateToThird = () => {
        const modalId = 'loading';
        RX.Modal.show(<Loading onPress={()=>{}} />, modalId);
        setTimeout(() => {
            this._navigator.push({
                routeId: NavigationRouteId.ThirdPanel,
                sceneConfigType: Types.NavigatorSceneConfigType.Fade
            });
            setTimeout(() => {
                RX.Modal.dismiss(modalId);
            }, 1000);
        }, 1000);
    };

    private _onPressBack = () => {
        this._navigator.pop();
    };
}

export = App;
