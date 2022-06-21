export const UnknownCommand: React.FC<{command: string}> = ({command}) => {
    return <div className="terminal-line">
        Unknown command "{command}". Type <span>help</span> to see the list of available commands
    </div>
}