import { useEffect, useState } from "react";

const ContacCard = () => {
    const [user, setUser] = useState({})

    const getUserFromApi = async () => {
        const response = await fetch("https://playground.4geeks.com/contact/agendas/agenda_luis/contacts")
        const data = await response.json()
        setUser(data.contacts[0])
        console.log(data)
    }

    useEffect(() => {
        getUserFromApi();
    }, []);
    

    const pStyle = {
        borderRadius:"none", 
        fontSize:"18px", 
        fontWeight:"lighter", 
        userSelect:"none"
    }

    return (
        <div className="d-flex me-auto w-100 flex-row py-3 mt-2" style={{ border:"1px solid #000", userSelect:"none" }} >
				<div className="ms-3">
					<i class="fa-solid fa-user" style={{fontSize:"80px"}} ></i>
                    <img className="w-100 img-fluid rounded-circle" style={{objectFit:"cover"}} />		
			   	</div>

				<div className="ms-5" >
					<p className="list-group-item p-0 m-0 mb-2" style={pStyle}> 
                        <i/> 
                       { user.name || "Mike Amendolla" }
                    </p>
					<p className="list-group-item p-0 m-0" style={pStyle}> 
                        <i className="fa-solid fa-location-dot me-1"/> 
                        { user.address || "5842 Hillcrest Rd" }
                    </p>
					<p className="list-group-item p-0 m-0" style={pStyle}> 
                        <i className="fa-solid fa-phone me-1"/>  
                        { user.phone || "(870) 288-4149"}
                    </p>					
					<p className="list-group-item p-0 m-0" style={pStyle}> 
                        <i className="fa-solid fa-envelope me-2"/>
                        { user.email || "mike.ana@example.com" }
                    </p>
				</div>	

				<div className="ms-auto me-4 p-2 d-flex justify-content-between">
					<i class="fa-solid fa-pen-clip me-5"></i>
                    <i class="fa-solid fa-trash"></i>	
				</div>						
			</div> )
}
export default ContacCard;