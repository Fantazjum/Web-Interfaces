import Person from "../../../models/Person";

type Action =
    | { type: 'modify', filterName: string, filterValue: string | string[] }
    | { type: 'reset' };

interface AppData {
    searchFilters?: Person;
    actionDispatch?: React.ActionDispatch<[Action]>;
    addPerson?: (person: Person) => void;
    matches?: Person[];
};

export default AppData;
