/**
 * 交换数组中指定的位置
 * @param {*} arr 数组
 * @param {*} i1 下标1
 * @param {*} i2 下标2
 */
function swap(arr, i1, i2) {
    var temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
}

/**
 * 选择排序
 * @param {*} arr 
 */
function selectionSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        //解决[i, arr.length-1]区间
        // 从该区间找到最小值，与第i位换
        var min = arr[i]; //定义最小值
        var index = i; //定义最小值的下标
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < min) { //如果有值比最小值小
                min = arr[j]; //更新最小值
                index = j; //更新最小值的下标
            }
        }
        swap(arr, i, index); //把最小值和第i位交换
    }
}

/**
 * 冒泡排序
 * @param {*} arr 
 */
function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) { //每次循环之后，该区域的最大值一定在最后一位
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) { //若前一位比后一位大，则交换位置
                swap(arr, j, j + 1);
            }
        }
    }
}

/**
 * 插入排序
 * @param {*} arr 
 */
function insertionSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            var temp = arr[i];
            for (var j = i; j >= 0; j--) {
                if (j > 0 && temp < arr[j - 1]) {
                    arr[j] = arr[j - 1];
                } else {
                    arr[j] = temp;
                    break;
                }
            }
        }
    }
}

/**
 * 快速排序
 * @param {*} arr 
 */
function quickSort(arr) {
    /**
     * 对数组的某个区域进行一次快速排序
     * @param {*} arr 
     * @param {*} start 该区域的起始下标
     * @param {*} end 该区域的结束下标
     */
    function _quickSort(arr, start, end) {
        if (start >= end || start > arr.length - 1) return;
        var low = start, high = end;
        var key = arr[end]; //将最后一位作为基准数
        while(low < high) {
            while(low < high && arr[low] <= key) low++;
            arr[high] = arr[low];
            while(low < high && arr[high] >= key) high--;
            arr[low] = arr[high];
        }
        // 跳出来循环，此时low === high
        arr[low] = key;
        _quickSort(arr, start, low - 1);
        _quickSort(arr, low + 1, end);
    }
    _quickSort(arr, 0, arr.length - 1);
}

