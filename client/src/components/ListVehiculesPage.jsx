import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
const baseURI = import.meta.env.VITE_API_BASE_URL;

const ListVehiculesPage = () => {
    const [vehicules, setVehicules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicules = async () => {
            try {
                const response = await fetch(baseURI + 'api/vehicules', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setVehicules(data);
                } else {
                    alert("Erreur lors de la récupération des véhicules");
                    navigate('/');
                }
            } catch (error) {
                alert("Erreur réseau");
                navigate('/');
            }
        };

        fetchVehicules();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Liste des véhicules</h1>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total véhicules</h3>
                    <div className="stat-value">{vehicules.length}</div>
                    <div className="stat-description">Nombre total de véhicules enregistrés</div>
                </div>
            </div>

            <div className="dashboard-list">
                {vehicules.length === 0 ? (
                    <p>Aucun véhicule enregistré.</p>
                ) : (
                    <table className="vehicules-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Marque</th>
                                <th>Modèle</th>
                                <th>Année</th>
                                <th>Client ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicules.map((v) => (
                                <tr key={v.id}>
                                    <td>{v.id}</td>
                                    <td>{v.marque}</td>
                                    <td>{v.modele}</td>
                                    <td>{v.annee}</td>
                                    <td>{v.client_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ListVehiculesPage;