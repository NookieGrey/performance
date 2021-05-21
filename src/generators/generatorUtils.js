// node src/genertors/generatorUtils.js --experimental-modules


Promise.resolve({
  "normal": "[1,14,2]",
  "patched": "[2,11,3]",
})
  .then(convertLocalStorageObj)
  .then(addAverage)
  .then(sort)
  .then(convert)
  .then(JSON.stringify)
  .then(console.log.bind(console));

function removeOutliers(json) {
  return json.map(item => {
    let q1, q3, iqr, maxValue, minValue;

    let values = item.data.slice().sort((dataItem1, dataItem2) => dataItem1.y - dataItem2.y);

    if ((values.length / 4) % 1 === 0) {//find quartiles
      q1 = 1 / 2 * (values[(values.length / 4)].y + values[(values.length / 4) + 1].y);
      q3 = 1 / 2 * (values[(values.length * (3 / 4))].y + values[(values.length * (3 / 4)) + 1].y);
    } else {
      q1 = values[Math.floor(values.length / 4 + 1)].y;
      q3 = values[Math.ceil(values.length * (3 / 4) + 1)].y;
    }

    iqr = q3 - q1;
    maxValue = q3 + iqr * 1.5;
    minValue = q1 - iqr * 1.5;

    const data = item.data.filter((dataItem) => (dataItem.y >= minValue) && (dataItem.y <= maxValue)).map((dataItem, x) => ({
      ...dataItem,
      x,
    }));

    return {
      ...item,
      data,
    }
  })
}

function convertLocalStorageObj(obj) {
  return Object.keys(obj).map(key => ({
    data: JSON.parse(obj[key]),
    name: key
  }))
}

function getDataFromLocalStorage() {
  delete localStorage.typeIndex;

  return Array(localStorage.length).fill(0).map((item, index) => ({
    data: JSON.parse(localStorage.getItem(localStorage.key(index))),
    name: localStorage.key(index)
  }))
}

function addAverage(json) {
  return json.map(item => ({
    ...item,
    average: Math.round(arithmeticMean(filterOutliers(item.data)))
  }));
}

function sort(arr) {
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

function convert(arr) {
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