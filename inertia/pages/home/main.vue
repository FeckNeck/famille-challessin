<script setup lang="ts">
  import { Search } from '@lucide/vue';
  import { computed, ref, watch } from 'vue';
  import type { Data } from '@generated/data';
  import { Head, router } from '@inertiajs/vue3';
  import { useUrlSearchParams, watchDebounced } from '@vueuse/core';

  import Hero from './components/hero.vue';
  import Layout from '~/layouts/default.vue';
  import Order from './components/order.vue';
  import Input from '~/components/ui/input.vue';
  import Filters from './components/filters.vue';
  import Select from '~/components/ui/select.vue';
  import Pagination from './components/pagination.vue';
  import MainSection from './components/main_section.vue';
  import type { WishlistFilter, SortOrder, InertiaPaginationMeta } from '~/types';

  const { users, wishlists, themes } = defineProps<{
    users: Data.Auth.UserList[];
    wishlists: {
      data: Data.Wishlists.Wishlist[];
      metadata: InertiaPaginationMeta;
    };
    themes: Data.Wishlists.WishlistTheme[];
  }>();

  const params = useUrlSearchParams<Partial<WishlistFilter>>('history');

  const scrollToTopRef = ref<HTMLElement | null>(null);

  function scrollToTop() {
    if (!scrollToTopRef.value) return;
    scrollToTopRef.value.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Search
   */
  const search = ref<string>((params.title as string) || '');
  watchDebounced(search, () => fetchNewPageData(1), { debounce: 400 });

  /**
   * Order by
   */
  const orderByOptions = [
    { label: 'Titre', value: 'title', description: 'Trier les listes par leur nom' },
    {
      label: 'Date de création',
      value: 'created_at',
      description: 'Trier les listes par leur date de création',
    },
    {
      label: "Date d'évènement",
      value: 'event_date',
      description: "Trier les listes par leur date d'évènement",
    },
  ];
  const order = ref<SortOrder>(params.order || 'desc');
  const orderBy = ref<string>(params.orderBy || orderByOptions[1].value);

  /**
   * Filters
   */
  const usersFilter = computed(() => users);
  const usersOptions = [
    { label: 'All', value: '' },
    ...users.map((user) => ({ label: user.username, value: user.username })),
  ];
  const username = ref<string>(params.username || '');
  const themesFilter = computed(() => themes);
  const theme = ref<string>(params.theme || '');

  /**
   * Refetch when any of the filters change
   */
  watch([username, theme, order, orderBy], () => {
    fetchNewPageData(1);
  });

  function fetchNewPageData(page: number) {
    const props = {
      page,
      order: order.value,
      orderBy: orderBy.value,
      username: username.value,
      theme: theme.value,
      title: search.value,
    };

    router.get('/', props, { preserveState: true, preserveScroll: true });
    scrollToTop();
  }
</script>

<template>
  <Head title="Page d'accueil" />
  <Layout>
    <Hero />
    <div class="relative" ref="scrollToTopRef">
      <div class="container">
        <div class="whishlist">
          <Filters
            :themes="themesFilter"
            :users="usersFilter"
            v-model:username="username"
            v-model:theme="theme" />
          <div class="whishlist__content">
            <div class="whishlist__content__filters">
              <Input
                v-model:input="search"
                placeholder="Rechercher par titre"
                type="search"
                radius="rfull"
                class="whishlist__content__filters__search">
                <template #left-icon>
                  <Search />
                </template>
              </Input>
              <Select
                :items="usersOptions"
                v-model:model-value="username"
                class="whishlist__content__filters__users" />
              <div class="whishlist__content__filters__order">
                <Order v-model:order="order" />
                <Select :items="orderByOptions" v-model:model-value="orderBy" />
              </div>
            </div>
            <MainSection :wishlists="wishlists.data" />
            <Pagination
              :total="wishlists.metadata.total"
              :last-page="wishlists.metadata.lastPage"
              :current-page="wishlists.metadata.currentPage"
              @update="fetchNewPageData" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
  .whishlist {
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 18rem 1fr;
      gap: 3rem;
      align-items: flex-start;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;

      &__filters {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.5rem;
        width: 100%;

        &__search {
          width: 100%;
        }

        &__users {
          display: block;
        }

        &__order {
          display: flex;
          width: 100%;
        }

        @media (min-width: 768px) {
          flex-direction: row;

          &__search {
            width: 250px;
          }

          &__users {
            display: none;
          }

          &__order {
            width: 275px;
          }
        }
      }
    }
  }
</style>
