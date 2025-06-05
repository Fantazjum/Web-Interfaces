import { useContext } from "react";
import "./FoundPeople.css";
import { AppDataContext } from "../Router/AppData/AppDataContext";

function FoundPeople() {
	const foundPeople = useContext(AppDataContext).matches ?? [];
	const candidateCount = foundPeople.length ? foundPeople.length.toString() : 'no';
	const candidateCountable = foundPeople.length === 1 ? 'candidate' : 'candidates';

	return (
		<div className='people-count'>
			Found {candidateCount} {candidateCountable}
		</div>
	)
}

export default FoundPeople;