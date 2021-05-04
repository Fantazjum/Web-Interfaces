import def from '../images/Def.png'

const PersonItem = (props) => (
	<li style={{paddingBottom: 2 + 'em', margins: 5 + 'px', border: 2 + 'px solid Olive', overflow: 'hidden', width: 50 + '%', clear: 'left'}}>
	<div style={{width: 110 + 'px', float: 'left'}}>
		<img src={def} alt='Default' />
	</div>
	<h2>{props.data.user}</h2>
	<p style={{textDecoration: 'underline', color: 'Blue'}}>{props.data.mail}</p>
	<p style={{clear: 'left'}}>{props.data.desc}</p>
	<div style={{border: 2 + 'px solid Orange', backgroundColor: 'BurlyWood', marginRight: 3 + 'px', float: 'left'}}>{props.data.tags}</div>
	</li>
)

export default PersonItem;