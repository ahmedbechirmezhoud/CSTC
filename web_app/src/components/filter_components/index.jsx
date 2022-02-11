import './style.css'
import FilterButton from "./FilterButton";
import FilterOptionSelect from "./FilterOptionSelect";
import TextFieldInput from "./TextFieldInput";

export default function FilterZone(){
    return (
        <div className="filterZone">
            <TextFieldInput />
            <FilterOptionSelect />
            <FilterButton />
        </div>
    );
}

export { FilterButton, FilterOptionSelect, TextFieldInput};
