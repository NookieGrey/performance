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


const types = [
    ComponentEEE,
    ComponentMEE,
    ComponentEME,
    ComponentMME,
    ComponentEEM,
    ComponentMEM,
    ComponentEMM,
    ComponentMMM,
]

const calculate = (id, phase, actualDuration) => {
    const typeIndex = +localStorage.getItem('typeIndex');
    const name = `${phase}-${id}`;

    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, '[]')
    }

    const data = JSON.parse(localStorage.getItem(name));

    data.push(Math.round(actualDuration));

    localStorage.setItem(name, JSON.stringify(data));

    console.log(typeIndex, data.length);

    if (data.length < 100) {
        // setTimeout(() => setOuterState(increment), 10);

        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => location.reload(), 50);
    } else if (typeIndex < 7) {
        localStorage.setItem('typeIndex', String(typeIndex + 1));

        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => location.reload(), 50);
    }
};

function Generator() {
    const typeIndex = +localStorage.getItem('typeIndex');
    const Component = types[typeIndex];

    if (typeIndex === 8) return <div>Finished</div>;

    return (
        <>
            <div>Hello I'm test of mount with and without memo/callback</div>
            <Profiler
                id={Component.name}
                onRender={calculate}
            >
                <Component
                    nestingLvl={10}
                />
            </Profiler>
        </>
    );
}

export default Generator;
