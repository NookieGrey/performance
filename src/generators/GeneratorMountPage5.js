import {Profiler, memo, useMemo, useCallback} from 'react';

if (!localStorage.getItem('typeIndex')) {
    localStorage.setItem('typeIndex', '0');
}

const Text = ({state1, state2, state3, state4, state5, callback1, callback2, callback3, callback4, callback5}) => {
    return (
        <>
            <div onClick={callback1}>{state1?.value ?? 'root'}</div>
            <div onClick={callback2}>{state2?.value ?? 'root'}</div>
            <div onClick={callback3}>{state3?.value ?? 'root'}</div>
            <div onClick={callback4}>{state4?.value ?? 'root'}</div>
            <div onClick={callback5}>{state5?.value ?? 'root'}</div>
        </>
    )
}

const ComponentEEE = ({
                          nestingLvl,
                          state1,
                          state2,
                          state3,
                          state4,
                          state5,
                          callback1,
                          callback2,
                          callback3,
                          callback4,
                          callback5
                      }) => {
    const innerState1 = {
        value: 0
    };
    const innerState2 = {
        value: 0
    };
    const innerState3 = {
        value: 0
    };
    const innerState4 = {
        value: 0
    };
    const innerState5 = {
        value: 0
    };
    const innerCallback1 = () => console.log('I`m inner')
    const innerCallback2 = () => console.log('I`m inner')
    const innerCallback3 = () => console.log('I`m inner')
    const innerCallback4 = () => console.log('I`m inner')
    const innerCallback5 = () => console.log('I`m inner')
    return (
        <>
            <Text
                state1={state1}
                state2={state2}
                state3={state3}
                state4={state4}
                state5={state5}
                callback1={callback1}
                callback2={callback2}
                callback3={callback3}
                callback4={callback4}
                callback5={callback5}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentEEE
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                    <ComponentEEE
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                </>
            )}
        </>
    )
};
const ComponentMEE = memo(({
                               nestingLvl,
                               state1,
                               state2,
                               state3,
                               state4,
                               state5,
                               callback1,
                               callback2,
                               callback3,
                               callback4,
                               callback5
                           }) => {
    const innerState1 = {
        value: 0
    };
    const innerState2 = {
        value: 0
    };
    const innerState3 = {
        value: 0
    };
    const innerState4 = {
        value: 0
    };
    const innerState5 = {
        value: 0
    };
    const innerCallback1 = () => console.log('I`m inner')
    const innerCallback2 = () => console.log('I`m inner')
    const innerCallback3 = () => console.log('I`m inner')
    const innerCallback4 = () => console.log('I`m inner')
    const innerCallback5 = () => console.log('I`m inner')
    return (
        <>
            <Text
                state1={state1}
                state2={state2}
                state3={state3}
                state4={state4}
                state5={state5}
                callback1={callback1}
                callback2={callback2}
                callback3={callback3}
                callback4={callback4}
                callback5={callback5}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentMEE
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                    <ComponentMEE
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                </>
            )}
        </>
    )
});
ComponentMEE.name = 'ComponentMEE';

const ComponentEME = ({
                          nestingLvl,
                          state1,
                          state2,
                          state3,
                          state4,
                          state5,
                          callback1,
                          callback2,
                          callback3,
                          callback4,
                          callback5
                      }) => {
    const innerState1 = useMemo(() => ({
        value: 0
    }), []);
    const innerState2 = useMemo(() => ({
        value: 0
    }), []);
    const innerState3 = useMemo(() => ({
        value: 0
    }), []);
    const innerState4 = useMemo(() => ({
        value: 0
    }), []);
    const innerState5 = useMemo(() => ({
        value: 0
    }), []);

    const innerCallback1 = () => console.log('I`m inner')
    const innerCallback2 = () => console.log('I`m inner')
    const innerCallback3 = () => console.log('I`m inner')
    const innerCallback4 = () => console.log('I`m inner')
    const innerCallback5 = () => console.log('I`m inner')
    return (
        <>
            <Text
                state1={state1}
                state2={state2}
                state3={state3}
                state4={state4}
                state5={state5}
                callback1={callback1}
                callback2={callback2}
                callback3={callback3}
                callback4={callback4}
                callback5={callback5}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentEME
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                    <ComponentEME
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                </>
            )}
        </>
    )
};
const ComponentMME = memo(({
                               nestingLvl,
                               state1,
                               state2,
                               state3,
                               state4,
                               state5,
                               callback1,
                               callback2,
                               callback3,
                               callback4,
                               callback5
                           }) => {
    const innerState1 = useMemo(() => ({
        value: 0
    }), []);
    const innerState2 = useMemo(() => ({
        value: 0
    }), []);
    const innerState3 = useMemo(() => ({
        value: 0
    }), []);
    const innerState4 = useMemo(() => ({
        value: 0
    }), []);
    const innerState5 = useMemo(() => ({
        value: 0
    }), []);

    const innerCallback1 = () => console.log('I`m inner')
    const innerCallback2 = () => console.log('I`m inner')
    const innerCallback3 = () => console.log('I`m inner')
    const innerCallback4 = () => console.log('I`m inner')
    const innerCallback5 = () => console.log('I`m inner')
    return (
        <>
            <Text
                state1={state1}
                state2={state2}
                state3={state3}
                state4={state4}
                state5={state5}
                callback1={callback1}
                callback2={callback2}
                callback3={callback3}
                callback4={callback4}
                callback5={callback5}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentMME
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                    <ComponentMME
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                </>
            )}
        </>
    )
});
ComponentMME.name = 'ComponentMME';

