import './BrandCards.css';

let brands = [];


fetch("/api/brand")
    .then(response => response.json())
    .then(data => {
        brands = data.data;
    })
    .catch((error) => {
        console.error(`Something went wrong while getting brand: ${error}`);
    });
console.log(brands)
function BrandCards() {
    return (
        <span></span>
    )
}

export default BrandCards