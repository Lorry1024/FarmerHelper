"use strict";
const common_vendor = require("../../common/vendor.js");
const avatarSrc = "../../static/images/avatar.jpg";
const bgImageSrc = "../../static/images/background.JPG";
const _sfc_main = {
  __name: "openStore",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(_ctx.messages, (msg, index, i0) => {
          return common_vendor.e({
            a: msg.role === "assistant"
          }, msg.role === "assistant" ? {
            b: avatarSrc
          } : {}, {
            c: msg.role === "user"
          }, msg.role === "user" ? {
            d: _ctx.myAvatarSrc
          } : {}, {
            e: common_vendor.t(msg.content),
            f: common_vendor.n(msg.role),
            g: index,
            h: common_vendor.n(msg.role)
          });
        }),
        b: bgImageSrc
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-693c70fc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/openStore/openStore.js.map
