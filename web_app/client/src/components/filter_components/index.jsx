import './style.css'
import FilterOptionSelect from "./FilterOptionSelect";
import TextFieldInput from "./TextFieldInput";

export default function FilterZone(props){
    const searchOptions = [{name: "Search option", value: -1}, {name: "Name", value: 0}, {name: "Email", value:1}];
    return (
        <div className="filterZone">
            <TextFieldInput 
                value={props.query} 
                onChange={props.onChangeQuery}
            />
            <FilterOptionSelect 
                options={searchOptions} 
                option={props.option} 
                onChange={props.onChangeOption}
            />
        </div>
    );
}

export { FilterOptionSelect, TextFieldInput};
