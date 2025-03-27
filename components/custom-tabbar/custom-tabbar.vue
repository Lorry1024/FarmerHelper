<template>
  <view class="custom-tabbar">
    <view v-for="(item, index) in leftItems" :key="index" class="tab-item" @click="switchTab(item.pagePath)">
      <image :src="item.selected? item.selectedIconPath : item.iconPath" mode="widthFix"></image>
      <text :class="{ 'active': item.selected }">{{ item.text }}</text>
    </view>
    <view class="middle-button" @click="switchTab(middleItem.pagePath)">
      <image :src="middleItem.selected? middleItem.selectedIconPath : middleItem.iconPath" mode="widthFix"></image>
    </view>
    <view v-for="(item, index) in rightItems" :key="index + leftItems.length" class="tab-item" @click="switchTab(item.pagePath)">
      <image :src="item.selected? item.selectedIconPath : item.iconPath" mode="widthFix"></image>
      <text :class="{ 'active': item.selected }">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// 左侧按钮配置
const leftItems = ref([
  {
	pagePath: "pages/index/index",
	//text: "首页",
	iconPath: "static/images/tabbar/home.png", // 未选中图标路径
	selectedIconPath: "static/tabbar/home_active.png" ,// 选中图标路径
	selected: false
  },
  {
	pagePath: "pages/publish/publish",
	//text: "发布",
	iconPath: "/static/images/tabbar/tab.png",
	selectedIconPath: "static/tabbar/tab_active.png"
  }
]);

// 中间按钮配置
const middleItem = ref({
  pagePath: 'pages/voice/voice',
  //text: '语音',
  iconPath: 'static/tabbar/voice.png',
  selectedIconPath: 'static/tabbar/voice_active.png',
  selected: false
});

// 右侧按钮配置
const rightItems = ref([
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

const route = useRoute();

const switchTab = (pagePath) => {
  uni.switchTab({ url: `/${pagePath}` });
  setSelected(pagePath);
};

const setSelected = (pagePath) => {
  leftItems.value.forEach(item => item.selected = item.pagePath === pagePath);
  middleItem.value.selected = middleItem.value.pagePath === pagePath;
  rightItems.value.forEach(item => item.selected = item.pagePath === pagePath);
};

onMounted(() => {
  const currentRoute = route.path;
  setSelected(currentRoute.slice(1));
});

</script>

<style scoped>
.custom-tabbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #F5F5F5;
  padding: 5px 0;
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999999;
}
.tab-item image {
  width: 24px;
  height: 24px;
}
.tab-item text {
  font-size: 12px;
  margin-top: 3px;
}
.active {
  color: #007AFF;
}
.middle-button {
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.middle-button image {
  width: 32px;
  height: 32px;
}
</style>