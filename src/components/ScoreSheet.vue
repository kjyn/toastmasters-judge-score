<script setup>
  import { ref, computed } from 'vue'
  
  let speakerId = 0

  const speakers = ref([{
      id: speakerId++,
      name: '',
      score: {
        speechDevelopment: 0,
        effectiveness: 0,
        speechValue: 0,
        physical: 0,
        voice: 0,
        manner: 0,
        appropriateness: 0,
        correctness: 0,
      },
    }])

  /**
   * スピーカー追加
   */
  function addSpeaker() {
    // 追加できるスピーカーは20名まで
    if (speakers.value.length >= 20) {
      return
    }

    speakers.value.push({
      id: speakerId++,
      name: '',
      score: {
        speechDevelopment: 0,
        effectiveness: 0,
        speechValue: 0,
        physical: 0,
        voice: 0,
        manner: 0,
        appropriateness: 0,
        correctness: 0,
      },
    })
  }

  /**
   * スピーカー削除
   * @param {number} id スピーカーID
   */
  function deleteSpeaker(id) {
    // 削除
    speakers.value.splice(id, 1)

    // IDの振り直し
    speakerId = 0
    speakers.value.forEach(speaker => {
      speaker.id = speakerId++
    })
  }

  /**
   * 合計スコアの算出
   */
  const totalResults = computed(() => {
    const totalResult = []
    speakers.value.forEach(speaker => {
      let totalScore = 0
      for (let criterion in speaker.score) {
        totalScore += Number(speaker.score[criterion])
      }

      totalResult.push({
        id: speaker.id,
        name: speaker.name,
        totalScore: totalScore,
      })
    })

    return totalResult
  })

  // 親要素にスピーカー名、合計スコアのリストを渡す
  const emit = defineEmits(['response'])
  emit('response', totalResults)

</script>

<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover custom-table">
      <thead class="table-primary">
        <tr>
          <th><button @click="addSpeaker()">Add Speaker</button></th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <button @click="deleteSpeaker(speaker.id)">del</button>
          </td>
        </tr>
        <tr>
          <th>No</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            {{ speaker.id + 1 }}
          </td>
        </tr>
        <tr>
          <th>Speaker</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="text"
              class="form-control score-input"
              placeholder="Name"
              v-model="speaker.name" />
          </td>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <th>Speech Development</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="15"
              placeholder="0 - 15"
              v-model="speaker.score.speechDevelopment"
            />
          </td>
        </tr>
        <tr>
          <th>Effectiveness</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.effectiveness"
            />
          </td>
        </tr>
        <tr>
          <th>Speech Value</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="25"
              placeholder="0 - 25"
              v-model="speaker.score.speechValue" />
          </td>
        </tr>
        <tr>
          <th>Physical</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.physical" />
          </td>
        </tr>
        <tr>
          <th>Voice</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.voice" />
          </td>
        </tr>
        <tr>
          <th>Manner</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.manner" />
          </td>
        </tr>
        <tr>
          <th>Appropriateness</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.appropriateness"
            />
          </td>
        </tr>
        <tr>
          <th>Correctness</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.correctness" />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td v-for="speaker in totalResults" :key="speaker.id">
            {{ speaker.totalScore }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
  

<style scoped>
.table-container {
  margin: 10px;
  /* max-width: 1320px; */
  overflow-x: auto;
}

.custom-table {
  background-color: #f8f9fa; /* 背景色を薄いグレーに */
}

.custom-table th,
.custom-table td {
  text-align: center;
  vertical-align: middle;
  padding: 12px;
}

.custom-table tbody tr:hover {
  background-color: #e9ecef; /* ホバー時に背景色を少し暗く */
}

.table-primary {
  background-color: #007bff;
  color: #fff;
}

.table-primary th {
  font-weight: bold;
}
</style>
  