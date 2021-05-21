import {
    VictoryChart,
    VictoryLine,
    VictoryAxis, VictoryZoomContainer,
} from 'victory';
import {Fragment, useMemo, useReducer} from 'react';

import './visualize.css';

import json from '../data/real2.json';
import {reducer, action, allChecked} from "./visualizeUtils";

const zoomDomain = {y: [0, 60]};

const getColor = (index) => ['rgb(245,205,70)', 'rgb(25,70,230)'][index];

const Visualize = () => {
    const [lineChecks, dispatchLine] = useReducer(reducer(json), {
    });
    const [axisChecks, dispatchAxis] = useReducer(reducer(json), {
    });

    const checkedLines = useMemo(() => json
            .filter(({name}) => lineChecks[name] ?? true)
        , [lineChecks]);

    const averages = useMemo(() => json
            .filter(({name}) => axisChecks[name] ?? true)
        , [axisChecks]);

    return (
        <>
            <div className="form-simple">
                <input
                    type='checkbox' checked={allChecked(lineChecks) && allChecked(axisChecks)}
                    onChange={event => {
                        dispatchAxis(action()(event));
                        dispatchLine(action()(event));
                    }}
                />
                <input
                    type='checkbox' checked={allChecked(lineChecks)}
                    onChange={event => dispatchLine(action()(event))}
                />
                <span>Name</span>
                <label>
                    <input
                        type='checkbox' checked={allChecked(axisChecks)}
                        onChange={event => dispatchAxis(action()(event))}
                    />
                    Axis
                </label>
                {json.map(({name, index, average}) => {
                    return (
                        <Fragment key={index}>
                            <input
                                type='checkbox' checked={(lineChecks[name] && axisChecks[name]) ?? true}
                                onChange={event => {
                                    dispatchAxis(action(name)(event));
                                    dispatchLine(action(name)(event));
                                }}
                            />
                            <input
                                type='checkbox' checked={lineChecks[name] ?? true}
                                onChange={event => dispatchLine(action(name)(event))}
                            />
                            <span style={{color: getColor(index, json.length)}}>{name}</span>
                            <label>
                                <input
                                    type='checkbox' checked={axisChecks[name] ?? true}
                                    onChange={event => dispatchAxis(action(name)(event))}
                                />
                                {average}
                            </label>
                        </Fragment>
                    )
                })}
            </div>
            <div className="clear"/>
            <h1>реальные примеры</h1>
            <div className="chart">
                <VictoryChart
                    height={800}
                    width={1000}
                    containerComponent={
                        <VictoryZoomContainer
                            zoomDimension="y"
                            zoomDomain={zoomDomain}
                        />
                    }
                >
                    <VictoryAxis
                        dependentAxis
                        crossAxis
                        label="Time (ms)"
                        style={{axisLabel: {padding: 35}}}
                        tickValues={[...zoomDomain.y, ...averages.map(({average}) => average)]}
                        tickFormat={undefined}
                    />
                    {checkedLines.map(({name, data, index}) => {
                        return (
                            <VictoryLine
                                key={name}
                                data={data} interpolation="natural"
                                style={{data: {stroke: getColor(index, json.length)}}}
                            />
                        )
                    })}
                    {averages
                        .map(({average, index}) => {
                            return (
                                <VictoryAxis
                                    key={index}
                                    style={{
                                        tickLabels: {fill: "none"},
                                        axis: {stroke: getColor(index, json.length), strokeWidth: 5}
                                    }}
                                    axisValue={average}
                                />
                            );
                        })}

                </VictoryChart>
            </div>
        </>
    )
}

export default Visualize;