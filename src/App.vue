<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import ScoreSheet from './components/ScoreSheet.vue'
import RankTable from './components/RankTable.vue'
import { ref } from 'vue'

const totalResults = ref([])
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->

    <div class="container-md">
      <ScoreSheet @response="(result) => totalResults = result" />
    </div>
    <div class="container-md">
      <RankTable :totalResults="totalResults"/>
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>

</style>
