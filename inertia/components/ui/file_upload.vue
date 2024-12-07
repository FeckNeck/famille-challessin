<script setup lang="ts">
import {
  FileUpload,
  FileUploadRootProps,
  FileUploadRootEmits,
  useForwardPropsEmits,
} from '@ark-ui/vue'
import Button from './button.vue'
import { Trash2 } from 'lucide-vue-next'
import { computed } from 'vue'

export interface FileUploadProps extends FileUploadRootProps {
  url?: string | null
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  maxFiles: 1,
})

const emits = defineEmits<FileUploadRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const backgroundImg = computed(() => ({
  backgroundImage: props.url ? `url(${props.url})` : 'none',
}))
</script>

<template>
  <FileUpload.Root
    v-bind="forwarded"
    @file-accept="(details: FileUpload.FileAcceptDetails) => emits('fileAccept', details)"
  >
    <FileUpload.Dropzone :style="backgroundImg">
      <FileUpload.Label asChild>
        <span>Déposez vos fichiers ici</span>
      </FileUpload.Label>
      <FileUpload.Trigger asChild>
        <Button color="yellow" size="small">Choisir un fichier</Button>
      </FileUpload.Trigger>
    </FileUpload.Dropzone>
    <FileUpload.ItemGroup v-if="maxFiles > 1">
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item v-for="file in acceptedFiles" :file="file" :key="file.name">
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <FileUpload.ItemPreview />
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <FileUpload.ItemDeleteTrigger>
            <Trash2 :size="16" />
          </FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>
    <FileUpload.HiddenInput />
  </FileUpload.Root>
</template>

<style scoped>
[data-scope='file-upload'][data-part='root'] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  gap: 0.5rem;
}

[data-scope='file-upload'][data-part='dropzone'] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-grow: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 0.125rem solid var(--gray-800);
  border-radius: var(--rounded);
  font-weight: bold;
  width: 100%;
  height: 100%;
  padding: 1rem;
  text-align: center;
}

[data-scope='file-upload'][data-part='item-group'] {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

[data-scope='file-upload'][data-part='item-name'] {
  grid-area: name;
  font-size: var(--text-sm);
  font-weight: bold;
}

[data-scope='file-upload'][data-part='item-size-text'] {
  grid-area: size;
  font-size: var(--text-sm);
  font-weight: 500;
}

[data-scope='file-upload'][data-part='item-delete-trigger'] {
  grid-area: delete;
  align-self: flex-start;
  cursor: pointer;
  border: none;
  background: none;
}

[data-scope='file-upload'][data-part='item'] {
  animation: fadeIn 0.25s ease-out;
  display: grid;
  padding: 1rem;
  column-gap: 0.75rem;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'preview name delete'
    'preview size delete';
  border: 0.125rem solid var(--gray-800);
  border-radius: var(--rounded);
}

[data-scope='file-upload'][data-part='item-preview'] {
  grid-area: preview;
}

[data-scope='file-upload'][data-part='item-preview-image'] {
  aspect-ratio: 1;
  object-fit: cover;
  width: 2.5rem;
  height: 2.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-0.625rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
