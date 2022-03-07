import './style.css'
export default function Button(props){
    let users = [];
    let i = 0;
    while(props.users[i]){
        if(props.checkedUsers[i]){
            users.push(props.users[i]);
        }
        i++;
    }
    return (
        <div>
            <button 
                onClick={()=>{
                    props.modalController({display: true, users:users, resetCheckbox:props.resetCheckbox })
                }} 
                className={'btn ' + (props.clickable ? 'btnClickable clickable' : '')}
            >
                {props.text}
            </button>
        </div>
    );
}