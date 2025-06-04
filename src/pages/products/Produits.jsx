import './produits.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';

export default function Produits() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Erreur lors du chargement des produits');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    
    return (
        <>
            <Nav/>
            <div>
                <h1>Tous nos produits</h1>
                {products.map(product => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.image} alt={product.title} />
                        <p>{product.description}</p>
                        <p>Prix: {product.price}€</p>
                        <p>Catégorie: {product.category}</p>
                        <p>Note: {product.rating.rate}/5 ({product.rating.count} avis)</p>
                        <Link to={`/produit/${product.id}`}>
                            <button>Voir les détails</button>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    )
}