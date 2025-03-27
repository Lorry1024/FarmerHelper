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
	 <!-- 输入框区域 -->
	<view class="input-container">
	  <view class="input-left" @click="showImagePicker">
		<image class="input-icon" :src="plusIconSrc"></image>
	  </view>
	  <input 
		type="text" 
		class="input-box" 
		v-model="inputValue"
		placeholder="请输入内容..."
		@focus="adjustInputPosition"
		@blur="restoreInputPosition"
	  >
	  <view class="input-right" @click="handleSend">
		<image class="input-icon" :src="sendIconSrc"></image>
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
import { ref,onMounted } from 'vue';


// 定义图片资源路径
const avatarSrc = "../../static/images/avatar.jpg"; // 替换为实际头像路径
const bgImageSrc = "../../static/images/background.JPG"; // 替换为实际背景图路径
const voiceIconSrc="../../static/images/voice.png";
const myAvatarSrc="../../static/images/myAvatar.jpg"
const plusIconSrc = "../../static/images/add.png";
const sendIconSrc = "../../static/images/send-fill.png";
const keyboardHeight = ref(0); // 键盘高度响应式变量

// 监听键盘高度变化
onMounted(() => {
  uni.onKeyboardHeightChange(res => {
    keyboardHeight.value = res.height;
  });
});

// 调整输入框位置（改为通过键盘高度自动处理）
const adjustInputPosition = () => {
  uni.setNavigationBarTitle({ title: '正在输入' });
};

const restoreInputPosition = () => {
  uni.setNavigationBarTitle({ title: '发布页' });
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

// 新增数据属性
const inputValue = ref('');
const uploadedImages = ref([]);
const lastMessageId = ref('');

// 消息处理逻辑
const handleSend = () => {
  if (!inputValue.value.trim() && uploadedImages.value.length === 0) return;

  // 添加用户消息
  const userMessage = {
    role: 'user',
    content: inputValue.value.trim()
  };
  
  if (uploadedImages.value.length > 0) {
    userMessage.image = uploadedImages.value[0];
  }
  
  messages.value.push(userMessage);
  inputValue.value = '';
  uploadedImages.value = [];
  lastMessageId.value = `msg-${messages.value.length - 1}`;

  // 模拟AI回复
//   setTimeout(() => {
//     const aiResponse = mockAiResponse(userMessage.content);
//     messages.value.push({
//       role: 'assistant',
//       content: aiResponse
//     });
//     lastMessageId.value = `msg-${messages.value.length - 1}`;
//   }, 2000);
 };

// 图片上传逻辑
const showImagePicker = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      if (res.tempFilePaths.length > 0) {
        uploadedImages.value = res.tempFilePaths;
      }
    }
  });
};

// // 输入框位置调整
// const adjustInputPosition = () => {
//   // 这里可以添加获取键盘高度的逻辑
//   // 暂时使用固定调整
//   uni.setNavigationBarTitle({ title: '正在输入' });
// };

// const restoreInputPosition = () => {
//   uni.setNavigationBarTitle({ title: '发布页' });
// };

// 初始化时滚动到底部
onMounted(() => {
  setTimeout(() => {
    lastMessageId.value = `msg-${messages.value.length - 1}`;
  }, 500);
})
</script>

<style lang="scss" scoped>
 .container {
   display: flex;
   flex-direction: column;
   height: 100vh;
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
 
 /* 新增输入框样式 */
 .input-container {
   position: fixed;
   bottom: 160rpx;
   left: 0;
   right: 0;
   height: 13vh;
   margin-left: 20rpx;
   margin-right: 20rpx;
   display: flex;
   align-items: center;
   padding: 15rpx 20rpx;
   border-radius: 16px;
   background: rgba(255, 255, 255, 0.6);
   box-shadow: 0px 0px 8px  rgba(0, 0, 0, 0.08);
   z-index: 10;
   transition: bottom 0.3s; /* 添加过渡动画 */
 
   .input-left,
   .input-right {
     width: 80rpx;
     height: 80rpx;
     display: flex;
     justify-content: center;
     align-items: center;
   }
 
   .input-box {
     flex: 1;
     height: 80rpx;
     margin: 0 15rpx;
     padding: 0 20rpx;
     border-radius: 40rpx;
     border: 1rpx solid #EFEFEF;
     font-size: 28rpx;
	 background: #fff;
   }
 
   .input-icon {
     width: 40rpx;
     height: 40rpx;
   }
 }
 
 /* 消息图片样式 */
 .message-image {
   width: 200rpx;
   height: 150rpx;
   margin: 10rpx 0;
   border-radius: 10rpx;
 }
</style>
