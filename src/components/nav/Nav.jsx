import { Link } from 'react-router-dom'
import './nav.css'

export default function Nav() {
    return(
        <>
            <div className='divNav'>
                <Link className='link' to='/'><p className='navP'>Home</p></Link>
                <Link className='link' to='/produits'><p className='navP'>Products</p></Link>
            </div>
        </>
    )
}