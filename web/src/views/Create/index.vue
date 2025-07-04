<template>
  <div class="py-60 flex items-center justify-center">
    <div class="max-w-4xl mx-auto p-8 space-y-6">
      <h1 class="text-4xl font-bold text-gray-900">Markdown 编辑器</h1>
      <!-- 文件上传 -->
      <input type="file" @change="handleFileUpload" class="mb-4" />
      <!-- Vditor Markdown 编辑器 -->
      <div id="vditor" class="border border-gray-300 rounded-lg"></div>
      <!-- 导出按钮 -->
      <button @click="exportMarkdown" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        导出 Markdown
      </button>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted } from 'vue';
  import Vditor from 'vditor';
  import 'vditor/dist/index.css';

  export default defineComponent({
    name: 'MarkdownEditor',
    data() {
      return {
        markdownInput: '', // 用户输入的 Markdown 内容
        vditorInstance: null, // Vditor 实例
      };
    },
    methods: {
      // 初始化 Vditor
      initVditor() {
        this.vditorInstance = new Vditor('vditor', {
          height: 500,
          placeholder: '在这里输入 Markdown 内容...',
          toolbarConfig: {
            pin: true,
          },
          preview: {
            markdown: true,
            hljs: {
              style: 'github',
            },
          },
          input: (value) => {
            this.markdownInput = value; // 实时更新 Markdown 内容
          },
        });
      },
      // 处理文件上传
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.vditorInstance.setValue(e.target.result); // 加载 Markdown 文件内容到编辑器
          };
          reader.readAsText(file);
        }
      },
      // 导出 Markdown 文件
      exportMarkdown() {
        const markdownContent = this.vditorInstance.getValue();
        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported.md';
        a.click();
        URL.revokeObjectURL(url);
      },
    },
    mounted() {
      this.initVditor(); // 初始化 Vditor
    },
  });
</script>

<style>
/* 添加一些样式以支持 Markdown 编辑器 */
.prose {
  max-width: 100%;
  color: #333;
  line-height: 1.6;
}
</style>
