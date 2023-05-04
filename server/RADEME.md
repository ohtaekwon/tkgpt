### Back End 프로젝트 구조

```
📦src
 ┣ 📂config
 ┃ ┗ 📜chat.config.js
 ┣ 📂controllers
 ┃ ┣ 📜chat.controller.js
 ┃ ┣ 📜token.controller.js
 ┃ ┗ 📜user.controller.js
 ┣ 📂handlers
 ┃ ┣ 📜request.handler.js
 ┃ ┗ 📜response.handler.js
 ┣ 📂middlewares
 ┃ ┗ 📜tokenMiddleware.js
 ┣ 📂models
 ┃ ┗ 📜user.model.js
 ┗ 📂routes
 ┃ ┣ 📜chat.route.js
 ┃ ┣ 📜index.js
 ┃ ┗ 📜user.route.js

```

- **config** : openAi의 config
- **controllers** : router로 온 request을 컨트롤
- **handlers** : response와 request에 따른 핸들러를 정의
- **middlewares** : 토큰설정에 따른 미들웨어
- **models** : mongoDB에 사용할 데이터베이스의 Schema와 methods를 정의한 model
- **routes** : RESTAPI의 자원을 나타내는 라우터
