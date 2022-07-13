import React, { useState } from 'react';
import './style.css';
import logoImage from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';

function NewIncident(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const navigate = useNavigate();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = { title, description, value };

        try {
            await api.post('incidents', data, { headers: { Authorization: ongId } });
            navigate('../profile');
        } catch (err) {
            toast.error('Erro ao cadastrar caso, tente novamente!');
        }
    }

    return (
        <div className='new-incident-container'>
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar o herói para resolver isso.</p>
                    <Link className='back-link' to="/"><FiArrowLeft size={16} color="#e02041" />Voltar para home</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder='Titulo do caso'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder='Descrição'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder='Valor em reais'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default NewIncident;