import {useState} from "react"

const NewContacts = () => {
    
    const [newContact, setNewContact] = useState({})

    const handleImput = async (event) => {
        setNewContact({ ...newContact, [event.target.id]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiUrl = import.meta.env.VITE_API_URL +"/contacts";
        
        const response = await fetch(apiUrl, {
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
            <form className="d-flex flex-column w-50">
            {
                fields.map((field, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={field.name} className="form-label ps-2 text-muted user-select-none">{field.label}</label>
                        <input
                            type={field.type} 
                            placeholder={field.placeholder}
                            id={field.name} 
                            value={newContact[field.name]}
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
        
    
