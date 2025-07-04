<template>
  <div>
    <!-- 导航栏 -->
    <nav class="bg-white/10 backdrop-blur-sm fixed w-full z-50 border-b">
      <div class="mx-auto max-w-7xl px-8">
        <div class="flex h-16 justify-between items-center">
          <!-- 左侧 Logo/标题 -->
          <div class="flex items-center">
            <div class="text-xl"></div>
          </div>

          <!-- 导航链接 -->
          <div class="flex items-center space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current ? 'text-gray-900' : 'text-gray-500',
                'px-3 py-2 text-sm font-medium hover:text-gray-900 transition-colors'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 背景和内容容器 -->
    <div class="min-h-screen relative">
      <!-- 背景图 -->
      <div
        class="fixed inset-0 bg-cover bg-center bg-no-repeat"
        :style="{
          backgroundImage: `url(${backgroundImage})`
        }"
      ></div>
      <!-- 白色遮罩层 -->
      <div class="fixed inset-0 bg-white/70"></div>

      <!-- 路由视图 -->
      <div class="relative z-10 pt-14">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import backgroundImage from './assets/imgs/blogBackGround.jpg'

  export default {
    name: 'App',
    data() {
      return {
        backgroundImage,
        navigation: [
          { name: '首页', href: '/', current: true },
          { name: '日常', href: '/daily', current: false },
          { name: '博客', href: '/blog', current: false }
        ]
      }
    },
    watch: {
      $route(to) {
        // 根据当前路由更新导航状态
        this.navigation = this.navigation.map(item => ({
          ...item,
          current: item.href === to.path
        }))
      }
    }
  }
</script>
