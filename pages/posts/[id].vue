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
  import { setResponseHeader } from 'h3'

  const route = useRoute();

  const { data: page, error: pageError } = await useFetch(`/api/posts/${route.params.id}`)

  if (pageError.value && pageError.value.statusCode !== 404) {
    throw createError(pageError.value)
  }

  const posts = await useNavPosts();
  const links = await useNavTree();

  const event = useRequestEvent();
  event && setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');
  const surround = computed(() => {
    let index: number | null = null;
    for (let i = 0; i < posts.value.length; i++) {
      const item = posts.value[i];
      if (item.id === page.value.id) {
        index = i;
      }
    }
    if (index === null) {
      return null;
    }
    let prev: any = index > 0 ? posts.value[index - 1] : null;
    let next: any = (index < (posts.value.length - 1)) ? posts.value[index + 1] : null;
    if (prev) {
      prev._path = '/posts/' + prev.number;
    }
    if (next) {
      next._path = '/posts/' + next.number;
    }
    return [prev, next];
  });
</script>

