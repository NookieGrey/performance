import {Profiler, useState, memo, useMemo, useCallback} from 'react';

if (!localStorage.getItem('typeIndex')) {
    localStorage.setItem('typeIndex', '0');
}

const MAX_NESTING_LVL = 10;

const Duplex = props => {
    if (props.nestingLvl === MAX_NESTING_LVL - 1) {
        return (
            <div>nesting Lvl: {props.nestingLvl + +!!props.second}</div>
        )
    }

    return (
        <>
            <div>nesting Lvl: {props.nestingLvl}</div>
            <Duplex nestingLvl={props.nestingLvl + 1}/>
            <Duplex nestingLvl={props.nestingLvl + 1} second/>
        </>
    )
}

const Liner = () => (
    Array(Math.pow(2, MAX_NESTING_LVL)).fill(0).map((zero, index) => (
        <div key={index}>index: {index}</div>
    ))

)
const MemoDuplex = memo(Duplex);
const MemoLiner = memo(Liner);


const calculate = setOuterState => (id, phase, actualDuration) => {
    if (phase === 'mount') {
        setTimeout(() => setOuterState(increment), 10);

        return;
    }

    const name = `${phase}-${id}`;

    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, JSON.stringify([]));
    }

    const typeIndex = +localStorage.getItem('typeIndex');

    const dataArray = JSON.parse(localStorage.getItem(name));
    dataArray.push(Math.round(actualDuration));

    localStorage.setItem(name, JSON.stringify(dataArray));

    console.log(name, dataArray.length);

    if (dataArray.length < 100) {
        setTimeout(() => setOuterState(increment), 10);
    } else if (typeIndex < 15) {
        localStorage.setItem('typeIndex', String(typeIndex + 1))

        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }
};

const increment = state => ({value: state.value + 1});

const components = [
    {
        Component: Liner,
        description: 'liner',
        status: 'every'
    },
    {
        Component: MemoLiner,
        description: 'liner',
        status: 'memo',
    },
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
    const typeIndex = +localStorage.getItem('typeIndex');

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

    const {Component, description, status} = components[typeIndex % 4];
    const {status: dataStatus, state} = data[Math.floor(typeIndex / 4) % 2]
    const {status: callbackStatus, callback} = callbacks[Math.floor(typeIndex / 8) % 2];

    const id = `${status}-${description}-${dataStatus}-data-${callbackStatus}-callback`;

    return (
        <>
            <div>OuterState: {outerState.value}</div>
            <button onClick={() => setOuterState(increment)}>change outer state</button>

            <Profiler
                key={id}
                id={id}
                onRender={calculate(setOuterState)}
            >
                <Component

                    nestingLvl={0}
                    state={state}
                    callback={callback}
                />
            </Profiler>

        </>
    );
}

export default Dynamic;
