import { useState } from "react";  
import { useNavigate } from "react-router-dom";

const NewContacts = () => {
    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        agenda_slug: "agenda_luis"
    });

    const navigate = useNavigate();

    // Actualiza el estado en tiempo real según el input que cambie
    const handleInput = (event) => {
        setNewContact({ 
            ...newContact, 
            [event.target.name]: event.target.value 
        });
    };

    // Envia los datos a la API y navega de regreso a home
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/agenda_luis/contacts`, 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newContact)
                }
            );

            if (!response.ok) throw new Error(`Error ${response.status}`);

            const data = await response.json();
            console.log("Contacto creado:", data);
            navigate("/"); // Redirige a Home
        } catch (error) {
            console.error("No se pudo crear el contacto:", error);
        }
    };

    // Configuración de los inputs de manera dinámica
    const fields = [
        { label: "Full Name", type: "text", placeholder: "Full Name", name: "name" },
        { label: "Email", type: "email", placeholder: "Enter email", name: "email" },
        { label: "Phone", type: "text", placeholder: "Enter phone", name: "phone" },
        { label: "Address", type: "text", placeholder: "Enter address", name: "address" }
    ];

    return (
        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
            <h1 className="text-secondary user-select-none">Add New Contact</h1>
            <form className="d-flex flex-column w-50 form-control" onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={field.name} className="form-label ps-2 text-muted user-select-none">
                            {field.label}
                        </label>
                        <input
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            id={field.name}
                            value={newContact[field.name]}
                            onChange={handleInput}
                            className="form-control text-black fst-italic"
                            style={{ fontSize: "0.8em" }}
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary mt-2">
                    Save Contact
                </button>
            </form>
        </div>
    );
};

export default NewContacts;
