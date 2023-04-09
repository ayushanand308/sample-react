import Header from "./Header";
import Footer from "./footer";
import Content from "./Content";
import { useState,useEffect} from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";


/*The App component is the parent component and the Header, Content, and Footer components are child components. The title property is being passed from the App component to the Header component as a prop, and it can be accessed within the Header component using the props object. So the title value of "Groceries" is indeed a property that is being passed from the parent App component to the child Header component.*/

function App(){
    const API_URL='http://localhost:3600/items';//we are using a local host as our server for backend and we have 3 items saved at this url database.And we are using this url to setItems at the line of load using useEffect to the data that we have in our local backend server, i.e whenever we load our page, listItems are set to the items that our local database has and currently it only has 3 items and it is not changed so everytime page reloads, inspite of the changes we make to the list, the original list with 3 items is loaded.

    /* const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []); */ //we have passed an array as default value for "itmes"

    const [items, setItems] = useState([]);

    //before we had passed an object containing three list items. But now since we are saving all the changes made my "additem","handlecheck","handledelete" and "handlesubmit" to local storage we also need to set the default value of list as it is in the local storage because as soon as the page reloads this default value will be displayed on page and if we have not set the default value of item from local storage, then after realoading the page, those three list items will be displayed again and again. But we do not want that and want to store our changes. That is why we have set the default value to the be the values from local storage.

    const [newItem,setNewItem]=useState('');
    const [search,setSearch]=useState('');
    const [fetchError,setFetchError]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    //initially the value of isloading is true so that is displayed on the screen but when API-url call is complete wheter with an error or without error, then isloading is set to false and it is removed from the dom.


/*     useEffect(()=>{
      console.log('load time')
    },[])  this function runs at every render if [] is not given. If [ ] is given then it is empty then it runs only once on load time. If other dependencies are provided in [] then it runs when those dependencies changes*/

    console.log("before")

/*     useEffect(()=>{
      localStorage.setItem('shoppinglist',JSON.stringify(items))
    },[items]) */

    useEffect(()=>{
      const fetchItems=async()=>{
        try{
          const response=await fetch(API_URL);
          if(!response.ok){
            throw Error("error go brrrrrrrrrrrrrrrrrrrrrrrr");
          }//when this line was not written then we were getting an error that said "items.filter" is not a function because if api_url is not valid,then still this function gave an empty list and apply filter function on that empty list was producing this error. Since api was invalid, we were getting a messgae that "404 url not found". So response.ok is true if error code is 200 else it is false. So by adding this line, we are cathcing the error of invalid url as soon as we get 404 error.
          const listItems=await response.json();
          console.log(listItems);
          setItems(listItems);
          setFetchError(null);
        }
        catch(err){
          setFetchError(err.message);//If the response from the API call is not successful (i.e. the response.ok value is false), then the throw statement is executed, which creates and throws an Error object with the message "error go brrrrrrrrrrrrrrrrrrrrrrrr". This error is then caught by the catch block and the setFetchError function is called with the error message as an argument, which sets the fetchError state variable to the error message.
        }finally{
          setIsLoading(false);
        }
      }

      setTimeout(() => {
        fetchItems();
      }, 100); //settimeout is used to simulate the situation when apicall is not very fast and takes some time
    },[])

    console.log("after")

    const addItem=async(item)=>{
        const id=items.length?items[items.length-1].id+1:1;
        const mynewItem={id,checked:false,item};
        const listItems=[...items,mynewItem];
        setItems(listItems);

        const postOptions={
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(mynewItem)
        }

        const result=await apiRequest(API_URL,postOptions);
        if(result){
          setFetchError(result); 
        }

    }

    const handleCheck=async(id)=>{
        /*      console.log(`key:${id}`)
         */   
                const listItems=items.map((item)=>item.id===id?{...item,checked:!item.checked}:item);
                setItems(listItems);

                const myItems=listItems.filter((item)=>item.id===id)
                console.log(myItems)
                const updateOptions={
                  method:'PATCH',
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({checked:myItems[0].checked})
                };

                const reqUrl=`${API_URL}/${id}`;
                const result=await apiRequest(reqUrl,updateOptions);
                if(result){
                  setFetchError(result);
                }

    }
        
    const handleDelete=async(id)=>{
        /*         console.log(`key${id}`)
         */    
                const listItems=items.filter((item)=>item.id!==id);
                setItems(listItems);

                const deleteOptions={method:'DELETE'};
                const reqUrl=`${API_URL}/${id}`;
                const result=await apiRequest(reqUrl,deleteOptions);
                if(result){
                  setFetchError(result);
                }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!newItem){
            return;
        }
        addItem(newItem);
        setNewItem('');
    }

    return (
        <div className="App">
          <Header title="Grocery List" />
          <AddItem
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}
          />
          <SearchItem
            search={search}
            setSearch={setSearch}
          />
          <main>
            {isLoading && <p>Loading items......</p>}

            {fetchError &&<p>{`error:${fetchError}`}</p>}
          <Content
            items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
          </main>
          <Footer length={items.length} />
        </div>
      );


}
export default App

//If we want to list how many list items are in the "content" component in the footer componet, then footer needs access to the content. So we need to take required data from "content" and move to the "App" component and then use it for both "footer" and "content" in the App component.  