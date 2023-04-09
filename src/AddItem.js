import { FaPlus } from "react-icons/fa"
const AddItem=({newItem,setNewItem,handleSubmit})=>{
    return(//when we clicked on submit button of the form, its default value was to reload and the output of onSubmit function was not visible on. To prevent this we have added preventDefault to the onsubmit
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Item</label>
            <input
            autoFocus
            id="addItem"
            type="text"
            placeholder="Add Item"
            required 
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
            />
            <button 
            type="submit"
            aria-label="Add Item">
                <FaPlus/>
            </button>
        </form>
    )
}

export default AddItem