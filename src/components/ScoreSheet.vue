<script setup>
  import { InternationalCriteria } from '../utils/internationalCriteria.js'
  import { ref, computed, watch, nextTick } from 'vue'
  
//   let speakerId = 0;

  const speakers = ref(loadSpeakers());

  /**
   * スピーカー追加
   */
  function addSpeaker() {
    // 追加できるスピーカーは20名まで
    if (speakers.value.length >= 20) {
      return
    }

    const speakerId = speakers.value.length;
    speakers.value.push(new InternationalCriteria(speakerId, ''));
    saveSpeakers();

    // スピーカー追加後にスクロールを最右端に移動
    nextTick(() => {
      const tableResponsive = document.querySelector('.table-responsive');
      if (tableResponsive) {
        tableResponsive.scrollLeft = tableResponsive.scrollWidth;
      }
    });
  }

  /**
   * スピーカー削除
   * @param {number} id スピーカーID
   */
  function deleteSpeaker(id) {
    // スピーカーが1名の場合は削除不可
    if(speakers.value.length <= 1) {
      return
    }

    // 確認ダイアログ
    let confirmResult = confirm(`${ String(id + 1) }: ${ speakers.value[id].name }を削除します。よろしいですか？`)
    if (confirmResult === false) {
        return
    }

    // 削除
    speakers.value.splice(id, 1)

    // IDの振り直し
    let speakerId = 0;
    speakers.value.forEach(speaker => {
        speaker.id = speakerId++
    })

    saveSpeakers();
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

  /**
   * スピーカー情報を保存
   */
   function saveSpeakers() {
    localStorage.setItem('speakers', JSON.stringify(speakers.value));
  }

  /**
   * スピーカー情報を読み込み
   */
  function loadSpeakers() {
    const savedSpeakers = localStorage.getItem('speakers');
    let speakerId = 0;
    if (savedSpeakers) {
      const parsedSpeakers = JSON.parse(savedSpeakers);
      speakerId = parsedSpeakers.length;
      return parsedSpeakers.map(speaker => new InternationalCriteria(speaker.id, speaker.name, speaker.score));
    }
    return [new InternationalCriteria(speakerId, '')];
  }

  // スピーカー情報が変更されたときに保存
  watch(speakers, saveSpeakers, { deep: true });

    /**
   * スコアの範囲をチェック
   */
   function checkScoreRange(speaker, criterion, min, max) {
    if (speaker.score[criterion] < min) {
      speaker.score[criterion] = min;
    } else if (speaker.score[criterion] > max) {
      speaker.score[criterion] = max;
    }
  }
</script>

<template>
  <div class="table-responsive">
    <table class="table table-bordered table-sm" id="score-table">
      <thead class="table-primary">
        <tr class="fixed-row">
          <th class="fixed-column">
            <button class="btn btn-success" @click="addSpeaker()">Add Speaker</button>
          </th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <button class="delete-button" @click="deleteSpeaker(speaker.id)">
              <img src="../assets/icons/delete.png" alt="Delete This Speaker">
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
          <th class="fixed-column">Name</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="text"
              class="form-control name-input"
              placeholder=""
              v-model="speaker.name" />
          </td>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <th class="fixed-column">Speech Development (15)</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="15"
              placeholder="0 - 15"
              onfocus="this.select();"
              v-model="speaker.score.speechDevelopment"
              @blur="checkScoreRange(speaker, 'speechDevelopment', 0, 15)"
            />
          </td>
        </tr>
        <tr>
          <th class="fixed-column">Effectiveness (10)</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              onfocus="this.select();"
              v-model="speaker.score.effectiveness"
              @blur="checkScoreRange(speaker, 'effectiveness', 0, 10)"
            />
          </td>
        </tr>
        <tr>
          <th class="fixed-column">Speech Value (25)</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="25"
              placeholder="0 - 25"
              onfocus="this.select();"
              v-model="speaker.score.speechValue"
              @blur="checkScoreRange(speaker, 'speechValue', 0, 25)"
            />
          </td>
        </tr>
        <tr>
          <th class="fixed-column">Physical (10)</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              onfocus="this.select();"
              v-model="speaker.score.physical"
              @blur="checkScoreRange(speaker, 'physical', 0, 10)"
            />
          </td>
        </tr>
        <tr>
          <th class="fixed-column">Voice (10)</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              onfocus="this.select();"
              v-model="speaker.score.voice"
              @blur="checkScoreRange(speaker, 'voice', 0, 10)"
            />
          </td>
        </tr>
        <tr>
          <th class="fixed-column">Manner (10)</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              onfocus="this.select();"
              v-model="speaker.score.manner"
              @blur="checkScoreRange(speaker, 'manner', 0, 10)"
            />
          </td>
        </tr>
        <tr>
          <th class="fixed-column">Appropriateness (10)</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              onfocus="this.select();"
              v-model="speaker.score.appropriateness"
              @blur="checkScoreRange(speaker, 'appropriateness', 0, 10)"
            />
          </td>
        </tr>
        <tr>
          <th class="fixed-column">Correctness (10)</th>
          <td v-for="speaker in speakers" :key="speaker.id">
            <input
              type="number"
              class="form-control score-input"
              min="0"
              max="10"
              placeholder="0 - 10"
              onfocus="this.select();"
              v-model="speaker.score.correctness"
              @blur="checkScoreRange(speaker, 'correctness', 0, 10)"
            />
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

.score-input {
  text-align: right;
}

.name-input {
  text-align: left;
}

tfoot td {
  text-align: right;
}

@media (min-width: 1024px) {
  .delete-button img {
    width: 32px;
    height: 32px;
  }
  
  table th,
  table td {
    padding: 12px;
    min-width: 160px;
  }
}

@media (max-width: 1023px) {
  .delete-button img {
    width: 24px;
    height: 24px;
  }

  table th,
  table td {
    padding: 5px;
    min-width: 100px;
  }
}

</style>
  