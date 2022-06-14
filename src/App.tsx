import React, { useRef } from 'react';
import './App.css';
import { About } from './components/commandResults/About';
import { Color } from './components/commandResults/Color';
import { Help } from './components/commandResults/Help';
import { Projects } from './components/commandResults/Projects';
import { UnknownCommand } from './components/commandResults/UnknownCommand';
import { Welcome } from './components/commandResults/Welcome';
import { TerminalHistory } from './components/TerminalHistory';
import { TerminalInput } from './components/TerminalInput';

enum ColorScheme {
  primaryDark = '#282c34',   // dark grey
  primaryLight = '#fff',    // white

  lightBlue = '#5690fa',
  darkBlue = '#00008B',
  yellow = '#f0ad1c',
  red = '#ff0000',
  purple = '#9370DB',
  indigo = '#4B0082',
  magenta = '#FF00FF',
  hotpink = '#FF69B4'

}

interface IHistoryElement {
  element: JSX.Element,
  command: string
}

export type IHistoryState = Array<IHistoryElement>
const initialHistoryState: IHistoryState = [{ element: <Welcome />, command: '' }]

export interface IAction {
  type: string,
  payload: string
}


const historyReducer = (state: IHistoryState, action: IAction): IHistoryState => {
  let command = action.payload.trim().toLowerCase() // trim command string so you can use whitespaces and get command result

  if (command.startsWith('color')) {
    const [cmd, bgColor, textColor] = command.split(' ').filter(str => str !== '')

    switch (bgColor) {
      case 'yellow': { document.documentElement.style.setProperty('--terminal-bg', ColorScheme.yellow); break; }
      case 'blue': { document.documentElement.style.setProperty('--terminal-bg', ColorScheme.lightBlue); document.documentElement.style.setProperty('--link-color', ColorScheme.primaryLight); document.documentElement.style.setProperty('--link-bg-color', ColorScheme.darkBlue);break; }
      default: { document.documentElement.style.setProperty('--terminal-bg', ColorScheme.primaryDark); document.documentElement.style.setProperty('--link-color', ColorScheme.lightBlue);}
    }

  }

  switch (command) {
    case '': return [...state, { element: <></>, command: action.payload }] //TODO: empty strings should not be saved in history. on arrow up and down filter array. do not include empty strings
    case 'about':
      return [...state, { element: <About />, command: action.payload }]
    case 'help':
      return [...state, { element: <Help />, command: action.payload }]
    case 'projects':
      return [...state, { element: <Projects />, command: action.payload }]
    case 'clear': return []
    case 'color': return [...state, { element: <Color />, command: action.payload }]
    default:
      return [...state, { element: <UnknownCommand command={action.payload} />, command: action.payload }]
  }
}

const App: React.FC = () => {


  const [history, historyDispatch] = React.useReducer(historyReducer, initialHistoryState)
  const [commandLine, setCommandLine] = React.useState('')

  const handleChange = (e: any) => { //TODO: types   
    setCommandLine(e.target.value)
  }

  const pushToTerminalHistory = (command: string) => {
    historyDispatch({ type: command, payload: command })
    setCommandLine('')
  }

  //TODO: animation on page loading and on enter command line

  const handleInput = (e: KeyboardEvent) => {
    /* 
      TODO: show previous commands on arrow key up and down 
    */
    if (e.key.startsWith('Arrow')) e.preventDefault() //prevent caret movement
    // TODO: types
    // TODO: scroll to bottom after command enter
    // @ts-ignore
    else if (e.key === 'Enter') { e.preventDefault(); pushToTerminalHistory(e.target.value); e.target.value = ''; }
  }

  React.useEffect(() => {
    const textarea = document.getElementById('textarea')
    if (textarea) {
      document.onclick = () => { textarea.focus({ preventScroll: true }); }
      textarea.onkeydown = handleInput
    }
  }, [])

  return (
    <div id='terminal'>
      <TerminalHistory history={history} />
      <TerminalInput line={commandLine} />
      <textarea id='textarea' onChange={handleChange} autoFocus></textarea>
    </div>
  );
}
export default App;
