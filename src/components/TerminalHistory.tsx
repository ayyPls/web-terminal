import React, { useEffect } from "react";
import { IHistoryState } from "../App";
import { TerminalLine } from "./TerminalLine";

export const TerminalHistory: React.FC<{ history: IHistoryState }> = ({ history }) => {

    useEffect(() => {
        window.scrollTo({ left: 0, top: 100000, behavior: 'smooth' }) //scroll to the bottom of page
    }, [history])

    return <div>
        {
            history.map((element, index) => { return <TerminalLine commandLine={element.command} output={element.element} key={index} /> })
        }
    </div>
}