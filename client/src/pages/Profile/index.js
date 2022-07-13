import React, { useEffect, useState } from 'react';
import './style.css';
import logoImage from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api';
import { toast } from 'react-toastify';

function Profile(props) {

    const navigate = useNavigate();
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        async function getIncidents() {
            api.get('profile', { headers: { Authorization: ongId, } }).then(res => {
                setIncidents(res.data);
            })
        }
        getIncidents();
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            const res = await api.delete(`incidents/${id}`, {headers: {Authorization: ongId}});

            if(res.status === 204){
                const deletedIncident = incidents.find(incident => incident.id === id);
                setIncidents(incidents.filter(incident => incident.id !== id));

                toast.success(`${deletedIncident.title} apagado com sucesso!`);
            }
        } catch (err) {
            toast.error('Erro ao deletar caso, tente novamente!');
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className='button' to="/incidents/new">Cadastrar novo caso</Link>
                <button type='button' onClick={handleLogout}>
                    <FiPower size={18} color="e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type='button' onClick={()=>handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;