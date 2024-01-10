import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosArrowForward } from 'react-icons/io';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './thing.css';

const Manual = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('');
  const [expiredDate, setExpiredDate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [unsuccessMessage, setUnSuccessMessage] = useState('');
  const [typesList, setTypesList] = useState([]);
  const [layersList, setLayersList] = useState([]);

  useEffect(() => {
    // Fetch types from the "types" collection
    const fetchTypes = async () => {
      try {
        const typesSnapshot = await getDocs(collection(db, 'types'));
        const typesData = typesSnapshot.docs.map((doc) => ({
          name: doc.data().name,
          expectedLife: doc.data().expectedLife,
        }));
        setTypesList(typesData);
      } catch (error) {
        console.error('Error fetching types: ', error);
      }
    };

    // Fetch layers from the "things" collection
    const fetchLayers = async () => {
      try {
        const layersSnapshot = await getDocs(collection(db, 'things'));
        const layersData = layersSnapshot.docs.map((doc) => doc.data().layer);
        setLayersList([...new Set(layersData)]);
      } catch (error) {
        console.error('Error fetching layers: ', error);
      }
    };

    // Call both functions to fetch types and layers
    fetchTypes();
    fetchLayers();
  }, []);

  useEffect(() => {
    // Set initial value for expiredDate based on selectedType
    if (selectedType) {
      const selectedTypeData = typesList.find((type) => type.name === selectedType);
      if (selectedTypeData) {
        const expectedLife = selectedTypeData.expectedLife || 0; // Default to 0 if expectedLife is not present
        const currentDate = new Date();
        const newExpiredDate = new Date(currentDate.setDate(currentDate.getDate() + expectedLife));
        setExpiredDate(newExpiredDate);
      }
    }
  }, [selectedType, typesList]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleLayerChange = (e) => {
    setSelectedLayer(e.target.value);
  };

  const handleCreate = async () => {
    try {
      // Check if both type and layer are selected
      if (!selectedType || !selectedLayer) {
        setUnSuccessMessage('Please select both Type and Layer before creating.');
        return;
      }

      // Construct the data object based on your form values
      const data = {
        types: selectedType,
        layer: selectedLayer,
        expiredDate: expiredDate,
        createdDate: new Date(), // Assuming you want to use the current date
      };

      // Add the data to the 'things' collection
      const docRef = await addDoc(collection(db, 'things'), data);

      // Update success message
      setSuccessMessage(`Successfully added ${data.types}`);

      // Log a message to the console when the request is made
      console.log('Request to Firebase made:', data);
    } catch (error) {
      console.error('Error adding document: ', error);
      setUnSuccessMessage('Error adding document. Please try again.');
    }
  };

  return (
    <>
      <div className='title'>
        <a href='/add-thing'>Add Thing</a> <IoIosArrowForward /> Manual
      </div>

      <div className="grey-container">
        <div className='selection-container'>
          <div className='select-title'>Type:</div>
          <select value={selectedType} onChange={handleTypeChange} required>
            <option value='' disabled>Select a type</option>
            {typesList.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className='selection-container'>
          <div className='select-title'>Layer:</div>
          <select value={selectedLayer} onChange={handleLayerChange} required>
            <option value='' disabled>Select a layer</option>
            {layersList.map((layer) => (
              <option key={layer} value={layer}>
                {layer}
              </option>
            ))}
          </select>
        </div>
        <div className='selection-container'>
          <div className='select-title'>Expired Date:</div>
          <DatePicker
            selected={expiredDate}
            onChange={(date) => setExpiredDate(date)}
            minDate={new Date()} required // Set minDate to today
          />
        </div>
        <button className='submit-button' onClick={handleCreate}>
          Create
        </button>
      </div>
  
      {successMessage && <div className="success-message">{successMessage}</div>}
      {unsuccessMessage && <div className="error-message">{unsuccessMessage}</div>}
    </>
  );
};

export default Manual;