const ComponentEEM = ({
                          nestingLvl,
                          state1,
                          state2,
                          state3,
                          state4,
                          state5,
                          callback1,
                          callback2,
                          callback3,
                          callback4,
                          callback5
                      }) => {
    const innerState1 = {
        value: 0
    };
    const innerState2 = {
        value: 0
    };
    const innerState3 = {
        value: 0
    };
    const innerState4 = {
        value: 0
    };
    const innerState5 = {
        value: 0
    };
    const innerCallback1 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback2 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback3 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback4 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback5 = useCallback(() => console.log('I`m inner'), []);

    return (
        <>
            <Text
                state1={state1}
                state2={state2}
                state3={state3}
                state4={state4}
                state5={state5}
                callback1={callback1}
                callback2={callback2}
                callback3={callback3}
                callback4={callback4}
                callback5={callback5}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentEEM
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                    <ComponentEEM
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                </>
            )}
        </>
    )
};
const ComponentMEM = memo(({
                               nestingLvl,
                               state1,
                               state2,
                               state3,
                               state4,
                               state5,
                               callback1,
                               callback2,
                               callback3,
                               callback4,
                               callback5
                           }) => {
    const innerState1 = {
        value: 0
    };
    const innerState2 = {
        value: 0
    };
    const innerState3 = {
        value: 0
    };
    const innerState4 = {
        value: 0
    };
    const innerState5 = {
        value: 0
    };
    const innerCallback1 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback2 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback3 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback4 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback5 = useCallback(() => console.log('I`m inner'), []);

    return (
        <>
            <Text
                state1={state1}
                state2={state2}
                state3={state3}
                state4={state4}
                state5={state5}
                callback1={callback1}
                callback2={callback2}
                callback3={callback3}
                callback4={callback4}
                callback5={callback5}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentMEM
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                    <ComponentMEM
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                </>
            )}
        </>
    )
});
ComponentMEM.name = 'ComponentMEM';

const ComponentEMM = ({
                          nestingLvl,
                          state1,
                          state2,
                          state3,
                          state4,
                          state5,
                          callback1,
                          callback2,
                          callback3,
                          callback4,
                          callback5
                      }) => {
    const innerState1 = useMemo(() => ({
        value: 0
    }), []);
    const innerState2 = useMemo(() => ({
        value: 0
    }), []);
    const innerState3 = useMemo(() => ({
        value: 0
    }), []);
    const innerState4 = useMemo(() => ({
        value: 0
    }), []);
    const innerState5 = useMemo(() => ({
        value: 0
    }), []);

    const innerCallback1 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback2 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback3 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback4 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback5 = useCallback(() => console.log('I`m inner'), []);

    return (
        <>
            <Text
                state1={state1}
                state2={state2}
                state3={state3}
                state4={state4}
                state5={state5}
                callback1={callback1}
                callback2={callback2}
                callback3={callback3}
                callback4={callback4}
                callback5={callback5}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentEMM
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                    <ComponentEMM
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                </>
            )}
        </>
    )
};
const ComponentMMM = memo(({
                               nestingLvl,
                               state1,
                               state2,
                               state3,
                               state4,
                               state5,
                               callback1,
                               callback2,
                               callback3,
                               callback4,
                               callback5
                           }) => {
    const innerState1 = useMemo(() => ({
        value: 0
    }), []);
    const innerState2 = useMemo(() => ({
        value: 0
    }), []);
    const innerState3 = useMemo(() => ({
        value: 0
    }), []);
    const innerState4 = useMemo(() => ({
        value: 0
    }), []);
    const innerState5 = useMemo(() => ({
        value: 0
    }), []);

    const innerCallback1 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback2 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback3 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback4 = useCallback(() => console.log('I`m inner'), []);
    const innerCallback5 = useCallback(() => console.log('I`m inner'), []);

    return (
        <>
            <Text
                state1={state1}
                state2={state2}
                state3={state3}
                state4={state4}
                state5={state5}
                callback1={callback1}
                callback2={callback2}
                callback3={callback3}
                callback4={callback4}
                callback5={callback5}
            />
            {nestingLvl > 0 && (
                <>
                    <ComponentMMM
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
                    />
                    <ComponentMMM
                        nestingLvl={nestingLvl - 1}
                        state1={innerState1}
                        state2={innerState2}
                        state3={innerState3}
                        state4={innerState4}
                        state5={innerState5}
                        callback1={innerCallback1}
                        callback2={innerCallback2}
                        callback3={innerCallback3}
                        callback4={innerCallback4}
                        callback5={innerCallback5}
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
