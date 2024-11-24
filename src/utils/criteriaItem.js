export class CriteriaItem {
    // プライベートフィールドの定義
    #no = 0;
    #name = '';
    #min = 0;
    #max = 0;
    #point = 0;

    // コンストラクタ
    constructor(no, name, min, max) {
        this.#no = no; // setterを使用
        this.#name = name; // setterを使用
        this.#min = min; // setterを使用
        this.#max = max; // setterを使用
    }

    // GetterとSetterの定義

    // no
    get no() {
        return this.#no;
    }

    set no(value) {
        if (typeof value === 'number' && value > 0) {
            this.#no = value;
        } else {
            throw new Error('No must be a positive number');
        }
    }

    // itemName
    get name() {
        return this.#name;
    }

    set name(value) {
        if (typeof value === 'string' && value.trim().length > 0) {
            this.#name = value;
        } else {
            throw new Error('Item name must be a non-empty string');
        }
    }

    // min
    get min() {
        return this.#min;
    }

    set min(value) {
        if (typeof value === 'number' && value >= 0) {
            this.#min = value;
        } else {
            throw new Error('Min must be a non-negative number');
        }
    }

    // max
    get max() {
        return this.#max;
    }

    set max(value) {
        if (typeof value === 'number' && value >= 0) {
            this.#max = value;
        } else {
            throw new Error('Max must be a non-negative number');
        }
    }

    // point
    get point() {
        return this.#point;
    }

    set point(value) {
        if (typeof value === 'number' && value >= this.#min && value <= this.#max) {
            this.#point = value;
        } else if (typeof value === 'number' && value < this.#min) {
            this.#point = this.#min;
        } else if (typeof value === 'number' && value > this.#max) {
            this.#point = this.#max;
        } else {
            throw new Error(`${this.#name} must be a number between min:${this.#min} and max:${this.#max}`);
        }
    }
}