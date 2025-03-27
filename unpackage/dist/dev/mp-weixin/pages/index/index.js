"use strict";
const common_vendor = require("../../common/vendor.js");
const avatarSrc = "../../static/images/avatar.jpg";
const bgImageSrc = "../../static/images/background.JPG";
const publishIconSrc = "../../static/images/tabbar/tap_active.png";
const ecommerceIconSrc = "../../static/images/tabbar/cart-empty_active.png";
const voiceIconSrc = "../../static/images/voice.png";
const myAvatarSrc = "../../static/images/myAvatar.jpg";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const goPublish = () => {
      common_vendor.index.switchTab({
        url: "/pages/publish/publish"
      });
    };
    const goEcommerceTutorial = () => {
      common_vendor.index.switchTab({
        url: "/pages/openStore/openStore"
      });
    };
    const messages = common_vendor.ref([
      {
        role: "assistant",
        content: "您好！我是小橘！接下来，由我向您介绍该小程序的使用方法。首先，……"
      }
    ]);
    const isRecording = common_vendor.ref(false);
    const mockSpeechRecognition = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("这是一个模拟的语音识别结果");
        }, 1500);
      });
    };
    const startVoiceInput = async () => {
      try {
        isRecording.value = true;
        const result = await mockSpeechRecognition();
        messages.value.push({
          role: "user",
          content: result
        });
        setTimeout(() => {
          messages.value.push({
            role: "assistant",
            content: "已收到您的语音指令，正在处理中..."
          });
        }, 2e3);
      } finally {
        isRecording.value = false;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (msg, index, i0) => {
          return common_vendor.e({
            a: msg.role === "assistant"
          }, msg.role === "assistant" ? {
            b: avatarSrc
          } : {}, {
            c: msg.role === "user"
          }, msg.role === "user" ? {
            d: myAvatarSrc
          } : {}, {
            e: common_vendor.t(msg.content),
            f: common_vendor.n(msg.role),
            g: index,
            h: common_vendor.n(msg.role)
          });
        }),
        b: bgImageSrc,
        c: publishIconSrc,
        d: common_vendor.o(goPublish),
        e: ecommerceIconSrc,
        f: common_vendor.o(goEcommerceTutorial),
        g: voiceIconSrc,
        h: common_vendor.o(startVoiceInput),
        i: isRecording.value ? "#EFEBDE" : "#1E334E"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
