/*import rigoImageUrl from "../assets/img/rigo-baby.jpg";*/
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import ContactsCard  from "../components/ContactsCard.jsx";

export const Home = () => {
	const [contact, setContact] = useState([]);
	const fetchApi = async () => {
		const resp = await fetch('https://playground.4geeks.com/contact/agendas/agenda_luis/contacts');
		const data = await resp.json();
		setContact(data.contacts);
		console.log(data);
	}
	
	const handleDelete = async (id) => {
		const resp = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_luis/contacts/${id}`,
			{ method: "DELETE" }
			
		);
		console.log('ESTADO DEL DELETE:', resp.status)

		if (resp.ok){
			setContact(contact.filter((item) => item.id !== id))
		}
	}

	useEffect(() => {
			fetchApi();
		}, []);

	return (
		<div className="container d-flex flex-column" >
			
			{contact.map((itemContact) => {
				return (
			<ContactsCard
				onDelete={handleDelete}
				key={itemContact.id}
				id={itemContact.id}
				name={itemContact.name}
				phone={itemContact.phone}
				email={itemContact.email}
				address={itemContact.address} >
			</ContactsCard>)
			})}		
					
		</div>
	);
}; 