"use strict";

const RcE = React.createElement;

const Tag = (props) => {
	const { txt } = props;
	return <div style={{border: 2 + 'px solid Orange', backgroundColor: 'BurlyWood', marginRight: 3 + 'px'}}>{txt}</div>;
}

const ListIt = (props) => {
	const { img, user, mail, description, tags} = props;
	return (<li key={user}>
		<picture style={{float: left, width: 100 + 'px', height: 100 + 'px'}}>
			<source srcset={img} />
			<img src="Def.png" />
		</picture>
		<h2>{user}</h2>
		<a href="#">{mail}</a>
		<p style={{clear: 'left'}}>{description}</p>
		<div style={{border: 2 + 'px solid Orange', backgroundColor: 'BurlyWood', marginRight: 3 + 'px'}}>{tags}</div>
	</li>);
}

const you = <ListIt 
	img="You.png"
	user="You"
	mail="WhatsThePoint@nihil.org"
	description="Sleepy and tired"
	tags="Scratch"
/>;

const gnwa = <ListIt
	img="GNWA.png"
	user="Guy she tells you not to worry about"
	mail="KnownToAll@chad.net"
	description="Self-made billionaire, killer smile, exceptionally talented"
	tags="Everything you can do I can do better"
/>;

function List(props) {
	let { userList, srcUsr, srcDesc, srcTag} = props;
	
	let list = userList.filter(usr => ( usr.props.user.toLowerCase().includes(srcUsr.toLowerCase()) && 
				usr.props.description.toLowerCase().includes(srcDesc.toLowerCase())	&&
				usr.props.tags.toLowerCase().includes(srcTag.toLowerCase())
		));
	return list;
}

function Searching(props) {
	let {userList, srcUsr, srcDesc, srcTag} = props; //tak, jest powód, dla którego po raz kolejny wywołuję to samo
	
	let list = userList.filter(usr => ( usr.props.user.toLowerCase().includes(srcUsr.toLowerCase()) && 
				usr.props.description.toLowerCase().includes(srcDesc.toLowerCase())	&&
				usr.props.tags.toLowerCase().includes(srcTag.toLowerCase())
		));
	return (<div style={{width: 16.66 + '%', textAlign: 'center'}}>
		<h3>Znaleziono {list.length} kandydatów</h3>
		</div>);
}

class SearchArea extends React.Component {
	
	render() {
		return (<>
			<div style={{ width: 50 + '%'}, {display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
			<label htmlFor="searchUser">Znajdź użytkownika: </label>
			<input id="searchUser" onChange={this.props.input} value={this.props.srcUsr} type="text" />
			<label htmlFor="searchDesc">Znajdź w opisie: </label>
			<input id="searchDesc" onChange={this.props.input} value={this.props.srcDesc} type="text" />
			<label htmlFor="searchTags">Znajdź tagi: </label>
			<input id="searchTags" onChange={this.props.input} value={this.props.srcTag} type="text" />
			</div>
		</>);
	}
}

class NewUserField extends React.Component {
	
	render() {
		return (<>
			<div style={{ width: 33.33 + '%'}, {display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
			<label htmlFor="user">Użytkownik: </label>
			<input id="user" name="user" onChange={this.props.input} value={this.props.usr} type="text" />
			<label htmlFor="mail">Adres E-mail: </label>
			<input id="mail" name="mail" onChange={this.props.input} value={this.props.mail} type="text" />
			<label htmlFor="desc">Opis: </label>
			<input id="desc" name="desc" onChange={this.props.input} value={this.props.desc} type="text" />
			<label htmlFor="tags">Tagi: </label>
			<input id="tags" name="tags" onChange={this.props.input} value={this.props.tags} type="text" />
			<button className="btn btn-warning" onClick={this.props.click}>Dodaj</button>
			</div>
		</>);
	}
}

class ProjectMenu extends React.Component {
	state = {
		users: [you, gnwa],
		srcUsr: "",
		srcDesc: "",
		srcTag: "",
		usr: "",
		mail: "",
		desc: "",
		tags: ""
	}
	
	handleInputChange = (event) => {
		switch(event.target.id) {
		case "searchUser":
			this.setState({	srcUsr: event.target.value	});
			break;
		case "searchDesc":
			this.setState({	srcDesc: event.target.value	});
			break;
		case "searchTags":
			this.setState({	srcTag: event.target.value	});
			break;
		default:
			console.log("Zaszła pewna niespójność...")
		}
	}
	
	handleInputChange2 = (event) => {
		switch(event.target.id) {
		case "user":
			this.setState({	usr: event.target.value	});
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
	
	handleClick = (event) => {
		this.setState({
		users: this.state.users.concat(<ListIt 
				img="Def.png"
				user={this.state.usr}
				mail={this.state.mail}
				description={this.state.desc}
				tags={this.state.tags}
			/>)
		});
	}
	
	render() {
		let ret = <List userList={this.state.users} srcUsr={this.state.srcUsr} 
			srcDesc={this.state.srcDesc} srcTag={this.state.srcTag} />
		let num = <Searching userList={this.state.users} srcUsr={this.state.srcUsr} 
			srcDesc={this.state.srcDesc} srcTag={this.state.srcTag} />
		return (<>
			<SearchArea srcUsr={this.state.srcUsr} srcDesc={this.state.srcDesc} 
				srcTag={this.state.srcTag} input={this.handleInputChange} />
			{num}
			<NewUserField usr={this.state.usr} mail={this.state.mail} desc={this.state.desc} 
				tags={this.state.tags} click={this.handleClick} input={this.handleInputChange2} />
			<div style={{width: 55 + '%', float: 'none'}}>
			<ul>
			{ret}
			</ul>
			</div>
		</>);
	}
}

const domContainer = document.querySelector("#root");
ReactDOM.render(RcE(ProjectMenu), domContainer);
