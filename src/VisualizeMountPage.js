import {
    VictoryChart,
    VictoryLine,
    VictoryAxis,
    VictoryZoomContainer,
} from 'victory';
import {Fragment, useMemo, useReducer} from 'react';

import './virtualize.css';

import json from './mount.json';
import {reducer, action, getColor, allChecked, MemoLabels} from "./visualizeUtils";

const zoomDomain = {y: [135, 160]};

const Visualize = () => {
    const [lineChecks, dispatchLine] = useReducer(reducer(json), {});
    const [axisChecks, dispatchAxis] = useReducer(reducer(json), {});

    const checkedLines = useMemo(() => json
            .filter(({name}) => lineChecks[name] ?? true)
        , [lineChecks]);

    const averages = useMemo(() => json
            .filter(({name}) => axisChecks[name] ?? true)
        , [axisChecks]);

    return (
        <>
            <div className="form">
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
                <span>memo</span>
                <span>useMemo</span>
                <span>useCallback</span>
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
                            <MemoLabels
                                name={name}
                                index={index}
                                total={json.length}
                            />
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
            <h1>Стоимость мемоизации 10-15%</h1>
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