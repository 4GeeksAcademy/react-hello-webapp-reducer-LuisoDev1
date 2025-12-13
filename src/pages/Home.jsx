import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import ContacCard  from "../components/ContacCard.jsx";

export const Home = () => {
	const [contac, setContac] = useState([]);
	const fetchApi = async () => {
		const resp = await fetch('https://playground.4geeks.com/contact/agendas/agenda_luis');
		const data = await resp.json();
		setContac(data.contacts);
		console.log(data);
	}

	useEffect(() => {
			fetchApi();
		}, []);

	return (
		<div className="container d-flex flex-column" >
			
			{contac.map((contacItem, key) => {
				return (
			<ContacCard key={key}
				name={contacItem.name}
				phone={contacItem.phone}
				email={contacItem.email}
				address={contacItem.address} >
			</ContacCard>)
			})}		
					
		</div>
	);
}; 