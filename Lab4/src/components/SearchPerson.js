import React, { Component } from 'react';

class SearchPerson extends Component {
	state = {
		srcUser: "",
		srcDesc: "",
		srcTags: ""
	}
	
	onChange = (event) => {
		switch(event.target.id) {
		case "searchUser":
			this.setState({	srcUser: event.target.value	});
			break;
		case "searchDesc":
			this.setState({	srcDesc: event.target.value	});
			break;
		case "searchTags":
			this.setState({	srcTags: event.target.value	});
			break;
		default:
			console.log("Zaszła pewna niespójność...")
		}
		this.props.searcher(this.state.srcUser, this.state.srcDesc, this.state.srcTags);
	}
	
	render() {
		return (
			<div style={{display: 'grid', gridTemplateColumns: '1fr 3fr', float: 'left'}}>
			<label htmlFor="searchUser">Znajdź użytkownika: </label>
			<input id="searchUser" onChange={this.onChange} value={this.srcUser} type='text' />
			<label htmlFor="searchDesc">Znajdź w opisie: </label>
			<input id="searchDesc" onChange={this.onChange} value={this.srcDesc} type='text' />
			<label htmlFor="searchTags">Znajdź tagi: </label>
			<input id="searchTags" onChange={this.onChange} value={this.srcTags} type='text' />
			</div>
		);
	}
}

export default SearchPerson;