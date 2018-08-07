# Yum Masarap

## client

### Prerequisites

* XCode
* Android Studio
* JDK 8

Prepare `android/local.properties` like this. 

```
# https://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found
sdk.dir=/Users/takayukii/Library/Android/sdk
```

### Run

#### Simulators

To run app on iOS simulator, just hit a following command.

```
$ yarn ios
```

To run app on Android Simulator, ensure run Android simulator in advance and hit a following command.

```
$ yarn android
```

#### iOS Device

To run the app on iOS device, you have to use XCode.

Use Apple ID witch has not connected to Apple Developer Account (Preferences > Accounts). Specified it to both Targets (e.g. RXPHelloWorld, RXPHelloWorldTests).

Also, you may need to modify Bundle Identifier like e.g. `org.reactjs.native.example.RXPHelloWorld.xxxxx` and node path in `Bundle React Native code and images` in `Build Phases`.

Following is node path example.

```
export NODE_BINARY=/Users/takayukii/.anyenv/envs/ndenv/shims/node
../node_modules/react-native/scripts/react-native-xcode.sh
``` 

### RN modules

#### react-native-camera

[https://github.com/react-native-community/react-native-camera](https://github.com/react-native-community/react-native-camera)

```
$ node_modules/.bin/react-native link react-native-camera
```

#### iOS

It required some entries on info.plist

##### Android

It required hectic gradle modifications

[https://github.com/react-native-community/react-native-camera/issues/1490](https://github.com/react-native-community/react-native-camera/issues/1490)
