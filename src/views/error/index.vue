<script setup lang="ts">
defineOptions({ name: 'Error' });
</script>

<template>
  <div class="error">
    <div class="bg"></div>
  </div>
</template>

<style scoped lang="scss">
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  .bg {
    width: 50%;
    height: 50vh;
    background-image: url('@/assets/images/error/404.png');
    background-position: center center;
    background-size: cover;
  }
}
</style>
