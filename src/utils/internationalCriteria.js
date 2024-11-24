import { CriteriaItem } from "./criteriaItem.js";

export class InternationalCriteria {

    // プライベートフィールドの定義
    #id = 0;
    #speaker = '';
    #scoreList = [];

    // コンストラクタ
    constructor(id, speaker) {
        this.#id = id;
        this.#speaker = speaker;

        this.#scoreList.push(new CriteriaItem(1, 'Speech Development', 0, 15));
        this.#scoreList.push(new CriteriaItem(2, 'Effectiveness', 0, 10));
        this.#scoreList.push(new CriteriaItem(3, 'Speech Value', 0, 25));
        this.#scoreList.push(new CriteriaItem(4, 'Physical', 0, 10));
        this.#scoreList.push(new CriteriaItem(5, 'Voice', 0, 10));
        this.#scoreList.push(new CriteriaItem(6, 'Manner', 0, 10));
        this.#scoreList.push(new CriteriaItem(7, 'Appropriateness', 0, 10));
        this.#scoreList.push(new CriteriaItem(8, 'Correctness', 0, 10));
    }

    // GetterとSetterの定義
    get id() {
        return this.#id;
    }

    set id(value) {
        if (typeof value === 'number' && value > 0) {
            this.#id = value;
        } else {
            throw new Error('ID must be a positive number');
        }
    }

    get speaker() {
        return this.#speaker;
    }

    set speaker(value) {
        if (typeof value === 'string' && value.trim().length > 0) {
            this.#speaker = value;
        } else {
            throw new Error('Speaker name must be a non-empty string');
        }
    }

    // 合計スコアを計算するメソッド
    get totalScore() {
        let total = 0;
        this.#scoreList.forEach((score) => {
            total += score.point;
        })
        return total;
    }
}