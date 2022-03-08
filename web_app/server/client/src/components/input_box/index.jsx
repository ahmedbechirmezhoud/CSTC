import './style.css';

export default function InputBox(props){
    return (
        <>
            <div className='inputArea'>
                <b>{props.label}</b>
                <input type={props.type} className="loginInput" placeholder={props.hint} onChange={props.onChange} value={props.value} />
            </div>
        </>
    );
}