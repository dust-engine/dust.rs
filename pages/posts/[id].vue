<template lang="pug">
UContainer
  UPage
    template(#right v-if="page.body?.toc?.links?.length")
      UDocsToc(:links="page.body.toc.links")
    UPageBody(prose)
      ContentRenderer(:value="page")
    template(#left)
      UAside
        UNavigationTree(:links="links" :multiple="false")
</template>

<script lang="ts" setup>
  import type { Link } from '#ui-pro/types'
  import { setResponseHeader } from 'h3'

  const route = useRoute()

  const { data: page, error: pageError } = await useAsyncData(
    'post',
    () => $fetch(`/api/posts/${route.params.id}`),
    //{ watch: [route.params.id] }
  )
  if (pageError.value && pageError.value.statusCode !== 404) {
    throw createError(pageError.value)
  }
  const { data: list, error: listError } = await useAsyncData(
    'posts',
    () => $fetch(`/api/posts`),
  )
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
</script>

