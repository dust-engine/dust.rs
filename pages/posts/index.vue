<template>
  <Container class="posts-container">
    <NuxtLink  v-for="doc in list" :to="'/posts/' + doc.number" :key="doc.id">
    <Card class="post">
      <template #title>{{ doc.title }}</template>
      <template #description>{{ doc.description }}</template>
    </Card>
    </NuxtLink>
  </Container>
</template>

<script lang="ts" setup>
  import { setResponseHeader } from 'h3'
  const { data: list, error: listError } = await await useFetch(`/api/posts`)
  if (listError.value) {
    throw createError(listError.value)
  }
  
  const event = useRequestEvent();
  event && setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');
</script>