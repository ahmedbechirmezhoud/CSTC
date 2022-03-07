import './style.css'
export default function Button(props){
    const validateAllSelected = ()=>{
        const set = new Set(users.map((user)=>{return user.paidFee}));
        if(set.size !== 1){
            alert("You can select only 1 type of users at a time! Either paid or not paid, not both.");
            return;
        }
        props.modalController({display: true, users:users, resetCheckbox:props.resetCheckbox })
    };

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
                onClick={validateAllSelected} 
                className={'btn ' + (props.clickable ? 'btnClickable clickable' : '')}
            >
                {props.text}
            </button>
        </div>
    );
}