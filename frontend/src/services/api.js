import axios from 'axios';

// The base URL of your Python backend
const API_URL = 'http://localhost:5000/api';

/**
 * Sends a user's message to the backend and returns the bot's response.
 * @param {string} message The message from the user.
 * @returns {Promise<object>} The JSON response from the backend.
 */
export const sendMessage = async (message) => {
  try {
    // We send a POST request to the /chat endpoint
    const response = await axios.post(`${API_URL}/chat`, {
      message: message, // The payload only needs the message
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to bot:', error);
    // Throw an error so the component knows the API call failed
    throw error;
  }
};
