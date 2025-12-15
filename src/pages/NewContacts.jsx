import {useState} from "react"  
import { useNavigate } from "react-router-dom"

const NewContacts = () => {
    
    const [newContact, setNewContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        agenda_slug: ""
    })
    const navigate = useNavigate()

    const handleImput = async (event) => {
        const name = event.target.name
        const value = event.target.value
        setNewContact({ ...newContact, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        /*const response = import.meta.env.VITE_API_URL +"/contacts";*/

        console.log(newContact)

        const response = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_luis/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
        })
        const data = await response.json();
        if (response.ok) {
        navigate("/")
        }
        else {
            console.log(`Error: no se pudo crear el contacto`)
        }
  }

    /* Array para mapear los campos del imput de manera dinámica */
    const fields = [
    { 
        label: "Full Name", 
        type: "text", 
        placeholder: "Full Name", 
        name: "name" 
    },
    {   
        label: "Email", 
        type: "email", 
        placeholder: "Enter email", 
        name: "email" 
    },
    { 
        label: "Phone", 
        type: "text", 
        placeholder: "Enter phone", 
        name: "phone" 
    },
    { 
        label: "Address", 
        type: "text", 
        placeholder: "Enter address", 
        name: "address" 
    }
  ]

    return (
    <>
        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
            <h1 className="text-secondary user-select-none">Add New Contact</h1>
            <form className="d-flex flex-column w-50 form-control" onSubmit={handleSubmit} >
            {
                fields.map((field, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={field.name} className="form-label ps-2 text-muted user-select-none">{field.label}</label>
                        <input
                            name={field.name}
                            type={field.type} 
                            placeholder={field.placeholder}
                            id={field.name}
                            value={newContact[field.name] || ""}
                            onChange={handleImput}
                            style={{fontSize:"0.8em"}}
                            className="form-control text-black fst-italic"                           
                        />
                    </div>
                ))
            }
                <button className="btn btn-primary mt-2" type="submit" >
                    Save Contact
                </button>
            </form>
        </div>
    </>)
}
export default NewContacts;
        
    
