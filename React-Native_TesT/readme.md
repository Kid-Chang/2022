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

## 리액트 네이티브를 다루는 기술

# 0223

컴포넌트 스타일을 지정할 때 여러 스타일을 적용하고 싶다면 다음과 같이 배열 형태로 설정하면 됩니다.
`<View style={[styles.box, styles.rounded]} />`
`return <View style={[styles.box, props.rounded ? styles.rounded : null]} />;`

RN에서는 onClick 대신 onPress를 사용한다.
`<Button title="토글" onPress={onPress} />`

statusBar에 원하는 색상 지정하기.
안드로이드는

```js
<StatusBar backgroundColor="#26a69a" />
```

iOS는

```js
<SafeAreaProvider>
      <SafeAreaView edges={['bottom']}>

      ...
```

여기서 iOS나 안드로이드 각 상태바 내용 색상을 변경하려면 barStyle의 설정을 조율해주면 된다.

```
<StatusBar backgroundColor="#26a69a" barStyle="light-content" />
```

이런식으로 한다.

# 0224

iOS 디바이스 리스트확인 `xcrun simctl list devices`

디바이스 지정 run `yarn react-native run-ios --simulator="iPhone 5s"`

Image 컴포넌트 사용시.

```
resizeMode는 총 5가지 값으로 설정할 수 있습니다.

• cover: resizeMode를 따로 설정하지 않으면 이 값을 기본값으로 지정합니다. 이 옵션은 이미지의 가로 세로 비율을 유지한 상태로 이미지를 리사이징합니다. 이미지와 뷰의 가로 세로 비율이 일치하지 않을 경우 이미지의 일부분이 잘립니다.

• contain: 이미지의 가로 세로 비율을 유지한 상태로 이미지를 리사이징하며 이미지의 모든 영역이 뷰 안에 보이게 합니다.

• stretch: 뷰의 크기대로 이미지를 리사이징합니다. 이 과정에서 이미지의 가로 세로 비율이 원본과 달라질 수 있습니다.

• repeat: 뷰의 크기가 이미지의 크기보다 크면 바둑판식으로 이미지를 반복합니다.

• center: 이미지를 뷰 중앙에 둡니다. contain과 마찬가지로 이미지의 모든 영역이 뷰 안에 보이게 합니다. 단, 뷰가 이미지보다 크면 이미지의 크기가 커지지 않고 원본 사이즈를 유지합니다.
```

또한, 폴더내 이미지를 불러올경우엔
`source={require('../assets/images/circle.png')}`을, 인터넷에서 정보를 가져올 떄는 `source={{uri: 'https://via.placeholder.com/150'}} `
이런식으로 이용.

중괄호가 두번 겹쳐져 있는 것은 객체 타입의 값을 Props로 넣었기 때문.

안드로이드는 기본 배경색상이 연한 회색임을 주의.
기본 배경을 지정하는 스타일시트에 하단 코드를 추가하는 것이 좋음.
` backgroundColor: 'white',`

키보드가 필요한 상황에서 안드로이드는 화면이 줄어들면서 Input태그가 있는 부분이 상단으로 올라오지만, iOS는 화면 하단이 그냥 키보드에 가려진다. 이를 해결하기 위해서는 `KeyboardAvoidingView`를 이용해야한다.

`<KeyboardAvoidingView behavior={Platform.select({ios: 'padding'})} style={styles.avoid}>`
이 코드를 최상위 컴포넌트 SafeAreaView바로 하단에 넣어준다.

`'height', 'position'` 옵션도 있지만, 의도한대로 동작하지 않는다.

그리고 운영체제별 설정을 다르게 할때

1. Platform.OS + 삼항연산자 조합
   `{Platform.OS === 'ios' ? 'padding' : undefined}`
2. Platform.select
   `{Platform.select({ios: 'padding', android: undefined})}` 물론 android 부분 자체를 생략해도 된다.

`onChangeText`는 사용자가 내용을 수정할 때마다 호출되는 콜백 함수이며, 이 콜백 함수가 호출될 때는 현재 TextInput의 내용을 인자로 넣어서 호출됩니다.

**TextInput**
`TextInput`태그에 padding을 지정해줌으로서 실제 TextInput Box에서 벗어난 범위에 터치해도 인식이 되도록 설정해준다.

