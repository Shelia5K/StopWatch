import { useEffect, useState } from 'react'
import { Observable, Subject } from 'rxjs';
import { buffer, map, filter, debounceTime } from 'rxjs/operators'
import CalcTime from './CalcTime'
function App() {

  const [time, setTime] = useState(0);
  const [status, setStatus] = useState('stop')

  const doubleClick$ = new Subject()

  const start = () => { setStatus('start'); }

  const stop = () => { setTime(0); setStatus('stop'); }

  const reset = () => { setTime(0); setStatus('start'); }

  const wait = () => {
    doubleClick$.next()
    setStatus('wait')
  };

  useEffect(() => {
    if (status === 'start') {
    //если происходит двойное нажатие на кнопку 
      doubleClick$.pipe(
      buffer(doubleClick$.pipe(debounceTime(300))),
      map(item => item.length),
      filter(value => value >= 2),
    )

    const timer$ = new Observable((observer) => {
      const intervalId = setInterval(() => {
        observer.next()
      }, 1000)
      return () => { clearInterval(intervalId) }
    })

    const subscribtion$ = timer$.subscribe({
      next: () => { setTime((prev) => prev + 1)}
    })

    return (() => { subscribtion$.unsubscribe() })
  }
  if (status === 'reset') { setStatus('start') }
  }, [status])

  return (
    <div className="main">
      <div className="container">
      <h1>Timer</h1>
      <h1><CalcTime time={time}></CalcTime></h1>
      <button type="button" className="btn" onClick={start}>Start</button>
      <button type="button" className="btn tab" onClick={stop}>Stop</button>
      <button type="button" className="btn tab" onClick={reset}>Reset</button>
      <button type="button" className="btn tab" onClick={wait}>Wait</button>
      </div>
    </div>
  )
}

export default App;
