import { FaTrashAlt } from 'react-icons/fa';

//we have taken this "li" component from itemList component which was inturn taken from content componet. All this was done to make the code more abstract and more readable.

const LineItem=({item,handleCheck,handleDelete})=>{
    return(
        <li className="item" key={item.id}>
                        <input 
                        type="checkbox" 
                        checked={item.checked}
                        onChange={()=>handleCheck(item.id)}/> 
                        {/* only defining this will not change the state of input box because the page is rendered again and again. So we have to make changes to handleCheck function to make the change visible */}

                        <label
                        style={(item.checked)?{textDecoration:'line-through'}:null}
                        onDoubleClick={()=>handleCheck(item.id)}>{item.item}
                        </label>
                        <FaTrashAlt 
                            onClick={()=>handleDelete(item.id)}
                            role="button" 
                            tabIndex="0"
                        />
                    </li>
    )
}

export default LineItem