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

To run app on iOS simulator, just hit a following command.

```
$ yarn ios
```

To run app on Android Simulator, ensure run Android simulator in advance and hit a following command.

```
$ yarn android
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
