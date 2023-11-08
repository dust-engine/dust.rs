<template lang="pug">
UContainer
  UPage
    template(#right)
      UDocsToc(:links="page.body.toc.links")
        template(#bottom)
          .hidden.space-y-6(class="lg:block", :class="{ '!mt-6': page.body?.toc?.links?.length }")
            UDivider(v-if="page.body?.toc?.links?.length" type="dashed")
            UPageLinks(
              :links="[{ icon: '@dust:fa6-pro-brands:github', label: 'Discuss on GitHub', to: page.url, target: '_blank' }]"
            )
    UPageBody(prose)
      ContentRenderer(:value="page")
      UDocsSurround(:surround="surround")
    template(#left)
      UAside
        UNavigationTree(:links="links" :multiple="false")
</template>

<script lang="ts" setup>
  import type { Link } from '#ui-pro/types'
  import { setResponseHeader } from 'h3'

  const route = useRoute();

  const { data: page, error: pageError } = await useFetch(`/api/posts/${route.params.id}`)

  if (pageError.value && pageError.value.statusCode !== 404) {
    throw createError(pageError.value)
  }
  const { data: list, error: listError } = await useFetch<{ id: string, title: string, description: string, number: number }[]>(`/api/posts`);
  if (listError.value) {
    throw createError(listError.value)
  }

  const tree = list.value.map((item: any) => (<Link>{
    to: '/posts/' + item.number,
    label: item.title,
  }))
  const links = [<Link>{
    label: 'Blog Posts',
    icon: '@dust:fa6-pro-solid:blog',
    children: tree
  }];
  const event = useRequestEvent();
  event && setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');
  const surround = computed(() => {
    let index: number | null = null;
    for (let i = 0; i < list.value.length; i++) {
      const item = list.value[i];
      if (item.id === page.value.id) {
        index = i;
      }
    }
    if (index === null) {
      return null;
    }
    let prev: any = index > 0 ? list.value[index - 1] : null;
    let next: any = (index < (list.value.length - 1)) ? list.value[index + 1] : null;
    if (prev) {
      prev._path = '/posts/' + prev.number;
    }
    if (next) {
      next._path = '/posts/' + next.number;
    }
    return [prev, next];
  });
</script>

