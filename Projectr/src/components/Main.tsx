import { useCallback, useMemo, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router';

import Person from '../models/Person';
import ErrorSection from './Router/ErrorSection';
import AddPersonSection from './Router/AddPersonSection';
import ListSection from './Router/ListSection';
import AppData from './Router/AppData/AppData';
import { AppDataContext } from './Router/AppData/AppDataContext';

const emptyFilters: Person = {
	username: '',
	description: '',
	email: '',
	tags: [],
};

interface SearchFilters {
	username: string;
	description: string;
	email: string;
	tags: string[];
}

type FiltersActions =
	| { type: 'modify', filterName: string, filterValue: string | string[] }
	| { type: 'reset' };

const filtersDispatcher = (state: SearchFilters, action: FiltersActions) => {
	switch (action.type) {
		case 'modify':
			const newFilters: any = {
				...state,
			};
			newFilters[action.filterName] = action.filterValue;
			return newFilters as SearchFilters;
		case 'reset':
			return { ...emptyFilters };
		default:
			console.error('Something went wrong! Unknown Action!');
			return state;
	}
}

function Main() {
	const [searchFilters, dispatch] = useReducer(filtersDispatcher, emptyFilters);
	const [people, setPeople] = useState<Person[]>([]);
	const matches = useMemo<Person[]>(() => {
		return people.filter(person =>
		(person.username.toLowerCase().includes(searchFilters.username.toLowerCase())
			&& person.description.toLowerCase().includes(searchFilters.description.toLowerCase())
			&& person.tags.some(tag =>
				searchFilters.tags.length === 0
				|| searchFilters.tags.some(searchedTag =>
					tag.toLowerCase().includes(searchedTag.toLowerCase())
				)
			)
		));
	},
		[people, searchFilters]
	);

	const addPerson = useCallback((person: Person) =>
		setPeople(people => [...people, person]),
		[]
	);

	const appData: AppData = {
		actionDispatch: dispatch,
		addPerson: addPerson,
		searchFilters: searchFilters,
		matches: matches,
	};

	return (
		<AppDataContext value={appData} >
			<Routes>
				<Route path="/" element={<ListSection />} />
				<Route path="/newPerson" element={<AddPersonSection />} />
				<Route path='/*' element={<ErrorSection />} />
			</Routes>
		</AppDataContext>
	)
}

export default Main;