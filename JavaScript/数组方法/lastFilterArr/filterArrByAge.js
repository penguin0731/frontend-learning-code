function filterArrByAge(data, age) {
    var newData = [];
    if(!age.low || !age.high) {
        return data;
    }else{
        data.filter(function(elem) {
            if(elem.age >= age.low && elem.age <= age.high) {
                newData.push(elem);
            }
        });
        return newData;
    }
}