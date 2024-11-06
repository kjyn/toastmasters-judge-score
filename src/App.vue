<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import ScoreSheet from './components/ScoreSheet.vue'
import RankTable from './components/RankTable.vue'
import { ref } from 'vue'

const totalResults = ref([])
</script>

<template>
  <header>

    <div class="container text-center">
      <div class="row">
          <div class="col-md-8">
            <ScoreSheet @response="(result) => totalResults = result" />
          </div>
          <div class="col-md-4">
            <RankTable :totalResults="totalResults"/>
          </div>
      </div>
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>

</style>
