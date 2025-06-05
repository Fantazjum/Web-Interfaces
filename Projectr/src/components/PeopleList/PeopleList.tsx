import { useContext } from 'react';
import PersonItem from './PersonItem/PersonItem';
import { AppDataContext } from '../Router/AppData/AppDataContext';
import "./PeopleList.css";

const PeopleList = () => {
	const appData = useContext(AppDataContext);
	const people = appData.matches;
	const list = people?.map((person, index) => <PersonItem person={person} key={index} />);

	return (
		<ul className='people-list'>
			{list}
		</ul>
	)
}

export default PeopleList;