# Node + React 무비앱 만들기.

readme는 한글로,,, 주석은 영어로,,,

## 0205

`<React.Fragment>` 란?
<></> 이렇게 썻던 부분이 프레그먼트 이더라....
프레그먼트를 쓰면 좋은 점이 렌더링될때 의미없이 리턴값을 크게 감싸주기위해 `<div></div>`로 하는 낭비가 줄어든다.
그리고 `<React.Fragment>` 라고 명시적으로 써줘야하는 경우가 있다.
리스. map으로 idx할당해서 뿌려줄때, `< key{idx}> `이런식으로는 오류가 생긴다. 필자도 그래서 map을 쓰는 경우에 `<div>`를 사용했었다.
하지만, `<React.Fragment key={idx}>`와 같은 방법으로 이젠 프레그먼트로도 idx를 할당할 수 있다.

antd를 이용해서 grid card 만들기 까지.

## 0207

Schema 내부에

```
 userForm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
```

이런식으로 작성하면 USER schema의 ObjectId도 담아서 보관할 수 있다.

## 0208

antd의 Popover를 이용해서 호버 구현 및 favorite list에서도 삭제가 가능하도록.
