import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import './styles.css'
import logoImage from '../../assets/logo.svg'
import heroes from '../../assets/heroes.png'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api';
import { toast } from 'react-toastify';

function Logon(props) {

    const [id, setId] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);

            navigate('profile')            
        } catch (err) {
            toast.error('Falha no login, tente novamente!');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder='Sua ID' value={id} onChange={e => setId(e.target.value)} />
                    <button type="submit" className='button'>Entrar</button>
                    <Link className='back-link' to="register"><FiLogIn size={16} color="#e02041" />Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroes} alt="Heroes" />
        </div>
    );
}

export default Logon;