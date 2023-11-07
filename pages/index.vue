<template lang="pug">
ULandingHero(:links="links")
  template(#title) Dream Your World With Blocks
  template(#description)
    | A research project trying to push the boundaries of  #[strong voxel] geometry and interactivity.
    br
    | Experimental real-time global illumination renderer powered by Rust, Vulkan and Bevy.
  div(style="position: relative; padding-top: 56.25%;")
    iframe(
      src="https://customer-fzyt5otspjhnktbg.cloudflarestream.com/9e89b7abe6650d45d9064b94221cd22d/iframe?loop=true&poster=https%3A%2F%2Fcustomer-fzyt5otspjhnktbg.cloudflarestream.com%2F9e89b7abe6650d45d9064b94221cd22d%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
      style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      allowfullscreen="true")
ULandingSection(title="What We Have Now")
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
        description="Spatial Database inspired by OpenVDB, tailored for hardware ray tracing."
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
ULandingSection(title="Projects Under our Care")
  UPageGrid
    UPageCard(
        to="https://github.com/dust-engine/dust"
        title="dust"
        description="The main repository for Dust Engine."
        icon="@dust:fa6-pro-duotone:block-question")
    UPageCard(
        to="https://github.com/dust-engine/dot_vox"
        title="dot_vox"
        description="Rust parser for MagicaVoxel .vox files.")
      template(#icon)
        img.icon.w-8.h-8.flex-shrink-0(src="https://raw.githubusercontent.com/ephtracy/ephtracy.github.io/55281356d9234a005309c5ab92ff899c67ccd759/favicon.png")
    UPageCard(
        to="https://github.com/dust-engine/playout"
        title="playout"
        description="Universal shader makros. Define your bindings once and use them in both shaders and Rust."
        icon="@dust:fa6-pro-duotone:transformer-bolt"
        style="--icon-secondary-color: red; --icon-secondary-opacity: 0.6;")
    UPageCard(
        to="https://github.com/dust-engine/nrd-sys"
        title="nrd-sys"
        description="Rust FFI for NVIDIA Realtime Denoiser"
        icon="@dust:fa6-pro-regular:filter")
    UPageCard(
        to="https://github.com/dust-engine/aftermath-rs"
        title="aftermath-rs"
        description="NVIDIA Aftermath SDK for Rust")
      template(#icon)
        img.icon.w-8.h-8.flex-shrink-0(src="https://developer.download.nvidia.com/images/nvidia-nsight-aftermath-icon.png")
</template>


<script setup>
const links = [
  { label: 'Learn More', icon: '@dust:fa6-pro-solid:book', size: 'lg', to: '/posts/12' },
  { label: 'Open on GitHub', icon: '@dust:fa6-pro-brands:github',  trailingIcon: '@dust:fa6-pro-solid:arrow-right', color: 'gray', size: 'lg', to: 'https://github.com/dust-engine/dust', target: '_blank' }
]
</script>