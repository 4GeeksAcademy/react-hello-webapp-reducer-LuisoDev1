/*import rigoImageUrl from "../assets/img/rigo-baby.jpg";*/
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import ContactsCard from "../components/ContactsCard.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const [isEditing, setIsEditing] = useState(false)
	const [editCurrentContact, setEditCurrentContact] = useState(null)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		agenda_slug: "agenda_luis"
	})

	const fetchApi = async () => {
		const resp = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_luis/contacts`);
		const data = await resp.json();
		dispatch({ type: "set_contacts", payload: data.contacts })
	}

	const handleDelete = async (id) => {
		const resp = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_luis/contacts/${id}`,
			{ method: "DELETE" }
		);
		if (resp.ok) {
			dispatch({ type: "delete_contact", payload: id })
		}
	}

	const handleEdit = (cont) => {
		setEditCurrentContact(cont)
		setIsEditing(true)
		setFormData({
			name: cont.name,
			email: cont.email,
			phone: cont.phone,
			address: cont.address,
			agenda_slug: "agenda_luis"
		})
	}

	const handleSave = async () => {
		const resp = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_luis/contacts/${editCurrentContact.id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			})
		if (resp.ok) {
			dispatch({
				type: "update_contact",
				payload: {
					id: editCurrentContact.id,
					updatedContact: {
						name: formData.name,
						email: formData.email,
						phone: formData.phone,
						address: formData.address
					}
				}
			})

			setIsEditing(false);
			setEditCurrentContact(null);
		}
	}

	useEffect(() => {
		// Si el store está vacío, agrega un contacto dummy
		if (store.contacts.length === 0) {
			dispatch({
				type: "set_contacts",
				payload: [{
					id: "dummy",
					name: "Mike Amendolla",
					phone: "(870) 288-4149",
					email: "mike.ana@example.com",
					address: "5842 Hillcrest Rd"
				}]
			});
		}

		fetchApi();
	}, []);


	return (
		<div className="container d-flex flex-column">
			{isEditing ? (
				<form className="w-50 mx-auto mt-4">
					<h3 className="text-center mb-3">Edit Contact</h3>
					<input
						type="text"
						className="form-control mb-3"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						placeholder="name"
					/>

					<input
						type="text"
						className="form-control mb-3"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						placeholder="email"
					/>

					<input
						type="text"
						className="form-control mb-3"
						value={formData.phone}
						onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
						placeholder="phone"
					/>

					<input
						type="text"
						className="form-control mb-3"
						value={formData.address}
						onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
