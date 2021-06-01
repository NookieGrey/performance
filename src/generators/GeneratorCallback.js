import {Profiler, memo, useCallback, useState} from 'react';

if (!localStorage.getItem('typeIndex')) {
  localStorage.setItem('typeIndex', '0');
}

const repeater = "1".repeat(300).split("");

const ComponentE = ({callback}) => {
  return (
    <>
      <button onClick={callback}>Click Me</button>
      {repeater.map((one, index) => <div key={index}>Some Content</div>)}
    </>
  )
}

const WrapperE = () => {
  const [state1, setState1] = useState({});
  const callback1 = () => setState1({});

  const [state2, setState2] = useState({});
  const callback2 = () => setState2({});

  return (
    <>
      <ComponentE callback={callback1}/>
      <ComponentE callback={callback2}/>

      {repeater.map((one, index) => <div key={index}>{state1.toString()}</div>)}
      {repeater.map((one, index) => <div key={index}>{state2.toString()}</div>)}
    </>
  )
}

const ComponentM = memo(({callback}) => {
    return (
      <>
        <button onClick={callback}>Click Me</button>
        {repeater.map((one, index) => <div key={index}>Some Content</div>)}
      </>
    )
  }
)

const WrapperM = () => {
  const [state1, setState1] = useState({});
  const callback1 = useCallback(() => setState1({}), []);

  const [state2, setState2] = useState({});
  const callback2 = useCallback(() => setState2({}), []);

  return (
    <>
       <ComponentM callback={callback1}/>
       <ComponentM callback={callback2}/>

      {repeater.map((one, index) => <div key={index}>{state1.toString()}</div>)}
      {repeater.map((one, index) => <div key={index}>{state2.toString()}</div>)}
    </>
  )
}

const types = [
  WrapperE,
  WrapperM,
]

const calculate = (id, phase, actualDuration) => {
  const typeIndex = +localStorage.getItem('typeIndex');
  const name = `${phase}-${id}`;

  if (!localStorage.getItem(name)) {
    localStorage.setItem(name, '[]')
  }

  const data = JSON.parse(localStorage.getItem(name));

  data.push(Math.round(actualDuration * 10) / 10);

  localStorage.setItem(name, JSON.stringify(data));

  console.log(typeIndex, data.length);

  if (data.length < 100) {
    setTimeout(() => {
      document.getElementsByTagName('button')[0].click();
    }, 50);

  } else if (typeIndex < types.length) {
    localStorage.setItem('typeIndex', String(typeIndex + 1));

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
};

function Generator() {
  const typeIndex = +localStorage.getItem('typeIndex');
  const Component = types[typeIndex];

  if (typeIndex === types.length) return <div>Finished</div>;

  return (
    <>
      <div>Hello I'm test of mount with and without memo/callback</div>
        <Profiler
          id={Component.name}
          onRender={calculate}
        >
          <Component/>
        </Profiler>
    </>
  );
}

export default Generator;
