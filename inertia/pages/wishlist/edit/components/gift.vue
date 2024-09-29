<script setup lang="ts">
import type { Gift } from '~/types'
import { useForm } from '@inertiajs/vue3'
import Input from '~/components/ui/input.vue'
import FileUploadC from '~/components/ui/file_upload.vue'
import Field from '~/components/ui/field.vue'
import Button from '~/components/ui/button.vue'
import { useImageUpload } from '~/composables/image_upload'
import { Trash2 } from 'lucide-vue-next'

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
  link: props.gift.link,
  image: null,
})

const { uploadedFile, uploadedFilePreview, onfileChange } = useImageUpload(props.gift.image)

function submit() {
  if (form.processing) return

  if (uploadedFile.value) form.image = uploadedFile.value

  form.put(
    `/wishlists/${props.wishlistId}/categories/${props.gift.categoryId}/gifts/${props.gift.id}`,
    {
      preserveScroll: true,
    }
  )
}

function deleteGift() {
  if (form.processing) return

  form.delete(
    `/wishlists/${props.wishlistId}/categories/${props.gift.categoryId}/gifts/${props.gift.id}`,
    {
      preserveScroll: true,
    }
  )
}
</script>

<template>
  <div class="gift">
    <form class="gift__form" @submit.prevent="submit">
      <FileUploadC
        v-model:file="uploadedFile"
        :max-file-size="10000000"
        :accept="'image/*'"
        :url="uploadedFilePreview"
        @file-accept="onfileChange"
        class="gift__form-img"
      />
      <div class="gift__form__content">
        <Field label="Titre">
          <Input v-model:input="form.title" />
        </Field>
        <Field label="Description">
          <Input v-model:input="form.description" />
        </Field>
        <div>
          <Field label="Lien" class="grow">
            <Input v-model:input="form.link" />
          </Field>
          <Field label="Prix">
            <Input v-model:input="form.price" />
          </Field>
        </div>
      </div>
    </form>
    <div class="gift-btns">
      <Button @click="submit" color="yellow" size="small">Enregistrer</Button>
      <form @submit.prevent="deleteGift">
        <Button color="red" size="small" type="submit">
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
