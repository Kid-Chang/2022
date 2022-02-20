# Node + React 유튜브 코딩

readme는 한글로,,, 주석은 영어로,,,

## 0208

비디오 업로드 폼 제작.

## 0209

Multer로 노드서버에 파일 보내기.
MIME TYPE으로 확장자 지정해서 업로드도 가능하다.
서버에 저장된 영상의 썸네일을 추출하기위해 fluent-ffmpeg를 인스톨해야하는데, 사전에 brew install ffmpeg를 해야한다.

# 0210

클라이언트에서 이미지 경로를 통해 접속하려고 하면 엑스박스가 떠서 애를 먹었는데,
`app.use("/uploads", express.static("uploads"));`
이런식으로 uploads폴더를 정적으로 제공하겠다고 선언해야한다.
https://wayhome25.github.io/nodejs/2017/02/18/nodejs-08-express-static/ 참고.

# 0213

video 라우터에서 `.find().populate("writer")`라는 문법을 사용해서 좀더 찾아봤다.
`.find()`는 해당되는 부분 전체를 찾는다. 이때, Video 스키마는 writer가 Schema.Types.ObjectId를 사용해서 User스키마 값과 연결되어있다.
여기서 그냥 `.find()`를 사용한다면, writer에 User스키마의 `_id` 값만 출력되지만 `populate("writer")`라고 해주면 writer에 연결된 User스키마의 정보들도 같이 출력된다. 자세한건 아래 블로그 참고 `https://blog.naver.com/PostView.naver?blogId=devlink&logNo=222483797663`

# 0214

이슈: SideVideo에서 Link 태그가 작동하지 않는다.

# 0215

구독 및 구독 취소 기능 구현.

mongoDB에서 `Model.find({writer : {{ $in: subscriberdUser } })` 이런식으로 작성하면 `{$in : [list] }` 에서 list를 spread하면서 찾아준다.

# 0218

댓글 기능 완성. depth는 2까지만.

antd Icon err : https://shinye0213.tistory.com/317
--> 사용법이 변경되어서 원래는 `<Icon type=""> </Icon>` 이었지만, 업데이트 이후 import 단에서 사용할 아이콘을 호출.

# 0220

좋아요 싫어요 완성.
