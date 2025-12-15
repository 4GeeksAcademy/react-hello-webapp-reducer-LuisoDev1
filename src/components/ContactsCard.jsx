const ContactsCard = (props) => {

  const pStyle = {
    borderRadius: "none",
    fontSize: "18px",
    fontWeight: "lighter",
    userSelect: "none",
  };

  return (
    <div>
        <div className="d-flex me-auto w-100 flex-row px-3 py-2 mt-1"
          style={{ border: "1px solid #000" }}
        >
            <div className="d-flex justify-content-center align-items-center 
              bg-secondary rounded-circle ms-2 mt-2 me-1 p-0 pb-1" 
              style={{ width: "120px", height: "120px" }}
            >
                <i className="fa-solid fa-user-astronaut fa-5x text-white"></i>
            </div>


          <div className="ms-5">
            <p className="list-group-item p-0 m-0 mb-2" style={pStyle}>
              {props.name || "Mike Amendolla"}
            </p>

            <p className="list-group-item p-0 m-0" style={pStyle}>
              <i className="fa-solid fa-location-dot me-1" />
              { props.address || "5842 Hillcrest Rd"}
            </p>

            <p className="list-group-item p-0 m-0" style={pStyle}>
              <i className="fa-solid fa-phone me-1" />
              { props.phone || "(870) 288-4149"}
            </p>

            <p className="list-group-item p-0 m-0" style={pStyle}>
              <i className="fa-solid fa-envelope me-2" />
              { props.email || "mike.ana@example.com"}
            </p>
          </div>

          <div className="ms-auto me-4 p-2 d-flex justify-content-between">
                <i className="fa-solid fa-pen me-4 text-black"></i>
                <i className="fa-solid fa-trash-can text-danger" onClick={ () => props.onDelete(props.id)} style={{cursor:"pointer"}} ></i>
            </div>            
        </div>
    </div>
  );
};

export default ContactsCard;
