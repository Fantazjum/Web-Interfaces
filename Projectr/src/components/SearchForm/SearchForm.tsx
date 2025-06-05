import { useCallback, useContext, useEffect, useState } from 'react';
import FoundPeople from '../FoundPeople/FoundPeople';
import { AppDataContext } from '../Router/AppData/AppDataContext';
import Person from '../../models/Person';
import "./SearchForm.css";

const emptyFilters: Person = {
	username: '',
	description: '',
	email: '',
	tags: [],
}

type AllowedActions =
	| 'modify'
	| 'reset';

function SearchForm() {
	const dataMethods = useContext(AppDataContext);
	const [filters, setFilters] = useState(dataMethods.searchFilters ?? emptyFilters);
	const actionDispatch = dataMethods.actionDispatch;

	useEffect(() => {
		return () => {
			actionDispatch?.call(actionDispatch, { type: 'reset' });
		}
	}, [actionDispatch])

	const onInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.target.value;
		const actionType: AllowedActions = 'modify';
		const baseAction = { type: actionType, filterName: '', filterValue: value };
		const newFilters = { ...filters };

		switch (event.target.id) {
			case "searchUsername":
				baseAction.filterName = 'username';
				actionDispatch?.call(actionDispatch, baseAction);
				newFilters.username = value;
				break;
			case "searchDescription":
				baseAction.filterName = 'description';
				actionDispatch?.call(actionDispatch, baseAction);
				newFilters.description = value;
				break;
			case "searchTags":
				const tags = value.split(';').map(tag => tag.trim());
				const action = { type: actionType, filterName: 'tags', filterValue: tags };
				actionDispatch?.call(actionDispatch, action);
				newFilters.tags = tags;
				break;
			default:
				console.error("Something wrong happened with searched data...");
				return;
		}

		setFilters(newFilters);
		// we monitor the whole object to ensure it is updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actionDispatch, dataMethods]);

	return (
		<div className="search-field">
			<div className="search-form">
				<label htmlFor="searchUsername">Find user: </label>
				<input id="searchUsername" onInput={onInput} value={filters.username} />
				<label htmlFor="searchDescription">Find in description: </label>
				<input id="searchDescription" onInput={onInput} value={filters.description} />
				<label htmlFor="searchTags">Find tags: </label>
				<input id="searchTags" onInput={onInput} value={filters.tags.join(';')} />
			</div>
			<FoundPeople />
		</div>
	);
}

export default SearchForm;