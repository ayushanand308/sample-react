import App from "./App"



//props holds all the diff properites that has been passed from the parent component to the child component.

const Header=(props)=>{
/*     const headerStyle={
        backgroundColor:'mediumblue',
        color:'#fff'
    }; */

    return(
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

Header.defaultProps={
    title:"Default Title"
}

export default Header