<script setup lang="ts">
  import { ref } from 'vue';
  import { Trash2 } from '@lucide/vue';
  import { Data } from '@generated/data';
  import { useForm, router } from '@inertiajs/vue3';

  import Field from '~/components/ui/field.vue';
  import Input from '~/components/ui/input.vue';
  import Button from '~/components/ui/button.vue';
  import FileUploadC from '~/components/ui/file_upload.vue';
  import { useImageUpload } from '~/composables/use_image_upload';
  import Textarea from '~/components/ui/textarea.vue';

  const { gift, wishlistId } = defineProps<{
    gift: Data.Wishlists.WishlistGift;
    wishlistId: string;
  }>();

  const form = useForm({
    id: gift.id,
    title: gift.title ?? '',
    description: gift.description ?? '',
    categoryId: gift.categoryId,
    price: gift.price ?? '',
    url: gift.url ?? '',
    image: null,
  });

  const { uploadedFile, uploadedFilePreview, onfileChange } = useImageUpload(gift.imageUrl);
  const isDeleting = ref<boolean>(false);

  function submit() {
    if (form.processing) return;

    if (uploadedFile.value) form.image = uploadedFile.value;

    form.patch(`/wishlists/${wishlistId}/categories/${gift.categoryId}/gifts/${gift.id}`, {
      preserveScroll: true,
    });
  }

  function remove() {
    if (isDeleting.value) return;

    isDeleting.value = true;

    router.delete(`/wishlists/${wishlistId}/categories/${gift.categoryId}/gifts/${gift.id}`, {
      preserveScroll: true,
      onFinish: () => {
        isDeleting.value = false;
      },
    });
  }
</script>

<template>
  <div class="gift">
    <form :id="gift.id" class="gift__form" @submit.prevent="submit()">
      <div class="gift__form-img">
        <FileUploadC
          v-model:file="uploadedFile"
          :url="uploadedFilePreview"
          @file-accept="onfileChange" />
      </div>
      <div class="gift__form__content">
        <Field label="Titre" :error="form.errors.title">
          <Input v-model:input="form.title" />
        </Field>
        <Field label="Description" :error="form.errors.description">
          <Textarea
            v-model:input="form.description"
            rows="4"
            class="w-full"
            placeholder="Décrivez votre cadeau..."
            :maxlength="500" />
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
        size="small">
        Enregistrer
      </Button>
      <form @submit.prevent="remove()">
        <Button :disabled="isDeleting" :loading="isDeleting" color="red" size="small" type="submit">
          <Trash2 :size="24" />
        </Button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .gift {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;

    &__form {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-grow: 1;

      &-img {
        width: 13rem;
        height: 13rem;
        flex: 0 0 13rem;
      }

      &__content {
        flex-grow: 1;
        flex-shrink: 1;

        & > div:last-child {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          display: block;
        }
      }

      @media (max-width: 768px) {
        display: block;
        &-img {
          width: 100%;
        }
      }
    }

    @media (max-width: 768px) {
      display: block;
    }

    &-btns {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-shrink: 0;

      @media (max-width: 768px) {
        width: 100%;

        & > button {
          flex-grow: 1;
        }
      }
    }
  }
</style>
