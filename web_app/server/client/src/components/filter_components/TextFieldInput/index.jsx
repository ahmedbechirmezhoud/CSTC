import './style.css'

function TextFieldInput(props){
    return (
        <div className='inputField'>
            <div className='iconContainer'>
            <img alt='Search Icon' className='searchIcon' src='img/search.svg' width="18" height="18"/>
            </div>
            <input 
                value={props.value} 
                onChange={(e)=>{
                    props.onChange(e.target.value)
                }} 
                placeholder='Search' 
                className='inputBox'
            />
        </div>
    );
}

export default TextFieldInput;