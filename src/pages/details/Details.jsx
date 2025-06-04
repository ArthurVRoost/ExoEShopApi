import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './details.css'
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';

export default function Details() {
    const navigate = useNavigate()
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
        <div className='retour'>
            <p onClick={()=>navigate(-1)} className='fleche'>&larr;</p>
        </div>
        
        <div className='divDetails'>
            <h1 className='detailsH1'>{product.title}</h1>
            <img className='detailsImg' src={product.image} alt={product.title} style={{ height: '400px', objectFit: 'contain' }} />
            <div className='divDescri'>   
                <p className='detailsP1'>{product.description}</p>
            </div>
            
            <p className='detailsP2'>Prix: {product.price}€</p>
            <p className='detailsP3'>Catégorie: {product.category}</p>
            <p className='detailsP4'>Note: <span className='text-warning'>{product.rating.rate}/5</span></p>
        </div>
        <Footer/>
        </>
    );
}