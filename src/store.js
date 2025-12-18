export const initialStore=()=>{
  return{
    message: null,

    contacts: [],

    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':
      const { id,  color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      case "set_contacts":
      return {
        ...store, 
        contacts: action.payload
      }

      case "update_contact":
        return {
          ...store,
          contacts: store.contacts.map((item) => 
            item.id === action.payload.id  ?  { ...item, ...action.payload.updatedContact } : item
          )
        }

        case "delete_contact":
          return {
            ...store,
            contacts: store.contacts.filter(item => item.id !== action.payload)
        }


    default:
      throw Error('Unknown action.');
  }    
}
