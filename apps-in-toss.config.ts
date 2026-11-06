import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  // 앱인토스 콘솔에 등록한 앱 이름과 정확히 같아야 업로드돼요.
  appName: "cat-butt-pat",
  permissions: [],
  navigationBar: {
    withBackButton: true,
    withHomeButton: true,
    withTitle: true,
    theme: "light",
  },
  webView: {
    // 팡팡 두드릴 때 화면이 튕기거나 당겨서 새로고침되지 않도록
    bounces: false,
    pullToRefreshEnabled: false,
    overScrollMode: "never",
    allowsBackForwardNavigationGestures: false,
    // 야옹 소리(WebAudio → <audio>)를 바로 재생할 수 있도록
    allowsInlineMediaPlayback: true,
    mediaPlaybackRequiresUserAction: false,
  },
  webBundleDir: "dist",
});
