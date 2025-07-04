<template>
  <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-[1fr,300px] gap-6">
    <!-- 判断是否有 id 参数 -->
    <div v-if="isShowContent" class="space-y-6">
      <!-- 文章详情 -->
      <article class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ currentPost.title }}</h2>
        <div class="flex gap-4 text-sm text-gray-500 mb-3">
          <span>{{ currentPost.date }}</span>
        </div>
        <!-- 使用 v-html 渲染 Markdown 转换后的 HTML -->
        <div class="text-gray-600 mb-4">
            <span>
                {{摘要}}
            </span>
        </div>
      </article>
    </div>
    <div v-else class="space-y-6">
      <!-- 文章列表 -->
      <article
        v-for="post in posts"
        :key="post.id"
        class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h2>
        <div class="flex gap-4 text-sm text-gray-500 mb-3">
          <span>{{ post.date }}</span>
        </div>
        <p class="text-gray-600 mb-4 line-clamp-3">{{ post.summary }}</p>
      </article>
    </div>

    <!-- 博客侧边栏 -->
    <aside class="bg-white p-6 rounded-lg shadow-sm h-fit">
      <ul class="space-y-4">
        <li
          v-for="item in categories"
          :key="item.categorieId"
          class="group flex items-center gap-3 pb-4 border-b border-dashed border-gray-200 last:border-0"
        >
          <span class="text-gray-700 group-hover:text-blue-500 transition-colors">
            {{ item.title }}
          </span>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  export default {
    name: 'BlogView',
    setup() {
      const route = useRoute()
      const posts = ref([
        {
          id: 1,
          title: '示例文章标题',
          date: '2024-01-20',
          summary: '这是一篇示例文章的摘要内容...',
          content: '# 示例文章内容\n\n这是一个 Markdown 格式的内容示例。'
        }
      ])

      const currentPost = ref(null)
      const isShowContent = ref(false)
      const categories = ref([
        { id: 1, title: '前端相关' },
        { id: 2, title: 'AI相关' }
      ])
      onMounted(() => {
        const id = route.params.id
        if (id) {
            // 如果有id的情况下是文章详细内容
            isShowContent.value = true
        }
      })

      return {
        posts,
        categories,
        currentPost,
      }
    }
  }
</script>
