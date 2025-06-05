import def from '../../../images/def.png';
import Person from '../../../models/Person';
import './PersonItem.css';

interface PersonItemProps {
	person: Person;
}

function PersonItem({ person }: PersonItemProps) {
	const tags = person.tags.map((tag, index) =>
		<div className='tag' key={index}>{tag.trim()}</div>
	);

	return (
		<li className='item'>
			<div className="person-box">
				<div className='picture'>
					<img src={def} alt='Default' />
				</div>
				<div className="contact-data">
					<h2>{person.username}</h2>
					<a className='email' href={'mailto:' + person.email}>{person.email}</a>
				</div>
			</div>
			<p className='description'>{person.description}</p>
			<div className='tags'>{tags}</div>
		</li>
	);
}

export default PersonItem;