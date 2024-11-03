<script setup>
    import { computed } from 'vue'
    
    const props = defineProps({
        totalResults: [{
            id: Number,
            name: String,
            totalScore: Number
        }]
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
</script>    

<template>
    <div>
        <!-- 順位表 -->
        <table border="1">
            <thead>
            <tr>
                <th>Rank</th>
                <th>Speaker Name</th>
                <th>Total Score</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="speaker in speakerRanks" :key="speaker.rank">
                <td>{{ speaker.rank }}</td>
                <td>{{ speaker.name }}</td>
                <td>{{ speaker.totalScore }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>