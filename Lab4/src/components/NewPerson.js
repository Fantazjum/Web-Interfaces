import React, {Component} from 'react';

class NewPerson extends Component {
	
	state = {
		user: "",
		mail: "",
		desc: "",
		tags: ""
	}
	
	onChange = (event) => {
		switch(event.target.id) {
		case "user":
			this.setState({	user: event.target.value });
			break;
		case "mail":
			this.setState({	mail: event.target.value });
			break;
		case "desc":
			this.setState({	desc: event.target.value });
			break;
		case "tags":
			this.setState({	tags: event.target.value });
			break;
		default:
			console.log("Zaszła pewna niespójność...")
		}
	}
	onClick = () => {
		this.props.adder(this.state.user, this.state.mail, this.state.desc, this.state.tags)
		this.setState({
			user: "",
			mail: "",
			desc: "",
			tags: ""
		})
	}
	
	render() {
		return (
			<div style={{ width: 75 + '%', display: 'grid', gridTemplateColumns: '1fr 2fr', float: 'left'}}>
			<label htmlFor="user">Użytkownik: </label>
			<input id="user" name="user" onChange={this.onChange} value={this.user} type='text'  />
			<label htmlFor="mail">Adres E-mail: </label>
			<input id="mail" name="mail" onChange={this.onChange} value={this.mail} type='text' />
			<label htmlFor="desc">Opis: </label>
			<input id="desc" name="desc" onChange={this.onChange} value={this.desc} type='text' />
			<label htmlFor="tags">Tagi: </label>
			<input id="tags" name="tags" onChange={this.onChange} value={this.tags} type='text' />
			<button style={{backgroundColor: "#efb73e", border: 1 + "px solid transparent #efb73e", borderRadius: .25 + 'rem',
			color: "#fff", display: "inline-block", fontSize: 1.5 + 'em', width: 5 + "rem"}} onClick={this.onClick}>Dodaj</button>
			</div>
		);
	}
}

export default NewPerson;