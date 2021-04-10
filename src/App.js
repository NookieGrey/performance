import {Profiler, useState, memo, useMemo, useCallback} from 'react';

const Duplex = ({nestingLvl, state, callback, second}) => {
    if (nestingLvl === 0) {
        return (
            <div>nesting Lvl: {nestingLvl + +!!second}</div>
        )
    }

    return (
        <>
            <div>nesting Lvl: {nestingLvl}</div>
            <Duplex
                nestingLvl={nestingLvl - 1}
                state={state}
                callback={callback}
            />
            <Duplex
                nestingLvl={nestingLvl - 1}
                state={state}
                callback={callback}
                second
            />
        </>
    )
}

const MemoDuplex = memo(Duplex);


const calculate = (setVisible, setTypeIndex) => (id, phase, actualDuration) => {
    const name = `${phase}-${id}`;

    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, JSON.stringify([]));
    }

    const dataArray = JSON.parse(localStorage.getItem(name));
    dataArray.push(Math.round(actualDuration));

    localStorage.setItem(name, JSON.stringify(dataArray));

    if (dataArray.length < 100) {
        setVisible(false);
        setTimeout(() => setVisible(true), 50);
    } else {
        setTypeIndex(index => index + 1);
    }
};

const increment = state => ({value: state.value + 1});

const components = [
    {
        Component: Duplex,
        description: 'duplex',
        status: 'every'
    },
    {
        Component: MemoDuplex,
        description: 'duplex',
        status: 'memo',
    },
];

function Dynamic() {
    const [typeIndex, setTypeIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [outerState, setOuterState] = useState({value: 0});

    const everyNewObject = {
        value: 0
    };

    const memoNewObject = useMemo(() => ({
            value: 0
        }
    ), []);

    const data = [
        {
            state: everyNewObject,
            status: 'every'
        },
        {
            state: memoNewObject,
            status: 'memo'
        },
    ]

    const everyCallback = () => setOuterState(increment);
    const memoCallback = useCallback(() => setOuterState(increment), []);

    const callbacks = [
        {
            callback: everyCallback,
            status: 'every'
        },
        {
            callback: memoCallback,
            status: 'memo'
        },
    ]

    const {Component, description, status} = components[typeIndex % 2];
    const {status: dataStatus, state} = data[Math.floor(typeIndex / 2) % 2]
    const {status: callbackStatus, callback} = callbacks[Math.floor(typeIndex / 4) % 2];

    const id = `${status}-${description}-${dataStatus}-data-${callbackStatus}-callback`;

    if (typeIndex === 8) return;

    return (
        <>
            <div>OuterState: {outerState.value}</div>
            <button onClick={() => setOuterState(increment)}>change outer state</button>

            {visible && (
                <Profiler
                    key={id}
                    id={id}
                    onRender={calculate(setVisible, setTypeIndex)}
                >
                    <Component
                        nestingLvl={10}
                        state={state}
                        callback={callback}
                    />
                </Profiler>
            )}
        </>
    );
}

export default Dynamic;
