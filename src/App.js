import {Profiler, useState, memo, useMemo, useCallback} from 'react';

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

const calculate = (id, phase, actualDuration) => {
    console.log(id, phase, actualDuration);
    // map[id].data.push(actualDuration);
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
        Component: MemoLiner,
        description: 'duplex',
        status: 'memo',
    },
];

function Static() {
    // const [nestingLvl, setNestingLvl] = useState({value: 0});
    const [innerState, setInnerState] = useState({value: 0});
    const [outerState, setOuterState] = useState({value: 0});


    const everyNewObject = {
        value: 0
    };

    const memoNewObject = useMemo(() => ({
            value: 0
        }
    ), []);


    const everyCallback = () => setInnerState(increment);
    const memoCallback = useCallback(() => setInnerState(increment), []);

    return (
        <>
            <Profiler id="static" onRender={calculate}>
                <div>OuterState: {outerState.value}</div>
                <div>InnerState: {innerState.value}</div>
                <button onClick={() => setOuterState(increment)}>change outer state</button>

                <Profiler id="static-every-liner-every-data-every-callback" onRender={calculate}>
                    <Liner state={everyNewObject} callback={everyCallback}/>
                </Profiler>

                <Profiler id="static-memo-liner-every-data-every-callback" onRender={calculate}>
                    <MemoLiner state={everyNewObject} callback={everyCallback}/>
                </Profiler>

                <Profiler id="static-every-duplex-every-data-every-callback" onRender={calculate}>
                    <Duplex nestingLvl={0} state={everyNewObject} callback={everyCallback}/>
                </Profiler>

                <Profiler id="static-memo-duplex-every-data-every-callback" onRender={calculate}>
                    <MemoDuplex nestingLvl={0} state={everyNewObject} callback={everyCallback}/>
                </Profiler>

                <Profiler id="static-every-liner-memo-data-every-callback" onRender={calculate}>
                    <Liner state={memoNewObject} callback={everyCallback}/>
                </Profiler>

                <Profiler id="static-memo-liner-memo-data-every-callback" onRender={calculate}>
                    <MemoLiner state={memoNewObject} callback={everyCallback}/>
                </Profiler>

                <Profiler id="static-every-duplex-memo-data-every-callback" onRender={calculate}>
                    <Duplex nestingLvl={0} state={memoNewObject} callback={everyCallback}/>
                </Profiler>

                <Profiler id="static-memo-duplex-memo-data-every-callback" onRender={calculate}>
                    <MemoDuplex nestingLvl={0} state={memoNewObject} callback={everyCallback}/>
                </Profiler>

                <Profiler id="static-every-liner-every-data-memo-callback" onRender={calculate}>
                    <Liner state={everyNewObject} callback={memoCallback}/>
                </Profiler>

                <Profiler id="static-memo-liner-every-data-memo-callback" onRender={calculate}>
                    <MemoLiner state={everyNewObject} callback={memoCallback}/>
                </Profiler>

                <Profiler id="static-every-duplex-every-data-memo-callback" onRender={calculate}>
                    <Duplex nestingLvl={0} state={everyNewObject} callback={memoCallback}/>
                </Profiler>

                <Profiler id="static-memo-duplex-every-data-memo-callback" onRender={calculate}>
                    <MemoDuplex nestingLvl={0} state={everyNewObject} callback={memoCallback}/>
                </Profiler>

                <Profiler id="static-every-liner-memo-data-memo-callback" onRender={calculate}>
                    <Liner state={memoNewObject} callback={memoCallback}/>
                </Profiler>

                <Profiler id="static-memo-liner-memo-data-memo-callback" onRender={calculate}>
                    <MemoLiner state={memoNewObject} callback={memoCallback}/>
                </Profiler>

                <Profiler id="static-every-duplex-memo-data-memo-callback" onRender={calculate}>
                    <Duplex nestingLvl={0} state={memoNewObject} callback={memoCallback}/>
                </Profiler>

                <Profiler id="static-memo-duplex-memo-data-memo-callback" onRender={calculate}>
                    <MemoDuplex nestingLvl={0} state={memoNewObject} callback={memoCallback}/>
                </Profiler>

            </Profiler>
        </>
    );
}

function Dynamic() {
    // const [nestingLvl, setNestingLvl] = useState({value: 0});
    const [innerState, setInnerState] = useState({value: 0});
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
            data: everyNewObject,
            status: 'every'
        },
        {
            data: memoNewObject,
            status: 'memo'
        },
    ]

    const everyCallback = () => setInnerState(increment);
    const memoCallback = useCallback(() => setInnerState(increment), []);

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

    return (
        <>
            <Profiler id="dynamic" onRender={calculate}>
                <div>OuterState: {outerState.value}</div>
                <div>InnerState: {innerState.value}</div>
                <button onClick={() => setOuterState(increment)}>change outer state</button>

                {callbacks
                    .map(({status: callbackStatus, callback}) => data
                        .map(({status: dataStatus, data}) => components
                            .map(({Component, description, status}) => {

                                const id = `dynamic-${status}-${description}-${dataStatus}-data-${callbackStatus}-callback`;

                                return (
                                    <Profiler
                                        key={id}
                                        id={id}
                                        onRender={calculate}
                                    >
                                        <Component

                                            nestingLvl={0}
                                            state={data}
                                            callback={callback}
                                        />
                                    </Profiler>
                                )
                            })))}

            </Profiler>
        </>
    );
}

const App = () => (
    <>
        <Dynamic/>
        <Static/>
    </>
)

export default App;
