import { useState, useEffect } from 'react';
import './AddVehiculeModal.css';
const baseURI = import.meta.env.VITE_API_BASE_URL;

const PutVehiculeModal = ({ onClose, onUpdated, vehicule }) => {
    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        annee: '',
        client_id: ''
    });

    useEffect(() => {
        if (vehicule) {
            setFormData({
                marque: vehicule.marque,
                modele: vehicule.modele,
                annee: vehicule.annee,
                client_id: vehicule.client_id
            });
        }
    }, [vehicule]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(baseURI + 'api/vehicules/edit/' + vehicule.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    marque: formData.marque,
                    modele: formData.modele,
                    annee: parseInt(formData.annee, 10),
                    client_id: formData.client_id || null
                })
            });

            if (response.ok) {
                alert("Véhicule modifié !");
                onUpdated();
                onClose();
            } else {
                alert("Erreur lors de la modification du véhicule");
            }
        } catch (error) {
            alert("Erreur réseau");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Modifier le véhicule</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="marque" placeholder="Marque" value={formData.marque} onChange={handleChange} required />
                    <input type="text" name="modele" placeholder="Modèle" value={formData.modele} onChange={handleChange} required />
                    <input type="number" name="annee" placeholder="Année" value={formData.annee} onChange={handleChange} required />
                    <input type="text" name="client_id" placeholder="ID Client" value={formData.client_id} onChange={handleChange} />
                    <div className="modal-buttons">
                        <button type="submit" className="action-button">Modifier</button>
                        <button type="button" className="action-button" onClick={onClose}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PutVehiculeModal;
