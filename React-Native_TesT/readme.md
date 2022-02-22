# React Native



## RN init

```
$ npx react-native init LearnReactNative
```



### IOS 설정방법

아직 애플 실리콘이 호환되지 않으므로 애플 실리콘이 탑재된 맥OS의 경우에는 yarn ios 명령어를 실행하기 전에 다음 작업을 수행해야 합니다.

VS Code에서 ios/Podfile을 열고, use_flipper!()라는 코드를 찾아서 #으로 주석 처리하세요.

다음으로 터미널에서 프로젝트 내부의 ios 디렉터리로 이동한 뒤 ios에서 사용하는 라이브러리를 설치하세요.

```
$ cd ios
$ pod install
```



