import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

const Add = () => {
  const [typeList, setTypeList] = useState([]);
  const [newType, setNewType] = useState('');
  const [newExpectedLife, setNewExpectedLife] = useState(0);

  const typeCollectionRef = collection(db, 'types');

  useEffect(() => {
    const getTypeList = async () => {
      try {
        const data = await getDocs(typeCollectionRef);
        const allTypes = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTypeList(allTypes);
      } catch (err) {
        console.error(err);
      }
    };

    getTypeList();
  }, [typeCollectionRef]);

  const createType = async () => {
    try {
      await addDoc(typeCollectionRef, {
        name: newType,
        expectedLife: Number(newExpectedLife),
      });
    } catch (error) {
      console.error('Error creating type:', error);
    }
  };
  
  const updateType = async (id, currentExpectedLife) => {
    try {
      const userDoc = doc(db, 'types', id);
      const newFields = { expectedLife: currentExpectedLife + 1 };
      await updateDoc(userDoc, newFields);
    } catch (error) {
      console.error('Error updating type:', error);
    }
  };
  
  const deleteType = async (id) => {
    try {
      const userDoc = doc(db, 'types', id);
      await deleteDoc(userDoc);
    } catch (error) {
      console.error('Error deleting type:', error);
    }
  };
  
  return (
    <>
      <div className='title'>Add Type</div>
      <div className='grey-container'>
        <div className='form'>
          <input
            type='text'
            placeholder='Type'
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <input
            type='number'
            placeholder='Expected life date'
            value={newExpectedLife}
            onChange={(e) => setNewExpectedLife(e.target.value)}
          />
          <div className='checkbox'>
            <button className='submit-button' onClick={createType}>
              Save
            </button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Expected life date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {typeList.map((type) => (
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.expectedLife}</td>
              <td>
                <button
                  className='edit-button'
                  onClick={() => updateType(type.id, type.expectedLife)}
                >
                  Increase Day
                </button>
                <button
                  className='delete-button'
                  onClick={() => deleteType(type.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Add;
