# Node + React 기본 학습

readme는 한글로,,, 주석은 영어로,,,

## 0201 학습상황.

브라우저가 값을 받아오는건 REST API의 get에 해당한다.

## 0202 학습상황.

.get .post등 REST API 부분을 각각 Route라고 부른다.

## 0203 학습상황.

jwt 토큰을 이용한 로그인 로직.

1. client의 쿠키에 보관된 토큰을 서버가 받으면 decode key를 복호화한다.
2. userId값을 받고, 이 id값에 동일한 토큰이 저장되어있는지 확인한다.
3. 쿠키가 일치하면 Auth True. 틀리면 Auth False.

이후 익스프레스의 Router를 사용하면 method으로 분류하기에,
/api/user/login
/api/product/create 등 세분화해서 작성해야한다.

미들웨어란? 리퀘스트를 받고 콜백함수를 실행하기전에 특정한 액션을 하는 것.

## 0204

Concurrently 로 메인폴더에서 npm run backend 와 client폴더에서 npm run start 해야하는 걸 한번에 설정가능하도록 변경.
`"dev": "concurrently \"npm run backend\" \"npm run start --prefix client\" "`

-   리덕스 개념을 들으면서 pure function에 대해 찾아봤다.

pure function(순수함수)은
input : 어떠한 함수에서 외부의 데이터를 직접적으로 사용하지 않고, 파라미터로 받습니다.
output : input값에 의해 output이 결정되기 때문에 외부의 값들이 변경되더라도 함수 자체에는 외부에 영향을 받지 않기 때문에 Side-Effect(부작용)가 없다.

순수 함수:

```
def pure_function(x, y):

temp = x + 2*y

return temp / (2*x + y)
```

Impure function:

비순수 함수:

```
some_list = [] def impure(arg):  some_list.append(arg)
```

관련 글 참조: https://velog.io/@kimu2370/redux%EC%9D%98-reducer%EA%B0%80-%EC%88%9C%EC%88%98%ED%95%A8%EC%88%98%EC%9D%B8-%EC%9D%B4%EC%9C%A0

reudcer는 pure fuction이라서 하면 안되는 것들.

1. mutate its argument.
2. perform side-effects like API calls and routing transitions.
3. Call non-pure functions, eg, `Date.now()` , ` Math.random()`.

redux dispatch는 원래 plainText인 object 형식만 받아서 인식한다. 하지만,

redux-thunk, redux-promise 미들웨어를 이용하면 각각 redux dispatch가 function과 promise를 받을수 있도록 만들어 준다.
이 프로젝트는 이 두개를 이용해 디스패치단에 axios를 사용하고 나온 값을 리덕스에 저장한다.

## 0205

error: Expected an assignment or function call and instead saw an expression
-> solution: https://helicopter55.tistory.com/2

hoc : higer-order component is a function that takes a componet and returns a new component. 예시는 hoc 폴더내 readme 참고.
이걸 이용해서 컴포넌트를 감싸면서 인증을 담당하는 컴포넌트를 만듬.
이 프로젝트에선 로그인한 유저는 로그인 페이지와 회원가입 페이지를 접근할 수 없도록 만듬.
