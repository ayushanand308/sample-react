import { FaTrashAlt } from 'react-icons/fa';
import LineItem from './LineItem';

const itemList=({items,handleCheck,handleDelete})=>{
    return(
        <ul>
            {/* we have taken this the element below from "content.js" and made it into a seperate component called "itemList.js" */}
            {items.map((item)=> (
                    <LineItem
                    key={item.id}
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}/>
            ))}
        </ul>
    
    )
}

export default itemList