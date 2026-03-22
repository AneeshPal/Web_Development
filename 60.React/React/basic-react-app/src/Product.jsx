import Price from "./Price";
import "./Product.css";

function Product({title,ind}){
    let oldPrices=["12,495","11,900","1,599","599"];
    let newPrices=["8,999","9,199","899","278"];
    let description=[["8000 DPI","5Programmable buttons"],["intuitive surface","designed for ipad Pro"],["designed for ipad Pro","intuitive surface"],["Wireless","optical orientation"]]
    return (
        <div className="Product">
            <h4>{title}</h4>
            <p>{description[ind][0]}</p>
            <p>{description[ind][1]}</p>
            <Price oldPrice={oldPrices[ind]} newPrice={newPrices[ind]}/>           
        </div>
    );

}

export default Product;