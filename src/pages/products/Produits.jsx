import './produits.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';

export default function Produits() {
    const navigate = useNavigate()
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
            <div className='retour'>
                <p onClick={()=>navigate(-1)} className='fleche'>&larr;</p>
            </div>
            <div className='divProduits'>
                <h1 className='prodtuisTitre'>Tous nos produits</h1>
                <div className='test'>
                    {products.map(product => (
                    <div className='produitsDiv1' key={product.id}>
                        <h3 className='produitsH3'>{product.title}</h3>
                        <img className='produitsImg' src={product.image} alt={product.title} style={{ height: '200px', objectFit: 'contain' }} />

                        <div className="produitsContentBas">
                            <p className='produitsP1'>Prix: {product.price}€</p>
                            <p className='produitsP2'>Catégorie: {product.category}</p>
                            <p className='produitsP3'>Note: <span className='text-warning'>{product.rating.rate}/5</span> ({product.rating.count} avis)</p>
                            <Link to={`/produit/${product.id}`}>
                            <button className='produitsBtn'>Voir les détails</button>
                            </Link>
                        </div>
                    </div>
                ))}
                </div>
                
            </div>
            <Footer/>
        </>
    )
}