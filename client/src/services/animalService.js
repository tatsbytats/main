import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/animals`;

// Get all animals
export const getAnimals = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
};

// Get single animal by ID
export const getAnimalById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching animal with ID ${id}:`, error);
    throw error;
  }
};

// Create new animal
export const createAnimal = async (animalData) => {
  try {
    const response = await axios.post(BASE_URL, animalData);
    return response.data;
  } catch (error) {
    console.error('Error creating animal:', error);
    throw error;
  }
};

// Update animal
export const updateAnimal = async (id, animalData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, animalData);
    return response.data;
  } catch (error) {
    console.error(`Error updating animal with ID ${id}:`, error);
    throw error;
  }
};

// Delete animal
export const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting animal with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};
