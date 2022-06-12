import { TerminalPrefix } from "./TerminalPrefix"

export const TerminalLine: React.FC<{ commandLine: string, output: JSX.Element }> = ({ commandLine, output }) => {
    return <div className="terminal-line">{TerminalPrefix}{commandLine}{output}</div>
}