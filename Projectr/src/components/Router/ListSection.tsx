import PeopleList from "../PeopleList/PeopleList";
import SearchForm from "../SearchForm/SearchForm";

function ListSection() {
    return (
        <section>
            <SearchForm />
            <PeopleList />
        </section>
    );
}

export default ListSection;
