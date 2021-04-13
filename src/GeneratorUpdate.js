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
ComponentM.name = 'ComponentMEE';


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

    if (data.length < 500) {
        setTimeout(callback, 10);

        // eslint-disable-next-line no-restricted-globals
        // setTimeout(() => location.reload(), 50);
    } else if (typeIndex < 7) {
        localStorage.setItem('typeIndex', String(typeIndex + 1));

        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => location.reload(), 50);
    }
};

const increment = state => ({value: state.value + 1});

function Generator() {
    const typeIndex = +localStorage.getItem('typeIndex');
    const Component = types[typeIndex % 2];
    const [outerState, setOuterState] = useState({value: 0});
    const everyCallback = () => setOuterState(increment)
    const memoCallback = useCallback(everyCallback, []);
    const someData = {
        value: 0
    }
    const someMemoData = useMemo(() => ({
        value: 0
    }), []);

    const data = Math.floor(typeIndex / 2) % 2 ? someData : someMemoData;
    const callback = Math.floor(typeIndex / 4) % 2 ? everyCallback : memoCallback;


    if (typeIndex === 8) return <div>Finished</div>;

    return (
        <>
            <div>typeIndex: {typeIndex}</div>
            <div>outerState: {outerState}</div>
            <div>Hello I'm test of update with and without memo/callback</div>
            <Profiler
                id={Component.name}
                onRender={calculate(callback)}
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
