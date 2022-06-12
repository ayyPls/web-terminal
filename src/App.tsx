import React from 'react';
import './App.css';
import { Welcome } from './components/commandResults/Welcome';
import { TerminalHistory } from './components/TerminalHistory';
import { TerminalInput } from './components/TerminalInput';


export type ITerminalHistory = Array<string>

const App: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = React.useState<ITerminalHistory>([])

  const [commandLine, setCommandLine] = React.useState('')

  const handleChange = (e: any) => { //TODO: types   
    setCommandLine(e.target.value)
  }

  const pushToTerminalHistory = (command: string) => {   
    let temp = terminalHistory
    temp.push(command)
    setTerminalHistory(temp)
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
    else if (e.key === 'Enter') { e.preventDefault(); pushToTerminalHistory(e.target.value); e.target.value = '' }

  }

  React.useEffect(() => {   
    const textarea = document.getElementById('textarea')
    if (textarea) {
      document.onclick = () => textarea.focus();
      textarea.onkeydown = handleInput
    }
  }, [])

  return (
    <div id='terminal' >
      <Welcome />
      <TerminalHistory history={terminalHistory} />
      <TerminalInput line={commandLine} />
      <textarea id='textarea' onChange={handleChange} autoFocus></textarea>
    </div>
  );
}
export default App;
