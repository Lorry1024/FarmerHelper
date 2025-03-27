"use strict";
const common_vendor = require("../../common/vendor.js");
const avatarSrc = "../../static/images/avatar.jpg";
const bgImageSrc = "../../static/images/background.JPG";
const voiceIconSrc = "../../static/images/voice.png";
const myAvatarSrc = "../../static/images/myAvatar.jpg";
const plusIconSrc = "../../static/images/add.png";
const sendIconSrc = "../../static/images/send-fill.png";
const _sfc_main = {
  __name: "publish",
  setup(__props) {
    const keyboardHeight = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      common_vendor.index.onKeyboardHeightChange((res) => {
        keyboardHeight.value = res.height;
      });
    });
    const adjustInputPosition = () => {
      common_vendor.index.setNavigationBarTitle({ title: "正在输入" });
    };
    const restoreInputPosition = () => {
      common_vendor.index.setNavigationBarTitle({ title: "发布页" });
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
    const inputValue = common_vendor.ref("");
    const uploadedImages = common_vendor.ref([]);
    const lastMessageId = common_vendor.ref("");
    const handleSend = () => {
      if (!inputValue.value.trim() && uploadedImages.value.length === 0)
        return;
      const userMessage = {
        role: "user",
        content: inputValue.value.trim()
      };
      if (uploadedImages.value.length > 0) {
        userMessage.image = uploadedImages.value[0];
      }
      messages.value.push(userMessage);
      inputValue.value = "";
      uploadedImages.value = [];
      lastMessageId.value = `msg-${messages.value.length - 1}`;
    };
    const showImagePicker = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          if (res.tempFilePaths.length > 0) {
            uploadedImages.value = res.tempFilePaths;
          }
        }
      });
    };
    common_vendor.onMounted(() => {
      setTimeout(() => {
        lastMessageId.value = `msg-${messages.value.length - 1}`;
      }, 500);
    });
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
        c: plusIconSrc,
        d: common_vendor.o(showImagePicker),
        e: common_vendor.o(adjustInputPosition),
        f: common_vendor.o(restoreInputPosition),
        g: inputValue.value,
        h: common_vendor.o(($event) => inputValue.value = $event.detail.value),
        i: sendIconSrc,
        j: common_vendor.o(handleSend),
        k: voiceIconSrc,
        l: common_vendor.o(startVoiceInput),
        m: isRecording.value ? "#EFEBDE" : "#1E334E"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bfce3555"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/publish/publish.js.map
