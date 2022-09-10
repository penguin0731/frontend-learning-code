class MyMap {
    constructor(iterator = []) {
        //验证是否是可迭代对象
        if (typeof iterator[Symbol.iterator] !== 'function') {
            throw TypeError(`你提供的${iterator}不是一个可迭代对象`);
        }
        this._data = [];
        for (const item of iterator) {
            //item也必须是一个可迭代对象
            if (typeof item[Symbol.iterator] !== 'function') {
                throw TypeError(`你提供的${item}不是一个可迭代对象`);
            }
            const iterator = item[Symbol.iterator]();
            const key = iterator.next().value;
            const value = iterator.next().value;
            this.set(key, value);
        }
    }

    set(key, value) {
        const obj = this._getObj(key);
        if (obj) {
            //修改
            obj.value = value;
        } else {
            this._data.push({
                key,
                value
            });
        }
    }

    get(key) {
        return this._getObj(key).value;
    }

    has(key) {
        return this._getObj(key) !== undefined;
    }

    delete(key) {
        for (let i = 0; i < this._data.length; i++) {
            const element = this._data[i];
            if(this.isSame(key, element.key)) {
                this._data.splice(i, 1);
            }
        }
    }

    clear() {
        this._data.length = 0;
    }

    forEach(callback) {
        for (const item of this._data) {
            callback(item.value, item.key, this);
        }
    }

    //只读
    get size() {
        return this._data.length;
    }

    *[Symbol.iterator]() {
        for (const item of this._data) {
            yield [item.key, item.value];
        }
    }

    /**
     * 根据key查找对应的数组项
     * @param {*} key 
     */
    _getObj(key) {
        for (const item of this._data) {
            if (this.isSame(key, item.key)) {
                return item;
            }
        }
    }

    /**
     * 判断两个键是否相同
     * @param {*} key1 
     * @param {*} key2 
     */
    isSame(key1, key2) {
        if (key1 === 0 && key2 === 0) {
            return true;
        }
        return Object.is(key1, key2);
    }
}