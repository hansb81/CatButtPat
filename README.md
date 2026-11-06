# 고양이 궁디 팡팡 🐾

식빵 굽는 회색 고양이의 엉덩이를 팡팡 두드리는 3D 힐링 웹앱.

- 손바닥으로 궁디를 팡팡 치면 고양이가 들썩이며 야옹/그르릉 소리를 내요
- 가끔 뒤돌아 바라보고, 느리게 눈을 깜빡여요
- 너무 빨리 연타하면 털을 곤두세우고 하악질을 해요
- 처음 열면 우리 고양이 이름을 지어줄 수 있어요

단일 `index.html` 파일로 동작해요 (Three.js, WebAudio). 서버 없이 브라우저에서 바로 열면 돼요.

## 앱인토스(토스 미니앱) 빌드

앱인토스는 외부 사이트나 CDN을 불러오지 않고, 번들(`.ait`) 안의 파일로만 화면을 그려야 해요.
`scripts/build-toss.mjs`가 `index.html`을 `dist/`로 복사하면서 three.js와 주아체 폰트를 함께 넣고, 라이트 모드로 고정해요.

```bash
npm install
npm run build:toss   # dist/ 생성 후 cat-butt-pat.ait 만들기
npx ait deploy --api-key <콘솔에서 발급한 키>   # 콘솔에 업로드
```

- `apps-in-toss.config.ts`의 `appName`(`cat-butt-pat`)은 콘솔에 등록한 앱 이름과 같아야 해요.
- `main`에 푸시하면 GitHub Actions가 `.ait` 파일을 만들어 Actions 실행 결과의 Artifacts에 올려둬요.
