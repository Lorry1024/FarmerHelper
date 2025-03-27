"use strict";
const common_vendor = require("../../common/vendor.js");
const avatarSrc = "../../static/images/avatar.jpg";
const bgImageSrc = "../../static/images/background.JPG";
const _sfc_main = {
  __name: "user",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: avatarSrc,
        b: bgImageSrc
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
