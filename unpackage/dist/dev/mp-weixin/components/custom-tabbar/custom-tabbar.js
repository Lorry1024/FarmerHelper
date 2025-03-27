"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "custom-tabbar",
  setup(__props) {
    const leftItems = common_vendor.ref([
      {
        pagePath: "pages/index/index",
        //text: "首页",
        iconPath: "static/images/tabbar/home.png",
        // 未选中图标路径
        selectedIconPath: "static/tabbar/home_active.png",
        // 选中图标路径
        selected: false
      },
      {
        pagePath: "pages/publish/publish",
        //text: "发布",
        iconPath: "/static/images/tabbar/tab.png",
        selectedIconPath: "static/tabbar/tab_active.png"
      }
    ]);
    const middleItem = common_vendor.ref({
      pagePath: "pages/voice/voice",
      //text: '语音',
      iconPath: "static/tabbar/voice.png",
      selectedIconPath: "static/tabbar/voice_active.png",
      selected: false
    });
    const rightItems = common_vendor.ref([
      {
        pagePath: "pages/openStore/openStore",
        //text: "电商教程",
        iconPath: "/static/images/tabbar/cart-empty.png",
        selectedIconPath: "static/tabbar/cart-empty_active.png",
        selected: false
      },
      {
        pagePath: "pages/user/user",
        //text: "个人中心",
        iconPath: "/static/images/tabbar/customer.png",
        selectedIconPath: "static/tabbar/customer_active.png",
        selected: false
      }
    ]);
    const route = common_vendor.useRoute();
    const switchTab = (pagePath) => {
      common_vendor.index.switchTab({ url: `/${pagePath}` });
      setSelected(pagePath);
    };
    const setSelected = (pagePath) => {
      leftItems.value.forEach((item) => item.selected = item.pagePath === pagePath);
      middleItem.value.selected = middleItem.value.pagePath === pagePath;
      rightItems.value.forEach((item) => item.selected = item.pagePath === pagePath);
    };
    common_vendor.onMounted(() => {
      const currentRoute = route.path;
      setSelected(currentRoute.slice(1));
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(leftItems.value, (item, index, i0) => {
          return {
            a: item.selected ? item.selectedIconPath : item.iconPath,
            b: common_vendor.t(item.text),
            c: item.selected ? 1 : "",
            d: index,
            e: common_vendor.o(($event) => switchTab(item.pagePath), index)
          };
        }),
        b: middleItem.value.selected ? middleItem.value.selectedIconPath : middleItem.value.iconPath,
        c: common_vendor.o(($event) => switchTab(middleItem.value.pagePath)),
        d: common_vendor.f(rightItems.value, (item, index, i0) => {
          return {
            a: item.selected ? item.selectedIconPath : item.iconPath,
            b: common_vendor.t(item.text),
            c: item.selected ? 1 : "",
            d: index + leftItems.value.length,
            e: common_vendor.o(($event) => switchTab(item.pagePath), index + leftItems.value.length)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-51c48e3c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/custom-tabbar/custom-tabbar.js.map
