import { About } from "../components/commandResults/About";
import { UnknownCommand } from "../components/commandResults/UnknownCommand";


/* 
    hook to return command result
*/
/*
    command list: 
        clear 
        tree -> ascii tree art
        credits
        color foo var -> change bg and text color
        git -> link to github

*/
export function useTerminalCommand(command: string) {
    switch (command) {
        case 'about': return About;
        default: return UnknownCommand
    }
}