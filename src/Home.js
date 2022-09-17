import {useMemo, useState} from "react";

export const Home = () => {
  const [dep, setDep] = useState(1);

  setTimeout(() => {
    setDep(2)
  }, 2000)

  if (dep === 2) {
    debugger;
  }

  const data = useMemo(() => {
    console.count('call useMemo');
    return [1, 2, 3, dep]
  }, [dep])

  return (
    <div>
      {data.map(number => <div>{number}</div>)}
    </div>
  )
}