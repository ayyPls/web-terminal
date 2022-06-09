import React from 'react';
import './App.css';


const WelcomeMessage = () => {
  return <>
    {/* Microsoft Windows [Version 11]<br /> */}
    {/* TODO: fixed header? */}
    (c) Web Terminal Corporation (Not a real corporation). All human rights reserved.<br /><br />
    {/* TODO: bottom margin instead of br tags */}

  </>
}

//TODO: hidden textarea out of render view + focus this etxtarea on lcick and render typeing result on screen

/* 
  TODO: 
    clear
    tree -> ascii tree art
    credits
    color foo var -> change bg and text color
*/

const TerminalString: React.FC<{ text: string }> = ({ text }) => {
  return <div className='terminal-string'>
    C:\Users\Guest\Desktop\web-terminal{`>`}
    <div>{text.trim()}</div><span id='cursor'></span>

  </div>
}

function App() {
  return (
    <>
      <WelcomeMessage />
      <TerminalString text={'text'} />
    </>
  );
}

export default App;
