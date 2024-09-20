<script setup lang="ts">
import type { WishlistTheme, Wishlist } from '~/types'
import { useForm } from '@inertiajs/vue3'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import DatePicker from '~/components/ui/date_picker.vue'
import FileUpload from '~/components/ui/file_upload.vue'
import Select from '~/components/ui/select.vue'
import { computed } from 'vue'
import Button from '~/components/ui/button.vue'
import { useImageUpload } from '~/composables/image_upload'

const props = defineProps<{
  themes: WishlistTheme[]
  wishlist: Wishlist
}>()

const themeOptions = props.themes.map((theme) => ({
  label: theme.name,
  value: theme.id.toString(),
}))

const form = useForm({
  id: props.wishlist.id,
  title: props.wishlist.title,
  description: props.wishlist.description,
  eventDate: props.wishlist.eventDate,
  themeId: [props.wishlist.theme.id.toString()],
  isPublic: props.wishlist.isPublic,
  categories: props.wishlist.categories,
  image: null,
})

const { uploadedFile, uploadedFilePreview, onfileChange } = useImageUpload(props.wishlist.imageUrl)

function submit() {
  if (form.processing) return

  if (uploadedFile.value) form.image = uploadedFile.value

  form
    .transform((data) => ({
      ...data,
      themeId: +data.themeId[0],
    }))
    .put(`/wishlists/${props.wishlist.id}`, {
      preserveScroll: true,
    })
}
</script>

<template>
  <form @submit.prevent="submit()" class="hero">
    <FileUpload
      v-model:file="uploadedFile"
      :max-file-size="10000000"
      :accept="'image/*'"
      :url="uploadedFilePreview"
      @file-accept="onfileChange"
      class="hero__img"
    />
    <div class="hero__form">
      <Field label="Titre" for="title" :error="form.errors.title">
        <Input v-model:input="form.title" id="title" type="text" class="w-full" />
      </Field>
      <Field label="Date de l'évènement" class="hero__form-date">
        <DatePicker label="Date de l'évènement" />
      </Field>
      <Field label="Theme" for="theme" :error="form.errors.themeId">
        <Select
          :items="themeOptions"
          v-model="form.themeId"
          class="whishlist__content__filters__users"
        />
      </Field>
    </div>
    <Field label="Description" :error="form.errors.description">
      <Input v-model:input="form.description" type="text" class="w-full" />
    </Field>
    <Button :disabled="form.processing" color="yellow" size="small" class="w-full" type="submit">
      Enregistrer
    </Button>
  </form>
</template>

<style scoped lang="scss">
.hero {
  background-color: var(--white);
  border-radius: var(--rounded-lg);
  border: 2px solid black;
  box-shadow: var(--shadow-medium);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  padding: 1rem 1rem 1rem;

  &__img {
    height: 100%;
    padding-bottom: 1rem;
  }

  &__form {
    display: grid;
    grid-template-columns: 1fr 0.3fr 0.3fr;
    gap: 1rem;

    &-date {
      z-index: 10;
    }
  }
}
</style>
