import {Profiler, memo, useMemo, useCallback} from 'react';

if (!localStorage.getItem('typeIndex')) {
    localStorage.setItem('typeIndex', '0');
}

const Text = ({callback, state}) => {
    return (
        <div onClick={callback}>{state?.value ?? 'root'}</div>
    )
}

const ComponentEEE = ({nestingLvl, state, callback}) => {
    const innerState = {
        value: 0
    };

    const innerCallback = () => console.log('I`m inner')

    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentEEE
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                    <ComponentEEE
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                </>
            )}
        </>
    )
};
const ComponentMEE = memo(({nestingLvl, state, callback}) => {
    const innerState = {
        value: 0
    };

    const innerCallback = () => console.log('I`m inner')

    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentMEE
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                    <ComponentMEE
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                </>
            )}
        </>
    )
});
ComponentMEE.name = 'ComponentMEE';

const ComponentEME = ({nestingLvl, state, callback}) => {
    const innerState = useMemo(() => ({
        value: 0
    }), []);

    const innerCallback = () => console.log('I`m inner')

    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentEME
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                    <ComponentEME
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                </>
            )}
        </>
    )
};
const ComponentMME = memo(({nestingLvl, state, callback}) => {
    const innerState = useMemo(() => ({
        value: 0
    }), []);

    const innerCallback = () => console.log('I`m inner')

    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentMME
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                    <ComponentMME
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                </>
            )}
        </>
    )
});
ComponentMME.name = 'ComponentMME';

const ComponentEEM = ({nestingLvl, state, callback}) => {
    const innerState = {
        value: 0
    };

    const innerCallback = useCallback(() => console.log('I`m inner'), []);

    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentEEM
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                    <ComponentEEM
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                </>
            )}
        </>
    )
};
const ComponentMEM = memo(({nestingLvl, state, callback}) => {
    const innerState = {
        value: 0
    };

    const innerCallback = useCallback(() => console.log('I`m inner'), []);

    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentMEM
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                    <ComponentMEM
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                </>
            )}
        </>
    )
});
ComponentMEM.name = 'ComponentMEM';

const ComponentEMM = ({nestingLvl, state, callback}) => {
    const innerState = useMemo(() => ({
        value: 0
    }), []);

    const innerCallback = useCallback(() => console.log('I`m inner'), []);

    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentEMM
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                    <ComponentEMM
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                </>
            )}
        </>
    )
};
const ComponentMMM = memo(({nestingLvl, state, callback}) => {
    const innerState = useMemo(() => ({
        value: 0
    }), []);

    const innerCallback = useCallback(() => console.log('I`m inner'), []);

    return (
        <>
            <Text
                callback={callback}
                state={state}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentMMM
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                    <ComponentMMM
                        nestingLvl={nestingLvl - 1}
                        state={innerState}
                        callback={innerCallback}
                    />
                </>
            )}
        </>
    )
});
ComponentMMM.name = 'ComponentMMM';

const calculate = (id, phase, actualDuration) => {
    const name = id;

    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, '[]')
    }

    const data = JSON.parse(localStorage.getItem(name));

    data.push(Math.round(actualDuration));

    localStorage.setItem(name, JSON.stringify(data));

    console.log(data.length);

    if (data.length < 100 && (+id === 9)) {
        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => location.reload(), 50);
    }
};

function Generator() {
    return (
        <>
            <div>Hello I'm test of mount with and without memo/callback</div>
            {Array(10).fill(0).map((zero, index) => (
                <Profiler
                    id={String(index)}
                    onRender={calculate}
                >
                    <ComponentEEE
                        nestingLvl={10}
                    />
                </Profiler>
            ))}
        </>
    );
}

export default Generator;
