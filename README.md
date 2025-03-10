# British & Irish Lions Offical 2017 #
## Delivery of a native IOS and Android mobile app using React Native framework ##

### Technology stack ###
* **React Native**, **JSX** and **Flex** as the basis for the application’s presentation layer
* **Redux** for the unidirectional data managment
* **ES5** and **ES6** for JavaScript code
* **Babel** for ES6 → ES5 transpiling 
* [**Jest**](https://facebook.github.io/jest/) for testing and linting
* [**Axios**](https://github.com/mzabriskie/axios) for the async request handling
* Authentication flow with **JSON Web Tokens** via email address, Facebook or Google+ SDK
* **Git** for the version control management

### System Requirements ###

* [Homebrew](http://brew.sh/)
* [Xcode >= 8.0](https://developer.apple.com/xcode/)
* [Java development kit 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Java "1.8.0_51"
* [Android SDK](https://developer.android.com/studio/index.html)
* [node >= v6.4.0](https://nodejs.org/en/)
* [npm >= v3.10.3](https://www.npmjs.com/)
* [rnpm](https://github.com/rnpm/rnpm)
* [Watchman](https://www.npmjs.com/package/watchman)
* react CLI >= 1.0
* [react-native 0.37](https://facebook.github.io/react-native/docs/getting-started.html)
* [redux >= 3.5.2](http://redux.js.org)

### Setup the project ###

1.    Clone the git repo -> git@bitbucket.org:apdmageprojects/LionsOfficial.git
2.    cd to the local project directory
3.    $ npm i


### Run the app for IOS ###


```
#!terminal

$ react-native run-ios --simulator "iPhone 6s"
```

**- or -**

Hit the Run button in xcode

### Run the app for Android ###

1.    Have an Android emulator running (quickest way to get started), or a device connected
2.    You will need a file transfer software such as https://www.android.com/filetransfer/ install on your machine in order to emulate on your device
3.    
```
#!terminal

$ react-native run-android
```


### Run tests ###


```
#!terminal

$ npm test
```


### Font Icon use in the project ###
Material design -> http://ionicframework.com/docs/v2/ionicons/

### Market place guidelines ###
Apple store: https://developer.apple.com/app-store/review/guidelines/

Google play: https://play.google.com/about/developer-content-policy/