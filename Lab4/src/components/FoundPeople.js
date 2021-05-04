const FoundPeople = (props) => {
	return (
		<div style={{width: 30 + '%', textAlign: 'center', float: 'left'}}>
			<h3>Znaleziono {props.num} kandydatów</h3>
		</div>
	)
}

export default FoundPeople;