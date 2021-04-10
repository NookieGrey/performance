JSON.stringify(Array(localStorage.length).fill(0).map((item, index) => ({
    data: JSON.parse(localStorage.getItem(localStorage.key(index))),
    name: localStorage.key(index)
})))