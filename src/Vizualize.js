import {
    VictoryChart,
    VictoryLine,
    VictoryTooltip,
    VictoryVoronoiContainer,
    VictoryAxis,
    VictoryLabel,
    VictoryScatter
} from 'victory';
import {useMemo, useState, useReducer} from 'react';

import './virtualize.css';

import json from './data5.json';

const DEFAULT_PHASE = '1';

function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.value
    }
}

const Visualize = () => {
    const [phase, setPhase] = useState(DEFAULT_PHASE);
    const [checks, dispatchChecks] = useReducer(reducer, {});

    const filtered = useMemo(() => json
            .filter(({name}) => {
                if (phase === '1' && !name.includes("mount")) return false;
                if (phase === '2' && !name.includes("update")) return false;

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

        , [phase]);

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
                        domain={[100, 240]}
                        label="Time (ms)"
                        tickValues={[134, 152]}

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
                    {
                        [
                            {value: 134, text: 'Every New Object'},
                            {value: 152, text: 'Memo Object'},
                        ].map((d, i) => {
                            return (
                                <VictoryScatter
                                    data={[{x: 150, y: d.value}]}
                                    labels={d.text}
                                    size={1}
                                    labelComponent={
                                        <VictoryLabel
                                            dy={0}
                                            backgroundStyle={{fill: "#c43a31"}}
                                            style={[{fill: "#fff"}]}
                                        />
                                    }
                                />
                            );
                        })
                    }
                    {
                        [
                            {value: 134, text: 'Every New Object'},
                            {value: 152, text: 'Memo Object'},
                        ].map((d, i) => {
                            return (
                                <VictoryAxis
                                    key={i}
                                    style={{tickLabels: {fill: "none"}}}
                                    axisValue={d.value}
                                />
                            );
                        })
                    }

                </VictoryChart>
            </div>
            <div className="form">
                <div>
                    <label>
                        Phase:{' '}
                        <select onChange={event => setPhase(event.target.value)} defaultValue={DEFAULT_PHASE}>
                            <option value="3">All</option>
                            <option value="1">Mount</option>
                            <option value="2">Update</option>
                        </select>
                    </label>
                </div>
                <br/>
                <br/>
                <br/>
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