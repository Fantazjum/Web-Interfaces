import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ListOfPeople from './ListOfPeople.js'
import NewPerson from './NewPerson.js'
import SearchPerson from './SearchPerson.js'
import FoundPeople from './FoundPeople.js'

class Main extends Component {
	state = {
		listOfPeople: [],
		matchingPeople: []
	}
	
	addPerson = (user, mail, desc, tags) => {
		const newId = this.state.listOfPeople.length;
		this.setState({
			listOfPeople: this.state.listOfPeople.concat({id: newId, user: user, mail: mail, desc: desc, tags: tags})
		})
	}
	
	searchPeople = (username, description, tags) => {
		console.log(this.state.listOfPeople);
		let list = this.state.listOfPeople.filter(person => 
				( person.user.toLowerCase().includes(username.toLowerCase()) && 
				person.desc.toLowerCase().includes(description.toLowerCase()) &&
				person.tags.toLowerCase().includes(tags.toLowerCase())
		));
		this.setState({
			matchingPeople: list
		})
	}
	
	render() {
		return (
			<Switch>
				<Route path="/" exact>
					<section>
						<SearchPerson searcher={this.searchPeople} />
						<FoundPeople num={this.state.matchingPeople.length} />
						<ListOfPeople people={this.state.matchingPeople} />
					</section>
				</Route>
				<Route path="/newPerson">
					<section><NewPerson adder={this.addPerson} /></section>
				</Route>
				<Route>
					<section><h1>Error 404 - not found</h1></section>
				</Route>
			</Switch>
		)
	}
}

export default Main;