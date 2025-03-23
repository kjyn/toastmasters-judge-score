<script setup>
    import { computed } from 'vue'
    
    const props = defineProps({
        totalResults: {
            type: Array,
            default: () => []
        }
    });
 
    /**
     * 順位表
     */
    const speakerRanks = computed(() => {
        const { totalResults } = props;
        const sorted = totalResults.value.slice().sort((a, b) => {
            // totalScoreの降順
            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore
            }
            // nameの昇順 (totalScoreが同じ場合)
            return a.name.localeCompare(b.name)
        })

        let rank = 1
        const result = []
        sorted.forEach((speaker, index) => {
            // 先頭でないかつ、前のスコアと異なる場合は順位を更新
            if (index > 0 && speaker.totalScore !== sorted[index - 1].totalScore) {
                rank = index + 1
            }

            result.push({
                rank: rank,
                name: speaker.name,
                totalScore: speaker.totalScore,
            })
        })

        return result
    })

    /**
     * リセット
     */
    const resetAll = () => {
        let confirmResult = confirm(`入力内容をすべて削除します。よろしいですか？`)
        if (confirmResult === false) {
            return
        }

        localStorage.clear();
        location.reload();
    }
</script>    

<template>
    <div class="table-container">
        <!-- 順位表 -->
        <table class="table table-bordered table-sm custom-table">
            <thead class="table-danger">
            <tr>
                <th>Rank</th>
                <th>Speaker</th>
                <th>Total Score</th>
            </tr>
            </thead>
            <tbody class="table-group-divider">
            <tr v-for="speaker in speakerRanks" :key="speaker.rank">
                <td>{{ speaker.rank }}</td>
                <td>{{ speaker.name }}</td>
                <td>{{ speaker.totalScore }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="footer">
        <button class="btn btn-danger" @click="resetAll">Reset All</button>
    </div>
</template>

<style scoped>
.table-container {
  margin: 10px;
  max-width: 800px;
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

.footer {
  margin: 10px;
  text-align: center;
}
</style>