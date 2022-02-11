import './style.css';
import MembersDisplay from '../../components/MembersDisplay/';
import FilterZone from '../../components/filter_components/';
function HomeScreen(){
    return (
        <div>
            <div>
                Members list
            </div>
            <FilterZone />

            <MembersDisplay/>
        </div>
    );
}

export default HomeScreen;