<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import PageTitle from './components/PaageTitle.vue'
import ScoreSheet from './components/ScoreSheet.vue'
import RankTable from './components/RankTable.vue'
import { ref } from 'vue'

const totalResults = ref([])
</script>

<template>
  <header>
    <div class="container-fluid text-center">
      <div class="row">
        <PageTitle></PageTitle>
      </div>
    </div>
  </header>

  <div class="container-fluid text-center">
    <div class="row">
        <div class="col-md-8">
          <ScoreSheet @response="(result) => totalResults = result" />
        </div>
        <div class="col-md-4">
          <RankTable :totalResults="totalResults"/>
        </div>
    </div>
  </div>

  <!-- <RouterView /> -->
</template>

<style scoped>

</style>
