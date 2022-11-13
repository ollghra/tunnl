import "./Separator.sass"

export const Separator = (props: {title: string}) => {
    return <div className="separator">
        <span className="expander-line l"></span>
        <button onClick={() => { }}>{props.title}</button>
        <span className="expander-line r"></span>
    </div>

}