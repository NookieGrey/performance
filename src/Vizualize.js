import {VictoryChart, VictoryLine, VictoryTooltip, VictoryVoronoiContainer, VictoryAxis} from 'victory';
import {useMemo, useState, useReducer} from 'react';

import './virtualize.css';

import json from './data.json';

const DEFAULT_PHASE = '1';
const DEFAULT_COMPONENT = '2';

function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.value
    }
}

const Visualize = () => {
    const [phase, setPhase] = useState(DEFAULT_PHASE);
    const [component, setComponent] = useState(DEFAULT_COMPONENT);
    const [checks, dispatchChecks] = useReducer(reducer, {});

    const filtered = useMemo(() => json
            .filter(({name}) => {
                if (phase === '1' && !name.includes("mount")) return false;
                if (phase === '2' && !name.includes("update")) return false;
                if (component === '1' && !name.includes("liner")) return false;
                if (component === '2' && !name.includes("duplex")) return false;

                return true;
            })
            .sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            })

        , [component, phase]);

    const checked = useMemo(() => filtered
            .filter(({name}) => checks[name] ?? true)
        , [checks, filtered]);

    const lines = useMemo(() => checked
            .map(({data, name}) => ({
                data: data.map((value, index) => ({x: index, y: +value, label: name})),
                name,
            }))
        , [checked])

    return (
        <div className='wrapper'>
            <div className="chart">
                <VictoryChart
                    height={400}
                    containerComponent={
                        <VictoryVoronoiContainer/>
                    }
                >
                    <VictoryAxis
                        dependentAxis
                        domain={[0, 140]}
                        label="Time (ms)"
                        tickValues={[0, 20, 60, 100, 140]}

                    />
                    {lines.map(({name, data}) => {
                        return (
                            <VictoryLine
                                key={name}
                                interpolation='bundle'
                                data={data}
                                style={{data: {stroke: "#c43a31"}}}
                                labelComponent={<VictoryTooltip/>}
                            />
                        )
                    })}

                </VictoryChart>
            </div>
            <div className="form">
                <label>
                    <div>Phase:</div>
                    <select onChange={event => setPhase(event.target.value)} defaultValue={DEFAULT_PHASE}>
                        <option value="3">All</option>
                        <option value="1">Mount</option>
                        <option value="2">Update</option>
                    </select>
                </label>
                <label>
                    <div>Component:</div>
                    <select onChange={event => setComponent(event.target.value)} defaultValue={DEFAULT_COMPONENT}>
                        <option value="3">All</option>
                        <option value="1">Liner</option>
                        <option value="2">Duplex</option>
                    </select>
                </label>
                {filtered.map(({name}) => {
                    return (
                        <div key={name}>
                            <label>
                                <input type='checkbox' checked={checks[name] ?? true}
                                       onChange={event => dispatchChecks({
                                           type: name,
                                           value: event.target.checked,
                                       })}/>
                                {name}
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Visualize;