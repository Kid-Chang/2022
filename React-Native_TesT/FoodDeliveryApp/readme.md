# FoodDeliveryApp-ReactNatvie_ZeroCho

## 0222

`StyleSheet.create({})` 이용하는 건 다 JSX내부에서 함으로 camelCase.
`border: 1px solid black` 이런식으로 안됨. 다 풀어줘야한다.

```
borderWidth: 1,
borderStyle: "solid",
borderColor: "black"
```

텍스트들은 항상 `<Text></Text>` 태그로 감싸줘야한다.
가장 바깥부분은 `<SafeAreaView></SafeAreaView>`로 감싸준다. 그래야 펀치홀이나 노치등의 부분들을 제외하고 내용들을 채울 수 있다.

```js
<Text
  style={[
    styles.sectionTitle,
    {
      color: isDarkMode ? Colors.white : Colors.black,
    },
  ]}>
  {title}
</Text>
```

여기서 `style`을 보면 배열이 들어가있다, 이는 순차적으로 적용한다는 뜻인데, `styles` 시트의 `sectionTitle`의 속성을 적용한 후, color는 조건부로 이용한다는 의미이다.
이렇게 하는 이유는 스타일시트는 조건문을 적용할 수 없어서인데, 스타일드 컴포넌트 처럼 스타일들은 분리할 수 있으면 분리하되, 조건부는 배열의 일부로 넣어주는 방식을 이용하면 된다.

flex에서는 flexDirection이 Column이 default

App.tsx 예제 코드 오류발생 시
https://wiwi-pe.tistory.com/162
