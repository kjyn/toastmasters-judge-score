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
    let confirmResult = confirm(`${ String(id + 1) }: ${ speakers.value[id].name }を削除します。よろしいですか？`)
    if (confirmResult === false) {
      return
    }

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
    <table class="table table-bordered table-sm">
      <thead class="table-primary">
        <tr class="fixed-row">
          <th class="fixed-column">
            <button class="btn btn-success" @click="addSpeaker()">Add Speaker</button>
          </th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <button class="delete-button" @click="deleteSpeaker(speaker.id)">
              <img src="./icons/delete.png" alt="Delete This Speaker">
            </button>
          </td>
        </tr>
        <tr class="fixed-row">
          <th class="fixed-column">No</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            {{ speaker.id + 1 }}
          </td>
        </tr>
        <tr class="fixed-row">
          <th class="fixed-column">Speaker</th>
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
          <th class="fixed-column">Speech Development</th>
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
          <th class="fixed-column">Effectiveness</th>
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
          <th class="fixed-column">Speech Value</th>
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
          <th class="fixed-column">Physical</th>
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
          <th class="fixed-column">Voice</th>
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
          <th class="fixed-column">Manner</th>
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
          <th class="fixed-column">Appropriateness</th>
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
          <th class="fixed-column">Correctness</th>
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
      <tfoot class="table-primary table-group-divider">
        <tr>
          <th class="fixed-column">Total</th>
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
  position: relative;
  white-space: nowrap;
}

.fixed-row {
    position: sticky;
    top: 0;
    z-index: 10; /* ヘッダーを他の要素の上に表示 */
}

.fixed-column {
    position: sticky;
    left: 0;
    z-index: 5; /* 列ヘッダーを他の要素の上に表示 */
    min-width: 120px;
}


table th,
table td {
  text-align: center;
  vertical-align: middle;
  padding: 12px;
  min-width: 100px;
}

tbody tr:hover {
  background-color: #e9ecef; /* ホバー時に背景色を少し暗く */
}

.table-primary {
  background-color: #007bff;
  color: #fff;
}

.table-primary th {
  font-weight: bold;
}

.delete-button {
  background: none; /* 背景を透明に */
  border: none; /* ボーダーを消す */
  cursor: pointer; /* ポインターにする */
  padding: 0; /* パディングをなくす */
}

@media (min-width: 1024px) {
  .delete-button img {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 1023px) {
  .delete-button img {
    width: 24px;
    height: 24px;
  }
}

</style>
  