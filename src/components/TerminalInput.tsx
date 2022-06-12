import React from "react"
import { TerminalPrefix } from "./TerminalPrefix"

const TerminalCaret = <span id='caret' />


export const TerminalInput: React.FC<{ line: string }> = ({ line }) => {
    //TODO: function to find closest command keyword
    return <div className='terminal-line'>
        <p>{TerminalPrefix}{line}{TerminalCaret}</p>
    </div>
}