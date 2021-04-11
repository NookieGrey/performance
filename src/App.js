import {Profiler, useState, memo, useMemo} from 'react';

const Duplex = ({nestingLvl, state1, state2, state3, state4, state5, second}) => {
    const newData1 = useMemo(() => ({
        text: 'text 1'
    }), []);
    const newData2 = useMemo(() => ({
        text: 'text 2'
    }), []);
    const newData3 = useMemo(() => ({
        text: 'text 3'
    }), []);
    const newData4 = useMemo(() => ({
        text: 'text 4'
    }), []);
    const newData5 = useMemo(() => ({
        text: 'text 5'
    }), []);

    if (nestingLvl === 0) {
        return (
            <div>{state1.text} {state2.text} {state3.text} {state4.text} {state5.text} : {nestingLvl + +!!second}</div>
        )
    }

    return (
        <>
            <div>{state1.text} {state2.text} {state3.text} {state4.text} {state5.text}: {nestingLvl}</div>
            <Duplex
                nestingLvl={nestingLvl - 1}
                state1={newData1}
                state2={newData2}
                state3={newData3}
                state4={newData4}
                state5={newData5}
            />
            <Duplex
                nestingLvl={nestingLvl - 1}
                state1={newData1}
                state2={newData2}
                state3={newData3}
                state4={newData4}
                state5={newData5}
                second
            />
        </>
    )
}

const MemoDuplex = memo(Duplex);

if (!localStorage.getItem('typeIndex')) {
    localStorage.setItem('typeIndex', '0');
}

const calculate = (id, phase, actualDuration) => {
    // if (phase === 'mount') {
    //     setTimeout(() => setOuterState(increment), 10);
    //
    //     return;
    // }

    const typeIndex = +localStorage.getItem('typeIndex');
    const name = `${phase}-${id}`;

    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, JSON.stringify([]));
    }

    const dataArray = JSON.parse(localStorage.getItem(name));
    dataArray.push(Math.round(actualDuration));

    localStorage.setItem(name, JSON.stringify(dataArray));

    if (dataArray.length < 300) {
        // setTimeout(() => setOuterState(increment), 10);

        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => location.reload(), 50);
    } else if (typeIndex < 7) {
        localStorage.setItem('typeIndex', String(typeIndex + 1));

        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => location.reload(), 50);
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
    const typeIndex = +localStorage.getItem('typeIndex');
    const [outerState, setOuterState] = useState({value: 0});

    // const everyNewObject = {
    //     value: 0
    // };
    //
    // const memoNewObject = useMemo(() => ({
    //         value: 0
    //     }
    // ), []);

    // const data = [
    //     {
    //         state: everyNewObject,
    //         status: 'every'
    //     },
    //     {
    //         state: memoNewObject,
    //         status: 'memo'
    //     },
    // ]
    //
    // const everyCallback = () => setOuterState(increment);
    // const memoCallback = useCallback(() => setOuterState(increment), []);

    // const callbacks = [
    //     {
    //         callback: everyCallback,
    //         status: 'every'
    //     },
    //     {
    //         callback: memoCallback,
    //         status: 'memo'
    //     },
    // ]

    const {Component, description, status} = components[typeIndex % 2];
    // const {status: dataStatus, state} = data[Math.floor(typeIndex / 2) % 2]
    // const {status: callbackStatus, callback} = callbacks[Math.floor(typeIndex / 4) % 2];

    // const id = `${status}-${description}-${dataStatus}-data-${callbackStatus}-callback`;
    const id = `${status}-${description}-memo-data`;

    const newData1 = useMemo(() => ({
        text: 'text 1'
    }), []);
    const newData2 = useMemo(() => ({
        text: 'text 2'
    }), []);
    const newData3 = useMemo(() => ({
        text: 'text 3'
    }), []);
    const newData4 = useMemo(() => ({
        text: 'text 4'
    }), []);
    const newData5 = useMemo(() => ({
        text: 'text 5'
    }), []);

    if (typeIndex === 2) return null;

    return (
        <>
            <div>OuterState: {outerState.value}</div>
            <button onClick={() => setOuterState(increment)}>change outer state</button>
            <Profiler
                key={id}
                id={id}
                onRender={calculate}
            >
                <Component
                    nestingLvl={10}
                    state1={newData1}
                    state2={newData2}
                    state3={newData3}
                    state4={newData4}
                    state5={newData5}
                />
            </Profiler>
        </>
    );
}

export default Dynamic;
