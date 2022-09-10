// 查找一个数组中目标值是否存在

/**
 * 顺序查找
 * @param {*} arr 
 * @param {*} target 
 */
function inOrderSearch(arr, target) {
    for (var i = 0; i < arr.length; i++) {
        if (target === arr[i]) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * 二分查找
 * @param {*} arr 
 * @param {*} target 
 */
function binarySearch(arr, target) {
    var minIndex = 0; //最小下标
    var maxIndex = arr.length - 1; //最大下标
    if (arr.length === 0 || target < arr[minIndex] || target > arr[maxIndex]) return false;
    while (minIndex <= maxIndex) {
        var mid = Math.floor((maxIndex + minIndex) / 2); //中间下标
        if (arr[mid] === target) {
            return true;
        } else if (arr[mid] > target) {
            maxIndex = mid - 1;
        } else {
            minIndex = mid + 1;
        }
    }
    return false;
}

/**
 * 插值查找
 * @param {*} arr 
 * @param {*} target 
 */
function interpolationSearch(arr, target) {
    var minIndex = 0; //最小下标
    var maxIndex = arr.length - 1; //最大下标
    if (arr.length === 0 || target < arr[minIndex] || target > arr[maxIndex]) return false;
    while (minIndex <= maxIndex) {
        var mid = (target - arr[minIndex]) / (arr[maxIndex] - arr[minIndex]) * (maxIndex - minIndex) + minIndex; //中间下标
        if (arr[mid] === target) {
            return true;
        } else if (arr[mid] > target) {
            maxIndex = mid - 1;
        } else {
            minIndex = mid + 1;
        }
    }
    return false;
}