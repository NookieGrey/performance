// node src/generatorUtils.mjs --experimental-modules

Promise.resolve({
    "update-ComponentEME": "[75,58,61,60,60,60,61,62,61,60,61,60,61,60,59,61,59,60,59,60,60,61,60,59,60,61,61,60,59,61,59,61,60,61,60,60,60,60,61,60,60,61,61,60,60,97,61,61,61,61,60,61,62,60,59,61,60,61,65,63,61,60,61,62,61,60,61,60,62,62,63,61,60,61,61,61,60,60,60,60,59,61,61,61,62,62,60,61,62,62,62,61,61,61,97,62,62,62,61,60]",
    "update-ComponentMEM": "[74,60,61,98,62,60,61,63,62,62,63,60,61,62,61,60,63,61,60,61,61,62,61,65,62,60,61,60,61,62,64,61,62,62,61,61,61,62,62,60,62,60,62,62,62,61,62,60,60,62,63,62,60,61,62,60,62,59,62,61,61,61,61,71,65,62,62,59,61,62,62,61,61,61,61,61,62,62,61,62,61,62,61,61,61,61,61,61,61,63,65,61,61,60,59,62,61,62,61,60]",
    "update-ComponentEEE": "[75,58,60,62,61,61,61,61,62,61,62,62,60,58,62,62,60,59,59,60,62,62,61,97,60,61,61,62,62,64,60,60,60,60,61,61,60,62,61,62,62,62,61,59,61,61,60,63,62,62,60,61,62,61,61,62,62,60,60,60,60,61,64,61,61,61,62,60,61,60,61,97,59,61,62,61,59,61,62,60,60,61,60,61,61,62,61,60,61,63,61,60,61,61,59,61,61,62,60,61]",
    "update-ComponentEEM": "[82,60,62,61,63,61,59,59,60,59,59,61,60,60,97,60,59,60,61,61,61,61,59,60,59,60,60,61,62,59,60,61,61,58,59,58,59,62,61,60,60,61,61,60,60,61,62,61,60,61,59,59,61,61,59,60,61,59,59,58,59,59,99,61,61,60,61,60,61,60,61,63,63,61,61,61,60,60,60,60,61,60,61,61,60,61,58,59,60,60,60,60,60,61,60,59,59,60,61,62]",
    "update-ComponentMEE": "[75,60,62,62,61,61,63,62,61,62,100,62,61,63,62,63,62,61,63,62,62,62,62,62,62,61,61,62,65,64,61,61,61,63,63,60,62,63,63,61,63,60,61,62,63,62,62,61,60,62,62,63,67,66,63,62,62,62,62,98,62,62,61,62,63,62,62,61,62,61,61,62,61,61,63,62,62,62,64,63,61,62,62,62,63,62,63,61,62,61,63,64,65,63,63,60,62,61,61,62]",
    "update-ComponentMME": "[74,61,61,62,62,61,62,61,62,60,63,62,62,62,63,63,59,62,59,62,62,61,61,63,63,60,62,66,61,62,62,63,62,61,96,62,61,61,63,61,60,61,63,60,63,62,62,62,61,61,63,61,62,62,61,60,62,61,61,63,62,61,63,62,62,60,62,61,61,62,62,60,62,61,61,61,61,61,62,61,61,97,62,61,61,63,63,61,62,63,62,61,60,62,62,60,66,62,62,62]",
    "update-ComponentMMM": "[81,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]",
    "update-ComponentEMM": "[84,68,101,62,61,60,57,60,58,61,59,64,63,62,59,57,61,61,60,60,60,59,60,60,60,59,57,59,57,58,60,60,58,59,57,58,58,57,60,59,57,59,58,59,97,61,60,60,59,61,61,59,62,60,60,57,60,60,58,61,59,60,59,58,59,58,61,60,59,62,61,61,59,59,60,59,60,61,60,60,60,62,59,59,64,91,61,60,61,61,61,66,64,57,57,61,58,61,60,61]",
})
    .then(convertLocalStorageObj)
    .then(addAverage)
    .then(sort)
    .then(convert)
    .then(JSON.stringify)
    .then(console.log.bind(console));

export function convertLocalStorageObj(obj) {
    return Object.keys(obj).map(key => ({
        data: JSON.parse(obj[key]),
        name: key
    }))
}

export function getDataFromLocalStorage() {
    delete localStorage.typeIndex;

    return Array(localStorage.length).fill(0).map((item, index) => ({
        data: JSON.parse(localStorage.getItem(localStorage.key(index))),
        name: localStorage.key(index)
    }))
}

export function addAverage(json) {
    return json.map(item => ({
        ...item,
        average: Math.round(arithmeticMean(filterOutliers(item.data)))
    }));
}

export function sort(arr) {
    return arr
        .sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        })
}

export function convert(arr) {
    return arr.map((item, index) => ({
        ...item,
        data: item.data.map((value, index) => ({x: index, y: value})),
        index
    }))
}

function arithmeticMean(arr) {
    let sum = 0;

    arr.forEach(value => sum += (value / arr.length));

    return sum;
}

// https://gist.github.com/rmeissn/f5b42fb3e1386a46f60304a57b6d215a
function filterOutliers(someArray) {
    if (someArray.length < 4)
        return someArray;

    let values, q1, q3, iqr, maxValue, minValue;

    values = someArray.slice().sort((a, b) => a - b);//copy array fast and sort

    if ((values.length / 4) % 1 === 0) {//find quartiles
        q1 = 1 / 2 * (values[(values.length / 4)] + values[(values.length / 4) + 1]);
        q3 = 1 / 2 * (values[(values.length * (3 / 4))] + values[(values.length * (3 / 4)) + 1]);
    } else {
        q1 = values[Math.floor(values.length / 4 + 1)];
        q3 = values[Math.ceil(values.length * (3 / 4) + 1)];
    }

    iqr = q3 - q1;
    maxValue = q3 + iqr * 1.5;
    minValue = q1 - iqr * 1.5;

    return values.filter((x) => (x >= minValue) && (x <= maxValue));
}