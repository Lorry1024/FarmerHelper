<template>
  <view class="container">
    <!-- 消息提示区域 -->
    <view class="message-area">
      <image class="avatar" :src="avatarSrc"></image>
      <view class="message">
        <text>这是登录界面，请……</text>
      </view>
    </view>
    <!-- 背景图片区域 -->
    <image class="bg-image" :src="bgImageSrc" mode="aspectFill"></image>
  </view>

</template>

<script setup>
import { ref } from 'vue';

// 定义图片资源路径
const avatarSrc = "../../static/images/avatar.jpg"; // 替换为实际头像路径
const bgImageSrc = "../../static/images/background.JPG"; // 替换为实际背景图路径
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
 
 .message-area {
   display: flex;
   padding: 15px;
   position: relative; /* 确保消息提示区域在背景图片之上 */
   z-index: 1; /* 提高层级，避免被背景图片覆盖 */
   height: 65vh;
   top:10rpx;
 }
 
 .avatar {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   margin-right: 10px;
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
</style>
