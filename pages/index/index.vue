<template>
  <view class="container">
     <!-- 消息列表区域 -->
	<scroll-view class="message-list" scroll-y>
	  <view v-for="(msg, index) in messages" :key="index" 
		   :class="['message-item', msg.role]">
		<image v-if="msg.role === 'assistant'" class="avatar" :src="avatarSrc"></image>
		<image v-if="msg.role === 'user'" class="myAvatar" :src="myAvatarSrc"></image>
		<view :class="['message-content', msg.role]">
		  <text>{{ msg.content }}</text>
		</view>
	  </view>
	</scroll-view>
    <!-- 背景图片区域 -->
    <image class="bg-image" :src="bgImageSrc" mode="aspectFill"></image>
    <!-- 功能按钮区域 -->
    <view class="button-area">
      <view class="function-button" @click="goPublish">
        <image class="button-icon" :src="publishIconSrc"></image>
		<text class="button-text">一键发布</text>
      </view>
      <view class="function-button" @click="goEcommerceTutorial">
        <image class="button-icon" :src="ecommerceIconSrc"></image>
		<text class="button-text">电商教程</text>
      </view>
    </view>
	<!-- 语音按钮 -->
	<view class="voice-button-wrapper">
	  <view class="voice-button" @click="startVoiceInput" 
		   :style="{backgroundColor: isRecording ? '#EFEBDE' : '#1E334E'}">
		<image class="voice-icon" :src="voiceIconSrc"></image>
	  </view>
	</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 定义图片资源路径
const avatarSrc = "../../static/images/avatar.jpg"; // 替换为实际头像路径
const bgImageSrc = "../../static/images/background.JPG"; // 替换为实际背景图路径
const publishIconSrc = "../../static/images/tabbar/tap_active.png"; // 一键发布图标路径
const ecommerceIconSrc = "../../static/images/tabbar/cart-empty_active.png"; // 电商教程图标路径
const voiceIconSrc="../../static/images/voice.png";
const myAvatarSrc="../../static/images/myAvatar.jpg"


// 一键发布按钮点击事件
const goPublish = () => {
  uni.switchTab({
  		url:"/pages/publish/publish"
  	})
};

// 电商教程按钮点击事件
const goEcommerceTutorial = () => {
  uni.switchTab({
  		url:"/pages/openStore/openStore"
  	})
};

const messages = ref([
  {
    role: 'assistant',
    content: '您好！我是小橘！接下来，由我向您介绍该小程序的使用方法。首先，……'
  }
]);
const isRecording = ref(false);

// 模拟语音识别接口
const mockSpeechRecognition = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('这是一个模拟的语音识别结果');
    }, 1500);
  });
};

const startVoiceInput = async () => {
  try {
    isRecording.value = true;
    const result = await mockSpeechRecognition();
    
    // 添加用户消息
    messages.value.push({
      role: 'user',
      content: result
    });

    // 模拟助手回复
    setTimeout(() => {
      messages.value.push({
        role: 'assistant',
        content: '已收到您的语音指令，正在处理中...'
      });
    }, 2000);

  } finally {
    isRecording.value = false;
  }
};



</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}

.content {
  flex: 1; /* 让内容区域占据剩余空间 */
  position: relative; /* 为背景图片和其他元素提供定位参考 */
}

.message-list {
  flex: 1;
  padding: 15px;
  position: relative;
  z-index: 1;
  min-height: 65vh;
  max-height: 65vh;
  overflow-y: auto;
}

.message-item {
  display: flex;
  margin-bottom: 15px;
  &.user {
    flex-direction: row-reverse;
    .message-content {
      background: rgba(30, 51, 78, 1);
      border: 5px solid rgba(255, 255, 255, 0.8);
      color: white;
	  border-radius: 15px 0 15px 15px;
	  margin-right: 10rpx;
    }
  }
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &.assistant {
	background: rgba(255, 255, 255, 1);
	border: 1px solid rgba(227, 227, 227, 1);
    border-radius: 0 15px 15px 15px;
    margin-left: 10rpx;
  }
}

.message-area {
  display: flex;
  padding: 15px;
  position: relative; /* 确保消息提示区域在背景图片之上 */
  z-index: 1; /* 提高层级，避免被背景图片覆盖 */
  height: 65vh;
  top:10rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}

.myAvatar{
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	margin-left: 10rpx;
	margin-right:60rpx ;
}

.message {
  flex: 1;
  width: 200rpx;
  height: 140rpx;
  opacity: 1;
  border-radius: 0px 30px, 30px, 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(227, 227, 227, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 22px 14px 22px;
}

.bg-image {
  position: absolute; /* 绝对定位，使其覆盖整个内容区域 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片比例并覆盖整个区域 */
  opacity: 0.4;
}

.button-area {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  position: relative; /* 确保功能按钮区域在背景图片之上 */
  z-index: 1; /* 提高层级，避免被背景图片覆盖 */
}

.function-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #EFEBDE;
  width: 155px;
  height: 100px;
  opacity: 1;
  border-radius: 20px;
}

.button-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
}

.button-text {
  font-size: 14px;
}

/* 新增语音按钮样式 */
.voice-button-wrapper {
  position: fixed;
  bottom: 15rpx; /* 根据导航栏高度调整 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.voice-button {
  width: 130rpx;
  height: 130rpx;
  border-radius: 50%;
/*  background-color: #007AFF; */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s;
}

.voice-button:active {
  transform: scale(0.95);
}

.voice-icon {
  width: 70rpx;
  height: 70rpx;
  z-index: 2;
}

</style>
