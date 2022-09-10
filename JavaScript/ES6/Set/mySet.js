class MySet {
    constructor(iterator = []) { //没穿参数则默认为空数组
        //验证是否是可迭代对象 
        if(typeof iterator[Symbol.iterator] !== 'function') {
            throw TypeError(`你提供的参数${iterator}不是一个可迭代对象`);
        }
        this._data = [];
        for (const item of iterator) {
            this.add(item);
        }
    }

    add(data) {
        if(!this.has(data)) {
            this._data.push(data);
        }
    }

    has(data) {
        for (const item of this._data) {
            if(this.isSame(data, item)) {
                return true;
            }
        }
        return false;
    }

    delete(data) {
        for (let i = 0; i < this._data.length; i++) {
            const element = this._data[i];
            if(this.isSame(data, element)) {
                this._data.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    clear() {
        this._data.length = 0;
    }

    forEach(callback) {
        for (const item of this._data) {
            callback(item, item, this);
        }
    }

    //只读
    get size() {
        return this._data.length;
    }

    *[Symbol.iterator]() {
        for (const item of this._data) {
            yield item;
        }
    }
    /**
     * 判断两个数据是否相等
     * @param {*} data1 
     * @param {*} data2 
     */
    isSame(data1, data2) {
        if(data1 === 0 && data2 === 0) { //在set里+0等于-0
            return true;
        }
        return Object.is(data1, data2);
    }

}