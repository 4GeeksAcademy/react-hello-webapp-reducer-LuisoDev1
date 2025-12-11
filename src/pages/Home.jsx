import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";


export const Home = () => {
	const [valor, setvalor] = useState([]);
	const fetchApi = async () => {
		const resp = await fetch("https://jsonplaceholder.typicode.com/users");
		const data = await resp.json();
		setvalor(data);
		console.log(data);

	} 	

	useEffect(() => {
			fetchApi();
		}, []);

	return (
		<div className="container d-flex flex-column" >
			
			<div className="d-flex justify-content-end" >
				<button className="btn btn-success text-white rounded-2">Add new contact</button>
			</div>
			
			<div className="d-flex me-auto w-100 flex-row py-3" style={{border:"1px solid #000"}} >
				<div className="ms-3">
					<img className="w-100 img-fluid rounded-circle" style={{objectFit:"cover"}} src="https://www.freepik.es/foto-gratis/es-playa-arena-increible_975097.htm#fromView=keyword&page=1&position=0&uuid=c147be17-cba4-4f69-89c8-55878f3e1d5b&query=Playas+paradisiacas" />		
			   	</div>

				<div className="ms-5" >
					<p className="list-group-item p-0 m-0" style={{borderRadius:"none", fontSize:"18px", fontWeight:"lighter"}}>Luis Omar</p>
					<p className="list-group-item p-0 m-0" style={{borderRadius:"none", fontSize:"16px", fontWeight:"lighter"}}>Santa Ana 217</p>
					<p className="list-group-item p-0 m-0" style={{borderRadius:"none", fontSize:"12px", fontWeight:"lighter"}}>(123) 456-78</p>					
					<p className="list-group-item p-0 m-0" style={{borderRadius:"none", fontSize:"12px", fontWeight:"lighter"}}>luisbet@gmail.com</p>
				</div>	

				<div className="ms-auto me-4 p-2" style={{border:"1px solid #000"}}>
					<p>botones</p>		
				</div>						
			</div>
		</div>
	);
}; 