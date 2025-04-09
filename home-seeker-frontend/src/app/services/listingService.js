
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Handles common fetch logic, checks response status, and parses JSON.
 * Throws an error for non-OK responses.
 * @param {Response} response - The fetch Response object.
 * @returns {Promise<any>} - The parsed JSON response body or null.
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Could not read error body'); // Try to get more info
        const error = new Error(`HTTP error! Status: ${response.status}, Message: ${errorBody}`);
        error.status = response.status;
        console.error("API Error:", error); // Log detailed error
        throw error; // Throw error to be caught by the caller
    }
    // Handle cases where response might be OK but have no content (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json(); // Parse JSON only if header indicates it
    }
    return null; // Return null or appropriate value for non-JSON responses (like PUT success)
};

/**
 * Fetches unassessed listings.
 * @returns {Promise<Array>} - A promise that resolves to an array of listings.
 */
export const fetchUnassessedListings = async () => {
    console.log("Service: Fetching unassessed listings...");
    const response = await fetch(`${API_BASE_URL}/listings/unassessed`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return handleResponse(response);
};

/**
 * Fetches interested listings ('I').
 * @returns {Promise<Array>} - A promise that resolves to an array of listings.
 */
export const fetchInterestedListings = async () => {
    console.log("Service: Fetching interested listings (I)...");
    const response = await fetch(`${API_BASE_URL}/listings/I`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return handleResponse(response);
};

/**
 * Fetches not interested listings ('N').
 * @returns {Promise<Array>} - A promise that resolves to an array of listings.
 */
export const fetchNotInterestedListings = async () => {
    console.log("Service: Fetching not interested listings (N)...");
    const response = await fetch(`${API_BASE_URL}/listings/N`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return handleResponse(response);
};

/**
 * Fetches maybe listings ('M').
 * @returns {Promise<Array>} - A promise that resolves to an array of listings.
 */
export const fetchMaybeListings = async () => {
    console.log("Service: Fetching maybe listings (M)...");
    const response = await fetch(`${API_BASE_URL}/listings/M`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    return handleResponse(response);
};

/**
 * Updates a listing via PUT request, sending the full object.
 * Handles null values for assessment and notes for reset functionality.
 * @param {object} listingToUpdate - The original listing object.
 * @param {string|null} newAssessment - The new assessment value ('I', 'N', 'M', or null).
 * @param {string|null} newNotes - The new notes string or null.
 * @returns {Promise<null>} - A promise that resolves on success (or null for non-JSON response).
 */
export const updateListing = async (listingToUpdate, newAssessment, newNotes) => {
    if (!listingToUpdate || !listingToUpdate.listingId) {
        console.error("updateListing called with invalid listing object", listingToUpdate);
        throw new Error("Invalid listing data provided to updateListing service.");
    }

    const { listingId } = listingToUpdate;
    console.log(`Service: Updating listing ${listingId} with assessment=${newAssessment}, notes=${newNotes}`);

    const updatedListingPayload = {
        ...listingToUpdate,
        assessment: newAssessment, // Will be null if newAssessment is null
        notes: newNotes            // Will be null if newNotes is null
    };

    const response = await fetch(`${API_BASE_URL}/listings/${listingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(updatedListingPayload),
    });
    // handleResponse will throw an error if the request fails
    return handleResponse(response);
};