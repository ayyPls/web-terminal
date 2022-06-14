import React from 'react';
import './App.css';
import { About } from './components/commandResults/About';
import { Help } from './components/commandResults/Help';
import { Projects } from './components/commandResults/Projects';
import { UnknownCommand } from './components/commandResults/UnknownCommand';
import { Welcome } from './components/commandResults/Welcome';
import { TerminalHistory } from './components/TerminalHistory';
import { TerminalInput } from './components/TerminalInput';

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
  const command = action.payload.trim() // trim command string so you can use whitespaces and get command result 
  switch (command) {
    case '': return [...state, { element: <></>, command: action.payload }] //TODO: empty strings should not be saved in history. on arrow up and down filter array. do not include empty strings
    case 'about':
      return [...state, { element: <About />, command: action.payload }]
    case 'help':
      return [...state, { element: <Help />, command: action.payload }]
    case 'projects':
      return [...state, { element: <Projects />, command: action.payload }]
    case 'clear': return []
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
      document.onclick = () => { textarea.focus({ preventScroll: true }) }
      textarea.onkeydown = handleInput
    }
  }, [])

  return (
    <div id='terminal' >
      <TerminalHistory history={history} />
      <TerminalInput line={commandLine} />
      <textarea id='textarea' onChange={handleChange} autoFocus></textarea>
    </div>
  );
}
export default App;
