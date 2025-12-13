import { useState } from "react"
import { useNavigate } from "react-router-dom"

const NewContacts = () => {    
    const [newContact, setNewContact] = useState({})
    const navigate = useNavigate()

    const handleImput = (event) => {
        setNewContact({ ...newContact, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();      
        const response = await fetch('https://playground.4geeks.com/contact/agendas/agenda_luis/contacts', {
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
  }

    /* Array para mapear los campos del imput de manera dinámica */
    const fields = [
    { 
        label: "Full Name", 
        type: "text", 
        placeholder: "Full Name", 
        id: "name" 
    },
    {   
        label: "Email", 
        type: "email", 
        placeholder: "Enter email", 
        id: "email" 
    },
    { 
        label: "Phone", 
        type: "text", 
        placeholder: "Enter phone", 
        id: "phone" 
    },
    { 
        label: "Address", 
        type: "text", 
        placeholder: "Enter address", 
        id: "address" 
    }
  ]

    return (
    <>
        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
            <h1 className="text-secondary user-select-none">Add New Contact</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column w-50">
            {
                fields.map((item, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={item.id} className="form-label ps-2 text-muted user-select-none">{item.label}</label>
                        <input
                            type={item.type} 
                            placeholder={item.placeholder}
                            id={item.id} 
                            name={item.id}
                            value={newContact[item.id] || ""}
                            onChange={handleImput}
                            style={{fontSize:"0.8em"}}
                            className="form-control text-light fst-italic"                           
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
        
    
