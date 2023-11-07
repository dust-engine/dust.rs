<template lang="pug">
ULandingHero(:links="links")
  template(#title) Dream Your World With Blocks
  template(#description) Dust Engine is a research project trying to push the boundaries of geometry and interactivity.
ULandingSection(title="What we have now")
  ULandingGrid
    ULandingCard.col-span-8.row-span-5(
        title="Real Time Global Illumination"
        description="Real Time GI based on Surfels & Irradiance Caching with spatial hash."
        icon="@dust:fa6-pro-solid:lighthouse")
      .flex.justify-end
        UButton(to="/posts/14") Learn More
    ULandingCard.col-span-4.row-span-5(
        title="Hardware Ray Tracing"
        description="A framework to easily create ray tracing pipelines."
        icon="bi:gpu-card")
    ULandingCard.col-span-6.row-span-5(
        title="Volumetric Data Structure"
        description="A framework to easily create ray tracing pipelines."
        icon="@dust:fa6-pro-regular:cube")
      .flex.justify-end
        UButton(to="/posts/13") Learn More
    ULandingCard.col-span-3.row-span-5(
        title="Denoiser"
        description="Implementation based on NVIDIA ReBlur Realtime Denoiser"
        icon="@dust:fa6-pro-regular:filter")
    ULandingCard.col-span-3.row-span-5(
        title="Async Render Graph"
        description="A new way to compose render passes and manage render resources."
        icon="@dust:fa6-pro-solid:diagram-project")
</template>


<script setup>
const links = [
  { label: 'Learn More', icon: '@dust:fa6-pro-solid:book', size: 'lg', to: '/posts/12' },
  { label: 'Open on GitHub', icon: '@dust:fa6-pro-brands:github',  trailingIcon: '@dust:fa6-pro-solid:arrow-right', color: 'gray', size: 'lg', to: 'https://github.com/dust-engine/dust', target: '_blank' }
]
</script>