`onSubmitEditing`은 Enter를 눌렀을 때 호출되는 함수이다.

`returnKeyType`은 iOS에서 엔터부분 설명타입을 변경해주는 역할.
"done"으로 설정하면 완료 라고 표시된다.
더 다양한 타입은 https://reactnative.dev/docs/textinput 참고.

**버튼**
터치할 수 있는 영역을 다음 컴포넌트 중 하나로 감싸면 됩니다.

```
• TouchableHighlight: 터치했을 때 배경색을 변경합니다.

• TouchableNativeFeedback: 터치했을 때 안드로이드에서 물결 효과를 보여줍니다. 안드로이드에서만 사용 가능하며, iOS에서 사용 시 오류가 발생합니다.
이 태그 하위에 만든 버튼이 사각형이 아닌 원형등 다른 모양이면, 이 태그 상위에 View태그와 borderRadius, overflow를 적절히 이용하여준다.

• TouchableOpacity: 터치했을 때 투명도를 조정합니다.

• TouchableWithoutFeedback: 터치했을 때 아무 효과도 적용하지 않습니다.
```

**FlatList**
`data`, `render`, `keyExtractor` 필수.
https://velog.io/@djaxornwkd12/React-Native-FlatList%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90

앱에 react-native-vector-icons 인스톨하고 iOS, 안드로이드 세팅하기.
https://thebook.io/080236/ch04/05/01/

https://oblador.github.io/react-native-vector-icons/ 링크참고해서 사용할 브랜드를 임포트해야한다.

`Alert.alert`의 style는 iOS에만 적용됨.

`{ cancelable: true, onDismiss: () => { console.log('hello'); } `는 안드로이드에서 뒤로가기나 박스 바깥 영역을 터치했을때만 작동하는 코드.

**AsyncStorage**
`yarn add @react-native-community/async-storage`
웹의 로컬스토리지 역할.

여기에 문자열만 넣을 수 있다.
`JSON.stringify(value)`를 이용해 값을 저장하고,
`JSON.parse(value)`를 통해 다시 JSON으로 변환한다.

AsyncStorage와 useEffect사용할 때 순서도 중요. 불러오기 뒤에 저장이 있어야함.

```
useEffect(() => {
    todosStorage.get().then(setTodos).catch(console.error);
  }, []);

  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
  }, [todos]);
```

# 0225

react-navigation 적용

```
  cd LearnReactNavigation && yarn add @react-navigation/native
  yarn add react-native-screens react-native-safe-area-context
  cd ios && pod install && cd ..
  yarn add @react-navigation/native-stack
```

```
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return <NavigationContainer>{/* 내비게이션 설정 */}</NavigationContainer>;
}

export default App;
```

`navigation.navigate('Detail')` 또는 `navigation.push('Detail')` 키워드를 통해 이동할 수 있다.
파라미터도 넘겨주려면 `('Detail', {id: 1})` 이런식으로 객체타입을 넘겨줄 수 있다.
이동한 페이지에서 값을 받으려면 `({route})` 로 받고, `route.params.(받은 값)`로 출력해줘야한다.
단순히 `(data)`로 받고 `data`를 출력하면,

```json
{"navigation": {"addListener": [Function addListener], "canGoBack": [Function canGoBack], "dispatch": [Function dispatch], "getParent": [Function getParent], "getState": [Function anonymous], "goBack": [Function anonymous], "isFocused": [Function isFocused], "navigate": [Function anonymous], "pop": [Function anonymous], "popToTop": [Function anonymous], "push": [Function anonymous], "removeListener": [Function removeListener], "replace": [Function anonymous], "reset": [Function anonymous], "setOptions": [Function setOptions], "setParams": [Function anonymous]}, "route": {"key": "Detail-b6XtBc_lBBVkAYPbE0bFB", "name": "Detail", "params": {"id": 1}}}
```

`({route})`로 받고, `route`를 출력하면,

```json
{
    "key": "Detail-b6XtBc_lBBVkAYPbE0bFB",
    "name": "Detail",
    "params": { "id": 1 }
}
```

이런 값이 나온다.

아니면 간단하게 받을 때부터 `({route: {params}})`로 받고 `params.(받은 값)`로 출력해도 좋다.
