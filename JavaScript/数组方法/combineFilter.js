function combineFilter(config) {
    return function(data) {
        for(var prop in config) {
            // text(data, text) 即filterArrByText(data, text)
            data = config[prop](data, store.getState(prop));
            // console.log(data);
        }
        return data;
    }
}

var lastFilterArr = combineFilter({
    text: filterArrByText,
    sex: filterArrBySex,
    age: filterArrByAge
});