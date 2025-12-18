/*import rigoImageUrl from "../assets/img/rigo-baby.jpg";*/
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import ContactsCard  from "../components/ContactsCard.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const [isEditing, setIsEditing] = useState(false)
	const [editingContact, setEditingContact] = useState(null)
	const [formData, setFormData] = useState({
		full_name: "",
		email: "",
		phone: "",
		address: "",
		agenda_slug: "agenda_luis"
	})
	
	//FUNCION QUE HACE EL FETCH A LA API Y ENTREGA DATOS AL STORE
	const fetchApi = async () => {
		const resp = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_luis/contacts`);
		const data = await resp.json();
		dispatch({type:"set_contacts", payload:data.contacts})
		console.log(data.contacts);
	}
	
	// Aqui la funcion handleDelete borra el contacto usando el id que se le pasa cauendo es llamada en un map 
	// y actualiza el estado en el store si la respuesta es .ok
	const handleDelete = async (id) => {
		const resp = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_luis/contacts/${id}`,
			{ method: "DELETE" }			
		);
		// console.log('ESTADO DEL DELETE:', resp.status)
		if (resp.ok) {
			dispatch({ type: "delete_contact", payload: id })
		}

	}
	

	// FUNCION PARA EDITAR
	const handleEdit = (contact) => {
		setEditingContact(contact)
		setIsEditing(true)
		setFormData({
			full_name: contact.name,
			email: contact.email,
			phone: contact.phone,
			address: contact.address,
			agenda_slug: "agenda_luis"
		})
	}

	// FUNCION PARA GUARDAR 
	const handleSave =  async () => {
		const resp = await fetch( `https://playground.4geeks.com/contact/agendas/agenda_luis/contacts/${editingContact.id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json"},	
				body: JSON.stringify(formData)					
			}
		)
		if(resp.ok) {
			dispatch({ 
				type:"update_contact",
				payload: {
					id: editingContact.id,
					updatedContact: {
						full_name: formData.full_name,
						email: formData.email,
						phone: formData.phone,
						address: formData.address
					}
				}
			 })

			setIsEditing(false);
			setEditingContact(null);
		}
		console.log("PUT STATUS:", resp.status)
	}

	useEffect(() => {
			fetchApi();
		}, []);

	return (
		<div className="container d-flex flex-column">
			
			{/*RENDERIZADO CONDICIONAL SEGUN EL ESTADO DE isEditing se muestra una UI u otra*/}
			{isEditing ? (
				<form className="w-50 mx-auto mt-4">
					<h3 className="text-center mb-3">Edit Contact</h3>
					<input 
						type="text"
						className="form-control mb-3"
						value={formData.full_name}
						onChange={(e) => setFormData({...formData, full_name: e.target.value})}
						placeholder="name"
					/>

					<input 
						type="text"
						className="form-control mb-3"
						value={formData.email}
						onChange={(e) => setFormData({...formData, email: e.target.value})}
						placeholder="email"
					/>

					<input 
						type="text"
						className="form-control mb-3"
						value={formData.phone}
						onChange={(e) => setFormData({...formData, phone: e.target.value})}
						placeholder="phone"
					/>

					<input 
						type="text"
						className="form-control mb-3"
						value={formData.address}
						onChange={(e) => setFormData({...formData, address: e.target.value})}
						placeholder="address"
					/>
					<button type="button" className="btn btn-secondary w-100" onClick={handleSave}>
						save
					</button>					
				</form>	
			) : (
				store.contacts.map((item) => (
					<ContactsCard
						key={item.id}
						id={item.id}
						name={item.name}
						phone={item.phone}
						email={item.email}
						address={item.address}
						onDelete={handleDelete}
						onEdit={() => handleEdit(item)}
					/>
				))
			)}
		</div>		
	);
}; 