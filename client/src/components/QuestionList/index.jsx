import "./style.css"
function FlashCard({children}){
return(
    <div className="flash-card" style={{backGroundImage:"../../assets/images/Image\ from\ iOS.jpg"}}>
    {children}
    </div>
)
}

export default FlashCard