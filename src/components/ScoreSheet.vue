<script setup>
  import { ref, computed } from 'vue'
  const speakers = ref([])

  let speakerId = 0

  /**
   * スピーカー追加
   */
  function addSpeaker() {
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
  <div>
    <table class="table-primary table-bordered">
      <thead>
        <tr>
          <th><button @click="addSpeaker()">Add Speaker</button></th>
          <th v-for="speaker in speakers" :key="speaker.id">
            <button @click="deleteSpeaker(speaker.id)">del</button>
          </th>
        </tr>
        <tr>
          <th>No</th>
          <th v-for="speaker in speakers" :key="speaker.id">
            {{ speaker.id + 1 }}
          </th>
        </tr>
        <tr>
          <th>Speaker</th>
          <th v-for="speaker in speakers" :key="speaker.id">
            <input
              type="text"
              placeholder="Name"
              v-model="speaker.name" />
          </th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <td>Speech Development</td>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              min="0"
              max="15"
              placeholder="0 - 15"
              v-model="speaker.score.speechDevelopment"
            />
          </td>
        </tr>
        <tr>
          <td>Effectiveness</td>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.effectiveness"
            />
          </td>
        </tr>
        <tr>
          <td>Speech Value</td>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              min="0"
              max="25"
              placeholder="0 - 25"
              v-model="speaker.score.speechValue" />
          </td>
        </tr>
        <tr>
          <td>Physical</td>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              min="0"
              max="10"
              placeholder="0 - 110"
              v-model="speaker.score.physical" />
          </td>
        </tr>
        <tr>
          <td>Voice</td>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input type="number"
            min="0"
            max="10"
            placeholder="0 - 10"
            v-model="speaker.score.voice" />
          </td>
        </tr>
        <tr>
          <td>Manner</td>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.manner" />
          </td>
        </tr>
        <tr>
          <td>Appropriateness</td>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.appropriateness"
            />
          </td>
        </tr>
        <tr>
          <td>Correctness</td>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              min="0"
              max="10"
              placeholder="0 - 10"
              v-model="speaker.score.correctness" />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td v-for="speaker in totalResults" :key="speaker.id">
            {{ speaker.totalScore }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  