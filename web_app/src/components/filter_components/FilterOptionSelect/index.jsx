import './style.css';

export default function FilterOptionSelect(props){
    return (
        <select 
            className="filterOption clickable" 
            value={props.option} 
            onChange={(e)=>{
                props.onChange(e.target.value);
            }} 
        >
            {
                props.options.map((option)=>{
                    return (
                        <option key={option.value} value={option.value}>{option.name}</option>
                    );
                })
            }
        </select>
    );
}