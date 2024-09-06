import "./style.css"
function FlashCard({children}){
return(
    <div className="flash-card" style={{backGroundImage:"../../assets/images/gold_wizard_hat_720.png"}}>
    {children}
    </div>
)
}

export default FlashCard