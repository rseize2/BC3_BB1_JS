import { useState } from 'react';
import './AddVehiculeModal.css';
const baseURI = import.meta.env.VITE_API_BASE_URL;

const AddVehiculeModal = ({ onClose, onAdded }) => {
    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        annee: '',
        client_id: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(baseURI + 'api/vehicules/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    marque: formData.marque,
                    modele: formData.modele,
                    annee: parseInt(formData.annee, 10),
                    client_id: formData.client_id
                })
            });

            if (response.ok) {
                alert("Véhicule ajouté !");
                onAdded();
                onClose();
            } else {
                alert("Erreur lors de l'ajout du véhicule");
            }
        } catch (error) {
            alert("Erreur réseau");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Ajouter un véhicule</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="marque" placeholder="Marque" value={formData.marque} onChange={handleChange} required />
                    <input type="text" name="modele" placeholder="Modèle" value={formData.modele} onChange={handleChange} required />
                    <input type="number" name="annee" placeholder="Année" value={formData.annee} onChange={handleChange} required />
                    <input type="text" name="client_id" placeholder="ID Client" value={formData.client_id} onChange={handleChange} />
                    <div className="modal-buttons">
                        <button type="submit" className="action-button">Ajouter</button>
                        <button type="button" className="action-button" onClick={onClose}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVehiculeModal;