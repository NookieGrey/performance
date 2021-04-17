import {Profiler, useEffect, useState} from 'react';


const Child = () => {
    const [, setState] = useState();

    useEffect(() => {
        setInterval(() => setState({}), 100)
    }, [])

    console.count('Child');

    return (
        <div>
            Child
        </div>
    )
}

const Component = () => {
    console.count('Component');

    return (
        <div>
            <Child/>
        </div>
    )
}

const Test = () => {
    console.count('Test');

    return (
        <Profiler id="test" onRender={(id, phase, duration) => console.count('profiler')}>
            <Component/>
        </Profiler>
    )
}


export default Test;