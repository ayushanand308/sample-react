import App from "./App";
import ItemList from "./itemList";



//we took "items","handleCheck" and "handleDelete" from here to App so that we can prop drill it to use for both "Component" and "Footer"

const Content=({items,handleCheck,handleDelete})=>{



    return(
        <>
            <ItemList
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default Content