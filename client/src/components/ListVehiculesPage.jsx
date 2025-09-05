import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddVehiculeModal from './AddVehiculeModal';
import PutVehiculeModal from './PutVehiculeModal';
import './Dashboard.css';
const baseURI = import.meta.env.VITE_API_BASE_URL;

const ListVehiculesPage = () => {
    const [vehicules, setVehicules] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editVehicule, setEditVehicule] = useState(null);
    const navigate = useNavigate();

    const fetchVehicules = async () => {
        try {
            const response = await fetch(baseURI + 'api/vehicules', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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

    useEffect(() => {
        fetchVehicules();
    }, []);

    const handleEdit = (vehicule) => {
        setEditVehicule(vehicule);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(baseURI + `api/vehicules/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setVehicules(vehicules.filter(v => v.id !== id));
            } else {
                alert("Erreur lors de la suppression du véhicule");
            }
        } catch (error) {
            alert("Erreur réseau");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Liste des véhicules</h1>
                <button className="action-button" onClick={() => { setEditVehicule(null); setShowModal(true); }}>
                    Ajouter un véhicule
                </button>
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
                                <th>Actions</th>
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
                                    <td>
                                        <button className="action-button" onClick={() => handleEdit(v)}>Modifier</button>
                                        <button className="action-button" onClick={() => handleDelete(v.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                editVehicule
                    ? <PutVehiculeModal vehicule={editVehicule} onClose={() => setShowModal(false)} onUpdated={fetchVehicules} />
                    : <AddVehiculeModal onClose={() => setShowModal(false)} onAdded={fetchVehicules} />
            )}
        </div>
    );
};

export default ListVehiculesPage;