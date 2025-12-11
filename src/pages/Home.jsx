import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="container d-flex flex-column px-2" >
			<div className="d-flex justify-content-end" >
				<button className="btn btn-success text-white rounded-2">Add new contact</button>
			</div>
			
			<div className="d-flex me-auto w-75 flex-row" style={{border:"1px solid #000"}} >
				<div className="ms-3">
					<p>img</p>		
			   	</div>

				<div className="ms-5" >
					<p class="list-group-item p-0 m-0" style={{borderRadius:"none", fontSize:"16px"}}>Santa Ana 217</p>
					<p class="list-group-item p-0 m-0" style={{borderRadius:"none", fontSize:"12px"}}>luisbet92@gmail.com</p>					
					<p class="list-group-item p-0 m-0" style={{borderRadius:"none", fontSize:"12px"}}>Luis Omar</p>
				</div>	

				<div className="ms-auto me-4 p-2" style={{border:"1px solid #000"}}>
					<p>botones</p>		
				</div>						
			</div>
		</div>
	);
}; 