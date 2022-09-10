import React, { useEffect } from 'react'
import "./paragraph.css"
import randomWords from "random-words"
import Result from './Result'
import "./Timer.css"
import "./input.css"

export default function Paragraph() {
    const [isbool, setIsbool] = React.useState(0)
    const [text, setText] = React.useState([])
    const [IText, setIText] = React.useState("");
    const [index, setIndex] = React.useState(0);
    const [cindex, setCindex] = React.useState(-1);
    const [count, setCount] = React.useState(0);
    const [tcount, setTcount] = React.useState(0);
    const [time, setTime] = React.useState(60);
    const [display, setDisplay] = React.useState(true);
    const [ckey, setCkey] = React.useState("")


    useEffect(() => {
        setText(generate());
    }, [isbool])

    function generate() {
        return new Array(200).fill(null).map(() => randomWords());
    }

    function handleChange() {
        setIndex(0)
        setCount(0)
        setTcount(0)
        let interval = setInterval(() => (
            setTime((prevTime) => {
                if (prevTime === 0) {
                    setDisplay(false)
                    clearInterval(interval)
                    setIText("");
                    setCkey("")
                    setCindex(-1)
                    setTime(60)
                    setIsbool(isbool + 1)
                }
                else
                    return prevTime - 1
            })
        ), 1000)
        setDisplay(true)
    }


    function textChange(e) {
        setIText(e.target.value);
    }

    function keyChange(e) {

        if (e.key === " ") {
            checkMatch();
            setIText("");
            setCindex(-1);
            setIndex((prev) => (prev + 1))
        }
        else if (e.keyCode === 8) {
            setCindex(cindex - 1)
            setCkey("")
        }
        else {
            setCindex(cindex + 1);
            setCkey(e.key);
        }
    }

    function checkMatch() {
        if (text[index] === IText.trim()) {
            setCount((prev) => (prev + 1))
            setTcount((prev) => (prev + 1))
        }
        else {
            setTcount((prev) => (prev + 1))
        }

    }

    function getChar(wordIdx, charIdx, char) {
        if (wordIdx === index && charIdx === cindex && ckey && display) {
            if (char === ckey)
                return "green"
            // else if (wordIdx === index && cindex >= text[index].length)
            //     return "red"
            else
                return "red"
        }
        else
            return ""
    }

    const Para = () => {
        return (
            <>
                <div className="para">
                    <div className="paraWrapper">
                        <span className="seconds">
                            {time}
                        </span>
                        <div className="content">
                            {text.map((words, i) => (
                                <>
                                    <span key={i} >
                                        {words.split("").map((char, id) => (
                                            <span key={id} className={getChar(i, id, char)}>
                                                {char}
                                            </span>
                                        ))}
                                        <span> </span>
                                    </span>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (

        <>
            {display ? <Para /> : <Result correctWords={count} accuracy={tcount} />}
            {/* <Input arr={text} /> */}
            <div className="type">
                <div className="typeWrapper">
                    <input type="text" className='typeInput' value={IText} onChange={textChange} onKeyDown={keyChange} />
                </div>
            </div>
            <div className='timer'>
                <div className="timerWrapper">
                    <button className="start" onClick={handleChange}>
                        Start
                    </button>
                </div>
            </div>
        </>
    )
}
