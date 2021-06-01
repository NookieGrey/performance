// node src/generators/generatorUtils.js --experimental-modules


Promise.resolve({
  "mormal": "[28.7,25,23.4,17.1,13.1,14.1,14.2,13.8,11.1,12.9,13,13.9,13.6,13,13.4,13,12.6,12.9,13.1,14.4,12.4,13.3,12.6,12.6,12.6,12.6,14,12.7,12.7,12.7,12.6,12.6,10.6,13.5,13.6,14,13,12.7,13.5,13.2,13.1,11.9,13.2,13.4,12.8,12.6,13.3,12.6,12.8,12.9,14.3,12.8,13,12.8,13.4,13.5,13.6,13.3,11.7,12.8,11.2,14.6,12.7,13.5,12.6,12.7,12.4,11.5,13.3,12.8,12.6,12.9,12,12.6,11,12.6,11.3,11.3,13.3,12.5,12,12.4,12.8,12.9,12.8,13.2,13.7,12.5,12.6,12.5,12.6,12.6,12.8,12.7,12.6,12.7,13.7,13.1,13.1,13.1]",
  "memoized": "[13.6,12.9,11.5,13.7,14.4,12.8,9,7.9,8.2,8.1,7.6,8,7.6,8.5,7.6,8.2,6.6,7.3,7.7,7.6,7.4,7.5,7.6,8,7.3,7.3,7.4,7.5,7.3,7.2,7.1,7.3,7.4,7.5,7.4,7.5,7.3,6.9,7.4,7.4,7.3,6.4,7.2,7.3,7.3,5.8,7.4,7.5,5.5,5.1,7,7.5,7.4,7.4,7.3,7.4,7.4,7.3,6.3,7.4,7.4,7.5,7.4,7.5,6.9,7.4,7.4,7.4,7.4,7.4,7.4,7.6,7.3,7.5,7.4,7.4,7,7.5,7.4,6.9,5.4,7.4,7.5,7.5,7.4,7,7.5,7.5,7,7.3,7.6,7.1,7.3,7.4,7.5,7.3,5.1,7.4,7.5,5.8]"
})
  .then(convertLocalStorageObj)
  // .then(removeOutliers)
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
    average: Math.round(arithmeticMean(item.data))
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