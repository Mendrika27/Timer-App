import './clock.css';
import React, { useEffect, useState } from "react";

const hour = new Date();

export default function Clock() {
  const [Time, setTime] = useState({
    hours: hour.getHours(),
    minutes: hour.getMinutes(),
    seconds: hour.getSeconds()
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const hour = new Date();
      setTime({
        hours: hour.getHours(),
        minutes: hour.getMinutes(),
        seconds: hour.getSeconds()
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="clock">
      <div>
        {Time.hours}:{Time.minutes}:{Time.seconds}
      </div>
    </div>

);
}


export function Mode(){
  const [Page,setPage]=useState(<Clock/>);
  const [status, setStatus]=useState(false);
  function clicked(evt){
    evt.preventDefault();
    if(status==false){
      setStatus(true)
      setPage(<CountDown/>)
      console.log(status);
    }
    if(!status == false){
      setStatus(false)
      setPage(<Clock/>)
      console.log(status);
    }
  }
  return (<>
    {Page}
    <button className="mode button-primary" onclick={clicked}>Another mode</button>
    </>
  )
}
function Input(){
  let take={
    seconds(e){
      e.preventDefault()
      this.seconds=e.target.value;
    },
    minutes(e){
      e.preventDefault()
      this.minutes=e.target.value;
    },
    hours(e){
      e.preventDefault()
      hour=e.target.value;
    }
  }
    return(
      <div className="data">
    <input placeholder="00" maxLength={2} onInput={take.hours}></input>:
    <input placeholder="00" maxLength={2} onInput={take.minutes}></input>:
    <input placeholder="00" maxLength={2} onInput={take.seconds}></input>
    </div>
    )
}
export function CountDown(){
    const [data, setData] = useState(<Input/>)
    const timer={
      start(e){
        e.preventDefault()
          setData(<Decrementer/>)
      },
      reset(){
        setData(<Input/>)
      }
    }
  return(
    <>
    {data}
    <div>
      <button  className='button' onClick={timer.start}>START</button>
      <button  className='button' onClick={timer.reset}>RESET</button>
    </div>
    </>
  );
}

function Decrementer(){
  let [hour, setHour]=useState(hour);
  let[minute,setMinute]=useState(minute);
  let[second,setSeconde]=useState(second);
  let test;

  useEffect( ()=>{test=setInterval=() =>{
    setSeconde(second-1)
    if(second<1){
      if(minute!=0){
        setMinute(minute-1)
      }
      setSeconde(59)
    }

    if(minute<0){
      if(hour!==0){
        setHour(hour-1)
        setMinute(59)
        setSeconde(59)
      }
      if(second===0 && minute ===0 && hour==0){
        setHour(0)
        setMinute(0)
        setSeconde(0)
      }
    }
    
  }
},1000);
}
function Stop(){
  clearInterval(test);
  return(
    <>
      <span>{hour.toString().padStart(2, "0")}</span>:
      <span>{minute.toString().padStart(2, "0")}</span>:
      <span>{seconds.toString().padStart(2, "0")}</span>
      <div>
        <button  className='stop' onClick={Stop}>STOP</button>
      </div>
    </>
  )
}
