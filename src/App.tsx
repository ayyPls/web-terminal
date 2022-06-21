import React from 'react';
import './App.css';
import { About } from './components/commandResults/About';
import { Color } from './components/commandResults/Color';
import { Help } from './components/commandResults/Help';
import { Projects } from './components/commandResults/Projects';
import { Social } from './components/commandResults/Social';
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
  const [cmd, bgColor, textColor] = command.split(' ').filter(str => str !== '')

  if (command.startsWith('color')) {
    switch (bgColor) {
      case 'yellow': {
        document.documentElement.style.setProperty('--terminal-bg', ColorScheme.yellow);
        document.documentElement.style.setProperty('--link-color', ColorScheme.yellow);
        document.documentElement.style.setProperty('--link-bg-color', ColorScheme.primaryLight);
        break;
      }
      case 'blue': {
        document.documentElement.style.setProperty('--terminal-bg', ColorScheme.lightBlue);
        document.documentElement.style.setProperty('--link-color', ColorScheme.lightBlue);
        document.documentElement.style.setProperty('--link-bg-color', ColorScheme.primaryLight);
        break;
      }
      default: {
        document.documentElement.style.setProperty('--terminal-bg', ColorScheme.primaryDark);
        document.documentElement.style.setProperty('--link-color', ColorScheme.lightBlue);
        document.documentElement.style.setProperty('--link-bg-color', ColorScheme.primaryDark);
      }
    }
    if (bgColor) command = 'color color_scheme'
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
    case 'welcome': return [...state, { element: <Welcome />, command: action.payload }]
    case 'social': return [...state, { element: <Social />, command: action.payload }]
    case 'color color_scheme': if (bgColor == 'yellow' || bgColor == 'blue') {
      return [...state, { element: <><br />color scheme set to {bgColor}</>, command: action.payload }]
    } else return [...state, { element: <><br />no color scheme named "{bgColor}"</>, command: action.payload }]
    default:
      return [...state, { element: <UnknownCommand command={action.payload} />, command: action.payload }]
  }
}

const App: React.FC = () => {
  const [history, historyDispatch] = React.useReducer(historyReducer, initialHistoryState)
  const [commandLine, setCommandLine] = React.useState('')

  const pushToTerminalHistory = (command: string) => {
    historyDispatch({ type: command, payload: command })
    setCommandLine('')
  }

  //TODO: animation on page loading and on enter command line

  const handleInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /* 
      TODO: show previous commands on arrow key up and down 
    */
    if (e.key.startsWith('Arrow')) e.preventDefault() //prevent caret movement
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()

      e.stopPropagation()
    }
    else
      if (e.key === 'Enter') {
        e.preventDefault();
        pushToTerminalHistory(e.currentTarget.value);
        e.currentTarget.value = '';
      }
  }

  React.useEffect(() => {
    const textarea = document.getElementById('textarea')
    //TODO: event on click. prevent doubleclick event
    if (textarea) {
      document.onclick = () => { textarea.focus({ preventScroll: true }); }
    }
  }, [])

  return (
    <div id='terminal'>
      <TerminalHistory history={history} />
      <TerminalInput line={commandLine} />
      <textarea id='textarea' onChange={(e) => setCommandLine(e.target.value)} onKeyDown={handleInput} autoFocus></textarea>
    </div>
  );
}
export default App;
