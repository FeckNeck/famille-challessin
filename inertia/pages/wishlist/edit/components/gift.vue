<script setup lang="ts">
import { ref } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import { useForm, router } from '@inertiajs/vue3'
import { useImageUpload } from '~/composables/image_upload'
import Button from '~/components/ui/button.vue'
import Field from '~/components/ui/field.vue'
import FileUploadC from '~/components/ui/file_upload.vue'
import Input from '~/components/ui/input.vue'
import type { Gift } from '~/types'

const props = defineProps<{
  gift: Gift
  wishlistId: string
}>()

const form = useForm({
  id: props.gift.id,
  title: props.gift.title,
  description: props.gift.description,
  categoryId: props.gift.categoryId,
  price: props.gift.price,
  url: props.gift.url,
  image: null,
})

const { uploadedFile, uploadedFilePreview, onfileChange } = useImageUpload(props.gift.imageUrl)
const isDeleting = ref<boolean>(false)

function submit() {
  if (form.processing) return

  if (uploadedFile.value) form.image = uploadedFile.value

  form.patch(
    `/wishlists/${props.wishlistId}/categories/${props.gift.categoryId}/gifts/${props.gift.id}`,
    {
      preserveScroll: true,
    }
  )
}

function remove() {
  if (isDeleting.value) return

  isDeleting.value = true

  router.delete(
    `/wishlists/${props.wishlistId}/categories/${props.gift.categoryId}/gifts/${props.gift.id}`,
    {
      preserveScroll: true,
      onFinish: () => {
        isDeleting.value = false
      },
    }
  )
}
</script>

<template>
  <div class="gift">
    <form :id="gift.id" class="gift__form" @submit.prevent="submit()">
      <div class="gift__form-img">
        <FileUploadC
          v-model:file="uploadedFile"
          :url="uploadedFilePreview"
          @file-accept="onfileChange"
        />
      </div>
      <div class="gift__form__content">
        <Field label="Titre" :error="form.errors.title">
          <Input v-model:input="form.title" />
        </Field>
        <Field label="Description" :error="form.errors.description">
          <Input v-model:input="form.description" />
        </Field>
        <div>
          <Field label="Lien" :error="form.errors.url" class="grow">
            <Input v-model:input="form.url" />
          </Field>
          <Field label="Prix" :error="form.errors.price">
            <Input v-model:input="form.price" />
          </Field>
        </div>
      </div>
    </form>
    <div class="gift-btns">
      <Button
        :form="gift.id"
        :disabled="form.processing"
        :loading="form.processing"
        color="yellow"
        type="submit"
        size="small"
        >Enregistrer</Button
      >
      <form @submit.prevent="remove()">
        <Button :disabled="isDeleting" :loading="isDeleting" color="red" size="small" type="submit">
          <Trash2 />
        </Button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gift {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;

  &__form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    flex-grow: 1;

    &-img {
      width: 13rem;
      height: 13rem;
    }

    &__content {
      flex-grow: 1;

      & > div:last-child {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      @media (max-width: 768px) {
        & > div:last-child {
          display: block;
        }
      }
    }

    @media (max-width: 768px) {
      &-img {
        width: 100%;
      }
    }
  }

  &-btns {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      width: 100%;

      & > button {
        flex-grow: 1;
      }
    }
  }
}
</style>
