const fs = require('fs');
const path = require('path');

function edit(relPath, replacements) {
  const fp = path.join('web', relPath);
  if (!fs.existsSync(fp)) { console.error('NOT FOUND:', fp); return; }
  let content = fs.readFileSync(fp, 'utf8');
  for (const [from, to] of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(fp, content);
  console.log('OK:', relPath);
}

// 1. main.ts
edit('src/main.ts', [
  ["import './assets/main.css'", "import './assets/main.css'\nimport 'remixicon/fonts/remixicon.css'"]
]);

// 2. DbInitComponent.vue
edit('src/components/utils/DbInitComponent.vue', [
  ["import {defineEmits, onMounted, ref, watch} from \"vue\";", "import {onMounted, ref, watch} from \"vue\";"],
  ["icon: '\u{1F4C1}'", "icon: 'ri-folder-3-fill'"],
  ["icon: '\u{1F513}'", "icon: 'ri-lock-unlock-fill'"],
  ["icon: '\u2699\uFE0F'", "icon: 'ri-settings-3-fill'"],
  ['<div class="init-option-icon">{{ option.icon }}</div>', '<div class="init-option-icon"><i :class="option.icon"></i></div>']
]);

// 3. IndexView.vue
edit('src/views/IndexView.vue', [
  ["\u2705 数据库已初始化，可以开始使用", '<i class="ri-checkbox-circle-fill"></i> 数据库已初始化，可以开始使用']
]);

// 4. Remove macro imports
const macroFiles = [
  ['src/components/chatBackup/ExportPDF.vue', 'import {defineProps, watch} from "vue";', 'import {watch} from "vue";'],
  ['src/components/chatBackup/ExportJSON.vue', 'import {defineProps, ref, watch} from "vue";', 'import {ref, watch} from "vue";'],
  ['src/components/chatBackup/ExportHTML.vue', 'import {defineProps, ref, watch} from "vue";', 'import {ref, watch} from "vue";'],
  ['src/components/chatBackup/ExportENDB.vue', 'import {defineProps, ref, watch} from "vue";', 'import {ref, watch} from "vue";'],
  ['src/components/chatBackup/ExportCSV.vue', 'import {defineProps, ref, watch} from "vue";', 'import {ref, watch} from "vue";'],
  ['src/components/chatBackup/ExportDOCX.vue', 'import {defineProps, watch} from "vue";', 'import {watch} from "vue";'],
  ['src/components/chatBackup/ExportDEDB.vue', 'import {defineProps, ref, watch} from "vue";', 'import {ref, watch} from "vue";'],
  ['src/components/chatBackup/ChatExportMain.vue', "import {ref, defineProps, nextTick, watch, type Ref} from 'vue';", "import {ref, nextTick, watch, type Ref} from 'vue';"],
  ['src/components/utils/ProgressBar.vue', "import {defineEmits, defineProps, ref} from 'vue';", "import {ref} from 'vue';"],
  ['src/components/utils/DateTimeSelect.vue', "import {defineEmits, ref, watch} from 'vue';", "import {ref, watch} from 'vue';"],
  ['src/components/chat/ChatRecords.vue', "import {ref, defineProps, nextTick, onMounted, watch} from 'vue';", "import {ref, nextTick, onMounted, watch} from 'vue';"],
  ['src/components/chat/ChatRecprdsHeader.vue', "import {defineEmits, defineProps, nextTick, onMounted, ref, watch} from 'vue';", "import {nextTick, onMounted, ref, watch} from 'vue';"],
  ['src/components/chat/ChatRecordsMain.vue', 'import {defineProps, ref, onMounted, watch, nextTick, defineExpose} from "vue";', 'import {ref, onMounted, watch, nextTick} from "vue";'],
  ['src/components/chat/ContactsList.vue', "import {defineEmits, onMounted, ref} from 'vue';", "import {onMounted, ref} from 'vue';"],
  ['src/components/chat/message/MessageEmoji.vue', 'import {defineProps, onMounted, ref} from "vue";', 'import {onMounted, ref} from "vue";'],
  ['src/components/chat/message/MessageImg.vue', 'import {defineProps, onMounted, ref} from "vue";', 'import {onMounted, ref} from "vue";'],
  ['src/components/chat/message/MessageFile.vue', 'import { defineProps, onMounted, reactive, ref } from "vue";', 'import { onMounted, reactive, ref } from "vue";'],
  ['src/components/chat/message/MessageAudio.vue', 'import {defineProps, onMounted, ref} from "vue";', 'import {onMounted, ref} from "vue";'],
  ['src/components/chat/message/MessageOther.vue', 'import {defineProps} from "vue";', ''],
  ['src/components/chat/message/MessageText.vue', 'import {defineProps} from "vue";', ''],
  ['src/components/chat/message/MessageVideo.vue', 'import {defineProps, onMounted, ref} from "vue";', 'import {onMounted, ref} from "vue";'],
];

for (const [file, from, to] of macroFiles) {
  edit(file, [[from, to]]);
}

// 5. Fix Sass legacy JS API in vite.config.ts
edit('../vite.config.ts', [
  ['    plugins: [', '    css: {\n        preprocessorOptions: {\n            scss: {\n                api: "modern-compiler"\n            }\n        }\n    },\n    plugins: [']
]);

console.log('All edits done!');
