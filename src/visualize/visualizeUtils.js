export const reducer = json => (state, {type, value}) => {
    if (type === 'all') {
        if (value) {
            return {}
        } else {
            const result = {};
            json.map(({name}) => result[name] = false);
            return result;
        }
    }

    return {
        ...state,
        [type]: value
    }
}

export function action(name) {
    return function (event) {
        return {
            type: name ?? 'all',
            value: event.target.checked,
        }
    }
}

export const getColor = (index, total) => `hsl(${180 / total * (total - 1 - index - 0.5)}, 75%, 50%)`;

export const allChecked = state => Object.keys(state).filter(key => !state[key]).length === 0;

export const MemoLabels = ({name, index, total}) => {
    const booleans = {
        'E': '- - -',
        'M': 'true'
    }

    return name.slice(-3).split('').map((char, key) => <span key={key} style={{color: getColor(index, total)}}>{booleans[char]}</span>)
}