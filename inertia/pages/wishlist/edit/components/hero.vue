<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Eye } from 'lucide-vue-next'
import Button from '~/components/ui/button.vue'
import Clipboard from '~/components/ui/clipboard.vue'
import DatePicker from '~/components/ui/date_picker.vue'
import Field from '~/components/ui/field.vue'
import FileUpload from '~/components/ui/file_upload.vue'
import Input from '~/components/ui/input.vue'
import Select from '~/components/ui/select.vue'
import Switch from '~/components/ui/switch.vue'
import Textarea from '~/components/ui/textarea.vue'
import { useImageUpload } from '~/composables/use_image_upload'
import type { WishlistTheme, Wishlist } from '~/types'

const { themes, wishlist } = defineProps<{
  themes: WishlistTheme[]
  wishlist: Wishlist
}>()

const themeOptions = themes.map((theme) => ({
  label: theme.name,
  value: theme.id.toString(),
}))

const form = useForm({
  id: wishlist.id,
  title: wishlist.title,
  description: wishlist.description,
  eventDate: wishlist.eventDate.toString(),
  themeId: [wishlist.theme?.id.toString()],
  isPublic: wishlist.isPublic,
  categories: wishlist.categories,
  image: null,
})

const { uploadedFile, uploadedFilePreview, onfileChange } = useImageUpload(wishlist.imageUrl)

function submit() {
  if (form.processing) return

  if (uploadedFile.value) form.image = uploadedFile.value

  form
    .transform((data) => ({
      ...data,
      themeId: data.themeId[0],
      eventDate: data.eventDate,
    }))
    .put(`/wishlists/${wishlist.id}`, {
      preserveScroll: true,
    })
}
</script>

<template>
  <form class="hero" @submit.prevent="submit()">
    <Field label="Image de fond" for="bg-img" :error="form.errors.image" class="hero__img">
      <FileUpload
        v-model:file="uploadedFile"
        :url="uploadedFilePreview"
        @file-accept="onfileChange"
      />
    </Field>
    <div class="hero__form">
      <Field label="Titre" for="title" :error="form.errors.title">
        <Input id="title" v-model:input="form.title" type="text" class="w-full" />
      </Field>
      <Field label="Date de l'évènement" for="eventDate" :error="form.errors.eventDate">
        <DatePicker
          label="Date de l'évènement"
          :value="form.eventDate"
          @update:value="(val) => (form.eventDate = val)"
        />
      </Field>
      <Field label="Theme" for="theme" :error="form.errors.themeId">
        <Select v-model="form.themeId" :items="themeOptions" />
      </Field>
    </div>
    <div class="d-flex g-4">
      <Field label="Description" :error="form.errors.description" class="grow">
        <Textarea
          v-model:input="form.description"
          rows="4"
          class="w-full"
          placeholder="Décrivez votre wishlist..."
          :maxlength="500"
        />
      </Field>
      <Switch v-model:checked="form.isPublic" label="Publier" />
    </div>
    <div v-if="wishlist.url" class="d-flex items-end g-4 pb-5">
      <Clipboard v-model:="wishlist.url" label="Lien partageable" class="w-full" />
      <div class="pt-2">
        <a
          :href="`/wishlists/${wishlist.slug}`"
          target="_blank"
          class="hero__preview"
          title="Voir la wishlist"
        >
          <Eye :size="22" />
        </a>
      </div>
    </div>
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

    & > :first-child {
      flex: 65%;
    }

    & > :nth-child(2) {
      z-index: 10;
      flex: 15%;
      min-width: 13rem;
    }

    & > :last-child {
      flex: 15%;
      min-width: 13rem;
    }
  }

  &__preview {
    width: 40px;
    height: 44px;
    border: 2px solid var(--gray-800);
    background-color: var(--white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
