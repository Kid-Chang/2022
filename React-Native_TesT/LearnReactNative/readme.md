리액트 네이티브를 다루는 기술

# 0223

컴포넌트 스타일을 지정할 때 여러 스타일을 적용하고 싶다면 다음과 같이 배열 형태로 설정하면 됩니다.
`<View style={[styles.box, styles.rounded]} />`
`return <View style={[styles.box, props.rounded ? styles.rounded : null]} />;`
