# Keller Williams Consumer Mobile App

## To Setup

1. Clone the repo

```sh
$ git clone git@github.com:KWRI/kw-consumer-mobile-app.git
```

2. Change the current directory

```sh
$ cd kw-consumer-mobile-app
```

3. Install all the dependencies

```sh
# Install yarn if you don't have it yet
$ npm install -g yarn

# Install dependencies:
$ yarn install 

```
4. Install cocoapods dependencies

```sh
# Install cocoapods if you don't have it yet
$ sudo gem install cocoapods

$ cd ios

# Install dependencies:
$ pod install

$ cd ..
```



## To run iOS/Android

```sh
$ yarn run ios
$ yarn run android
```

## To add dependencies

If you want to add a new dependency to package.json. For instance `react-native-interactable`

```sh
$ yarn add react-native-interactable
```

If it is a dev dependency

```sh
$ yarn add eslint-plugin-prettier --dev
```

## Known issues

* Error in building project for case-sensitive file systems (Mac OS):
```
Installing build/Build/Products/Debug-iphonesimulator/kwConsumerMobile.app
An error was encountered processing the command (domain=NSPOSIXErrorDomain, code=2):
Failed to install the requested application
An application bundle was not found at the provided path.
Provide a valid path to the desired application bundle.
Print: Entry, ":CFBundleIdentifier", Does Not Exist

```
troubleshooting: https://github.com/react-community/react-native-maps/issues/2439