// 앱인토스 빌드에만 들어가는 하단 배너 광고.
// 토스 앱 밖(브라우저)에서는 isSupported()가 false라 아무것도 하지 않아요.
// 광고 칸은 고양이 화면(캔버스) 아래에 따로 두어서, 궁디를 두드리는 영역과 겹치지 않아요.
import { TossAds } from "@apps-in-toss/web-framework";

const AD_GROUP_ID = __AD_GROUP_ID__;

function start() {
  if (!TossAds.initialize.isSupported() || !TossAds.attachBanner.isSupported()) return;

  const bar = document.createElement("div");
  bar.id = "adBar";
  bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:5;background:#fff;" +
    "padding-bottom:env(safe-area-inset-bottom,0px);box-shadow:0 -1px 0 rgba(120,90,60,.12);";
  const slot = document.createElement("div");
  slot.style.cssText = "width:100%;height:102px;";
  bar.appendChild(slot);
  document.body.appendChild(bar);

  const fit = () => window.setAdBarHeight?.(bar.offsetHeight);
  const hide = () => { bar.remove(); window.setAdBarHeight?.(0); };
  fit();
  new ResizeObserver(fit).observe(bar);

  TossAds.initialize({
    callbacks: {
      onInitialized: () => {
        TossAds.attachBanner(AD_GROUP_ID, slot, {
          theme: "light",
          variant: "expanded",
          callbacks: {
            onNoFill: hide,
            onAdFailedToRender: hide,
          },
        });
      },
      onInitializationFailed: hide,
    },
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();
