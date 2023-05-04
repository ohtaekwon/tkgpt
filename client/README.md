### Front End 프로젝트 구조

```
📦src
 ┣ 📂components
 ┃ ┣ 📜AuthRoute.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜Loading.tsx
 ┃ ┗ 📜ProtectedRoute.tsx
 ┣ 📂lib
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂client
 ┃ ┃ ┃ ┣ 📜private.client.ts
 ┃ ┃ ┃ ┗ 📜public.client.ts
 ┃ ┃ ┗ 📂modules
 ┃ ┃ ┃ ┣ 📜chat.api.ts
 ┃ ┃ ┃ ┗ 📜user.api.ts
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜helpers.ts
 ┃ ┃ ┗ 📜types.ts
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜SignIn.tsx
 ┃ ┗ 📜SignUp.tsx
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┗ 📜reportWebVitals.ts

```

- **components**: 프로젝트에서 사용하는 컴포넌트로 Loading, AuthRoute, Header, ProtectedRoute
- **lib** : 프로젝트에서 사용하는 api를 모아둔 폴더로 axios 인스턴스와 api modele, 에러 핸들러와 타입을 정리한 폴더

- **pages** : 애플리케이션의 페이지를 나타내는 폴더
