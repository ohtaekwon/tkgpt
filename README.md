## TK GPT

## 🔎 프로젝트 살펴보기

### 프로젝트 실행

프로젝트의 client, server 디렉토리에서 아래 커맨드를 각각 실행

#### 1. CLIENT - Front-End

```bash
cd client
npm install
npm run start
```

#### 2. SERVER - Back-End

```bash
cd server
npm install
npm run start
```

### 주요 기술

#### 1. Front End

- **React.js** : SPA를 위한 라이브러리
- **TypeScript** : 정적 타입 사용 및 코드 에러 검출
- **Axios** : HTTP 비동기 통신을 위하여 사용 라이브러리
- **Emotion** : 스타일 적용 라이브러리
- **MUI** : 빠른 프로젝트의 프로토타입을 위해 UI 적용(icons,lab,material) 라이브러리
- **React-toastify** : API 사용시 `alert`창의 UI를 위해 적용 라이브러리
- **Formik** : form의 상태 관리를 통해, 유효성 검사, `submit` 기능 적용 라이브러리
- **Yup** : `formik`에서 사용할 form데이터의 스키마 유효성 검증을 위해 적용 라이브러리
- **typewriter-effect** : openAi의 `Response`에 `text` 데이터 타자기 효과를 위해 적용 라이브러리

#### 2. Back End

- **jsonwebtoken** : 사용자의 인증(authentication)을 위한 JWT 적용 라이브러리
- **mongoose** : express.js 에서 `mongoDB` 사용을 위한 라이브러리
- **express-validator** : HTTP요청시 body에 들어갈 데이터의 유효성 검증을 위한 라이브러리

### 🔗 Link

- [DEMO 사이트](https://tkgpt-4rvb-ou8bfy10o-ohtaekwon.vercel.app/signin)
- [프론트엔드 레포](https://github.com/ohtaekwon/tkgpt/tree/main/client)
- [백엔드 레포](https://github.com/ohtaekwon/tkgpt/tree/main/server)

### 구현

#### 1. OPEN AI 응답 요청 구현

![GPT 응답](https://user-images.githubusercontent.com/75871005/236201715-ecd4a28a-0195-4114-a379-f1e2295fef08.gif)
