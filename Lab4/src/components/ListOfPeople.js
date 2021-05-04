import PersonItem from './PersonItem';

const ListOfPeople = (props) => {
	const list = props.people.map(it => (
		<PersonItem
			key={it.id}
			data={it}
		/>
	));
	
	return (
		<ul>
			{list}
		</ul>
	)
}

export default ListOfPeople;