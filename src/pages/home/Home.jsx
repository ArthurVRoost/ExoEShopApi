import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Produits from '../products/Produits';
import axios from 'axios';
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';

export default function Home() {
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

    
    const carouselProducts = products.slice(0, 3);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return(
        <>
        <Nav/>
        <div id="carouselExample" className="carousel slide " >
            <div className='carousel-inner '>
                {carouselProducts.map((product, index) => (
                    <div key={product.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={product.image} className="d-block w-100 imgCarou" alt={product.title} style={{ objectFit: 'contain' }}/> 
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
         <div className="homeDiv1">
            <h2 className="homeTitre">Nos Produits les Mieux Notés</h2>
            <div className="homeDiv2 ">
                {products
                    .filter(product =>  product.rating.rate >= 4)
                    .map(product => (
                        <div key={product.id} className="homeDiv3">
                            <div className="homeDiv4">
                                <img src={product.image} className="homeCardimg" alt={product.title} style={{ height: '200px', objectFit: 'contain' }}/>
                                <div className="homeDiv5">
                                    <h5 className="homeCardTitre">{product.title}</h5>
                                    <p className="homeCardP">{product.description}</p>
                                    <div className="homeDiv6">
                                        <div className="homeDiv7">
                                            <span className="homeCardPrix">{product.price}€</span>
                                            <div className="homeDiv8">
                                                <span className="text-warning etoiles">
                                                    {'★'.repeat(Math.floor(product.rating.rate))}
                                                    {'☆'.repeat(5 - Math.floor(product.rating.rate))}
                                                </span>
                                                <small className="homeCardRating">({product.rating.rate})</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <Footer/>
        </>
    )
}