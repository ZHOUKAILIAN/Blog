<template>
  <div class="py-60 flex items-center justify-center">
    <div class="max-w-2xl mx-auto p-8 space-y-6">
      <h1 class="text-4xl font-bold text-gray-900">关于我</h1>
      <div v-for="(item, index) in introduce" :key="index" class="mt-2">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeView',
    data() {
      return {
        introduce: [
          '💻 前端打工人 | 🛡️ ISFJ-A守护者',
          '📅 入行1年 | ⏳ 偶尔卡bug式纠结',
          '🗣️ 聊天容易掉线 | 🌀 DFS式追问狂魔'
        ]
      }
    }
  }
</script>
