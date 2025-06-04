import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './details.css'
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';
export default function Details() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Chargement...</div>;
    if (!product) return <div>Produit non trouvé</div>;

    return (
        <>
        <Nav/>
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>Prix: {product.price}€</p>
            <p>Catégorie: {product.category}</p>
            <p>Note: {product.rating.rate}/5</p>
        </div>
        <Footer/>
        </>
    );
}