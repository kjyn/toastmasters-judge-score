import { CriteriaItem } from "./criteriaItem.js";

export class InternationalCriteria {

    // プライベートフィールドの定義
    #id = 0;
    #speakerName = '';
    #scoreList = [];

    // コンストラクタ
    constructor(id, speakerName) {
        this.#id = id;
        this.#speakerName = speakerName;

        this.#scoreList.push(new CriteriaItem(0, 'Speech Development', 0, 15));
        this.#scoreList.push(new CriteriaItem(1, 'Effectiveness', 0, 10));
        this.#scoreList.push(new CriteriaItem(2, 'Speech Value', 0, 25));
        this.#scoreList.push(new CriteriaItem(3, 'Physical', 0, 10));
        this.#scoreList.push(new CriteriaItem(4, 'Voice', 0, 10));
        this.#scoreList.push(new CriteriaItem(5, 'Manner', 0, 10));
        this.#scoreList.push(new CriteriaItem(6, 'Appropriateness', 0, 10));
        this.#scoreList.push(new CriteriaItem(7, 'Correctness', 0, 10));
    }

    // GetterとSetterの定義
    get id() {
        return this.#id;
    }

    set id(value) {
        if (typeof value === 'number' && value >= 0) {
            this.#id = value;
        } else {
            throw new Error('ID must be a positive number');
        }
    }

    get speakerName() {
        return this.#speakerName;
    }

    set speakerName(value) {
        if (typeof value === 'string' && value.trim().length > 0) {
            this.#speakerName = value;
        } else {
            throw new Error('Speaker Name must be a non-empty string');
        }
    }

    get scoreList() {
        return this.#scoreList;
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