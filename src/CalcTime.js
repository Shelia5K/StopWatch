import React from 'react';

export default function Timer({ time }){
    const calculatedTime = {
        seconds: (time % 60),
        minutes: Math.floor(time / 60),
        hours: Math.floor(time / 3600),
    }
    const timeToShow = {}
    for(let key in calculatedTime){
        if(calculatedTime[key] < 1){
            timeToShow[key] = '00';
        }
        else if(calculatedTime[key] < 10){
            timeToShow[key] = `0${calculatedTime[key]}`
        }
        else{
            timeToShow[key] = `${calculatedTime[key]}`;
        }
    }

  return(
    <div>
        {timeToShow.hours}:{timeToShow.minutes}:{timeToShow.seconds}
    </div>)
  ;
}
