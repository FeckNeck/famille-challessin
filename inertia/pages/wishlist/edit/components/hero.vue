<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { useImageUpload } from '~/composables/image_upload'
import Button from '~/components/ui/button.vue'
import DatePicker from '~/components/ui/date_picker.vue'
import Field from '~/components/ui/field.vue'
import FileUpload from '~/components/ui/file_upload.vue'
import Input from '~/components/ui/input.vue'
import Select from '~/components/ui/select.vue'
import Switch from '~/components/ui/switch.vue'
import type { WishlistTheme, Wishlist } from '~/types'
import Clipboard from '~/components/ui/clipboard.vue'

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
  eventDate: [props.wishlist.eventDate.toString()],
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
      themeId: data.themeId[0],
      eventDate: data.eventDate[0],
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
      <Field label="Date de l'évènement" for="eventDate" :error="form.errors.eventDate">
        <DatePicker label="Date de l'évènement" v-model:model-value="form.eventDate" />
      </Field>
      <Field label="Theme" for="theme" :error="form.errors.themeId">
        <Select
          :items="themeOptions"
          v-model="form.themeId"
          class="whishlist__content__filters__users"
        />
      </Field>
    </div>
    <div class="d-flex g-4">
      <Field label="Description" :error="form.errors.description" class="grow">
        <Input v-model:input="form.description" type="text" class="w-full" />
      </Field>
      <Switch v-model:checked="form.isPublic" label="Publier" />
    </div>
    <Clipboard
      v-if="wishlist.url"
      :value="wishlist.url"
      label="Lien partageable"
      class="w-full pb-5"
    />
    <Button
      :disabled="form.processing"
      :loading="form.processing"
      color="yellow"
      size="small"
      class="w-full"
      type="submit"
    >
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
  min-height: calc(100vh - 5rem);
  padding: 1rem 1rem 1rem;

  &__img {
    flex-grow: 1;
    padding-bottom: 1rem;
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    column-gap: 1rem;

    div:first-child {
      flex: 65%;
    }

    div:nth-child(2) {
      z-index: 10;
      flex: 15%;
      min-width: 13rem;
    }

    div:last-child {
      flex: 15%;
      min-width: 13rem;
    }
  }
}
</style>
