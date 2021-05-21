import {Profiler, memo, useMemo, useCallback, useState} from 'react';

if (!localStorage.getItem('typeIndex')) {
    localStorage.setItem('typeIndex', '0');
}

const Text = ({callback, state}) => {
    return (
        <div onClick={callback}>{state?.value ?? 'root'}</div>
    )
}

const ComponentE = ({nestingLvl, state, callback}) => {
    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentE
                        nestingLvl={nestingLvl - 1}
                        state={state}
                        callback={callback}
                    />
                    <ComponentE
                        nestingLvl={nestingLvl - 1}
                        state={state}
                        callback={callback}
                    />
                </>
            )}
        </>
    )
};
const ComponentM = memo(({nestingLvl, state, callback}) => {
    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentM
                        nestingLvl={nestingLvl - 1}
                        state={state}
                        callback={callback}
                    />
                    <ComponentM
                        nestingLvl={nestingLvl - 1}
                        state={state}
                        callback={callback}
                    />
                </>
            )}
        </>
    )
});
ComponentM.name = 'ComponentM';


const types = [
    ComponentE,
    ComponentM,
]

const calculate = callback => (id, phase, actualDuration) => {
    if (phase === 'mount') {
        setTimeout(callback, 10);

        return;
    }

    const typeIndex = +localStorage.getItem('typeIndex');
    const name = `${phase}-${id}`;

    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, '[]');
    }

    const data = JSON.parse(localStorage.getItem(name));

    data.push(Math.round(actualDuration));

    localStorage.setItem(name, JSON.stringify(data));

    console.log(typeIndex, name, data.length);

    if (data.length < 100) {
        setTimeout(callback, 10);

    } else if (typeIndex < 7) {
        localStorage.setItem('typeIndex', String(typeIndex + 1));

        setTimeout(callback, 10);
    }
};

const increment = state => ({value: state.value + 1});

function Generator() {
    const typeIndex = +localStorage.getItem('typeIndex');
    const Component = types[typeIndex % 2];
    const [outerState, setOuterState] = useState({value: 0});
    const everyCallback = () => () => console.log('I`m inner');
    const memoCallback = useCallback(everyCallback, []);
    const someData = {
        value: 0
    }
    const someMemoData = useMemo(() => ({
        value: 0
    }), []);

    const data = Math.floor(typeIndex / 2) % 2 ? someData : someMemoData;
    const callback = Math.floor(typeIndex / 4) % 2 ? everyCallback : memoCallback;

    const profilerCallback = useCallback((...args) => calculate(() => setOuterState(increment))(...args), []);

    if (typeIndex === 8) return <div>Finished</div>;

    return (
        <>
            <div>typeIndex: {typeIndex}</div>
            <div>outerState: {outerState.value}</div>
            <div>Hello I'm test of update with and without memo/callback</div>
            <Profiler
                id={`${Component.name}${(Math.floor(typeIndex / 2) % 2) ? "E" : "M"}${(Math.floor(typeIndex / 4) % 2) ? "E" : "M"}`}
                onRender={profilerCallback}
            >
                <Component
                    nestingLvl={10}
                    state={data}
                    callback={callback}
                />
            </Profiler>
        </>
    );
}

export default Generator;
