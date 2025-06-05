import { useContext, useState } from 'react';
import Person from '../../models/Person';
import { AppDataContext } from '../Router/AppData/AppDataContext';
import "./AddPerson.css";

const emptyPerson: Person = {
	username: '',
	description: '',
	email: '',
	tags: [],
}

function AddPerson() {
	const dataMethods = useContext(AppDataContext);
	const addPerson = dataMethods.addPerson;
	const [person, setPerson] = useState<Person>({ ...emptyPerson });

	const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newPerson: Person = person
			? { ...person }
			: { ...emptyPerson };
		const value = event.target.value;

		switch (event.target.id) {
			case "username":
				newPerson.username = value;
				break;
			case "email":
				newPerson.email = value;
				break;
			case "description":
				newPerson.description = value;
				break;
			case "tags":
				newPerson.tags = value.split(';');
				break;
			default:
				console.error("Something wrong happened with added data...");
				return;
		}

		setPerson(newPerson);
	}

	const addPersonToList = () => {
		if (!person) {
			return;
		}

		addPerson?.call(addPerson, person);
		setPerson({ ...emptyPerson });
	}

	return (
		<div className='new-person-form'>
			<label htmlFor="username">Username: </label>
			<input id="username" name="username" onChange={onChange} value={person.username} />
			<label htmlFor="email">Email address: </label>
			<input id="email" name="email" onChange={onChange} value={person.email} />
			<label htmlFor="description">Description: </label>
			<textarea id="description" name="description" rows={4} onChange={onChange} value={person.description} />
			<label htmlFor="tags">Tags: </label>
			<input id="tags" name="tags" onChange={onChange} value={person.tags.join(';')} />
			<button className='primary-button' onClick={addPersonToList}>Add</button>
		</div>
	);
}

export default AddPerson;