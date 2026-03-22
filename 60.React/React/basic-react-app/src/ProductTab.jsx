import Product from "./Product";

function ProductTab(){

    let styles={
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center",
    }

    return (
        
        <div style={styles}>
        <Product title="Logitech MX Master" ind={0}/>
        <Product title="Apple Pencil (2nd Gen)" ind={1}/>
        <Product title="Zebronics Zeb-transform" ind={2}/>
        <Product title="Petronics Toad 23" ind={3}/>
        </div>
    );
}

export default ProductTab;