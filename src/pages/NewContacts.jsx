import {useState} from "react"

const NewContacts = () => {
    
    const [newContact, setNewContact] = useState({})

    const handleImput = async (e) => {
        setNewContact({
        ...newContact,
        [e.target.id]: e.target.value
        })
    }

    const fields = [
    { label: "Full Name", type: "text", placeholder: "Full Name", id: "name" },
    { label: "Email", type: "email", placeholder: "Enter email", id: "email" },
    { label: "Phone", type: "text", placeholder: "Enter phone", id: "phone" },
    { label: "Address", type: "text", placeholder: "Enter address", id: "address" }
  ]

    return (
    <>
        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
            <h1>Add New Contact</h1>
            <form className="d-flex flex-column w-50">
            {
                fields.map((field, index) => (
                <div className="mb-3" key={index}>
                    <label htmlFor={field.id} className="form-label">{field.label}</label>
                    <input 
                        type={field.type} 
                        className="form-control" 
                        id={field.id} 
                        placeholder={field.placeholder}
                        value={newContact[field.id]}
                        onChange={handleImput}
                    />
                </div>
                ))
            }
            <button 
                className="btn btn-primary mt-2" 
                type="submit"
            >
                Save Contact
            </button>
            </form>
        </div>
    </>)
}

export default NewContacts;
        
    
