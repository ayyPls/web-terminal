import React from "react";
import { ITerminalHistory } from "../App";
import { About } from "./commandResults/About";
import { UnknownCommand } from "./commandResults/UnknownCommand";
import { TerminalLine } from "./TerminalLine";

export const TerminalHistory: React.FC<{ history: ITerminalHistory }> = ({ history }) => {

    const getElementByCommandName = (command: string, key: number): JSX.Element => {  //TODO: redo into hook 
        let result = <></>
        switch (command) {
            case 'about':
                result = <About key={key} />
                break;
            default:
                result = <UnknownCommand command={command} />
        }
        return <TerminalLine commandLine={command} output={result} key={key} />
    }

    return <>
        {
            history.map((command, index) => { return getElementByCommandName(command, index) })
        }
    </>
}