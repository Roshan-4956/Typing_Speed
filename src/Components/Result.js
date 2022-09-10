import React from 'react'
import "./result.css"
export default function Result(props) {
  return (
    <div className="result">
        <div className="resultWrapper">
            <div className="box">
                <h3 className='heading'>Words per minute</h3>
              <span className="noWords">{props.correctWords}</span>
            </div>
            <div className="box">
                <h3 className='heading'>Accuracy</h3>
              <span className="accuracy">{props.correctWords*100/props.accuracy}</span>
            </div>
        </div>
    </div>
  )
}
