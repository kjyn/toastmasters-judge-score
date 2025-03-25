export class InternationalCriteria {
    constructor(id, name, score = {}) {
        this.id = id;
        this.name = name;
        this.score = {
          speechDevelopment: score.speechDevelopment || 0,
          effectiveness: score.effectiveness || 0,
          speechValue: score.speechValue || 0,
          physical: score.physical || 0,
          voice: score.voice || 0,
          manner: score.manner || 0,
          appropriateness: score.appropriateness || 0,
          correctness: score.correctness || 0,
        };
    }

    get scoreList() {
        return this.#scoreList;
    }

    // 合計スコアを計算するメソッド
    get totalScore() {
        let total = 0;
        this.scoreList.forEach((score) => {
            total += score.point;
        })
        return total;
    }
}