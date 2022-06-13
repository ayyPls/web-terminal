
export const Projects = () => {
    return <div className="terminal-list">
        {/* TODO: responsive border from chars (mysql cmd)*/}
        <li>
            <div>web terminal app - you are already here, good job!</div>
            <div className="project-description">
                <div>link: <a href="#" target="_blank">link</a></div>
                <div>git: <a href="https://github.com/ayyPls/web-terminal" target="_blank">https://github.com/ayyPls/web-terminal</a></div>
            </div>
        </li>
        
        <li>
            <div>emojify! - simple script to add emoji to your text</div>
            <div className="project-description">
                <div>link: <a href="https://add-emoji.herokuapp.com" target="_blank">https://add-emoji.herokuapp.com</a></div>
                <div>git: <a href="https://github.com/ayyPls/emojify" target="_blank">https://github.com/ayyPls/emojify</a></div>
            </div>
        </li>
    </div>
}