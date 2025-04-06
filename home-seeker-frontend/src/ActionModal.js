import React, { useState, useEffect } from 'react';

function ActionModal({ isOpen, onClose, onSubmit, listing, actionType }) {
    const [notes, setNotes] = useState('');

    // Effect to clear notes when modal opens for a new listing/action
    useEffect(() => {
        if (isOpen) {
            setNotes(''); // Clear previous notes
        }
    }, [isOpen]);

    // Use optional chaining for safety in case listing is briefly null
    const listingId = listing?.listingId;

    // Don't render if not open or essential data is missing
    if (!isOpen || !listing) {
        return null;
    }

    // Handle form submission, call the onSubmit prop with notes
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onSubmit(notes); // Submit only the notes; parent (App.js) handles the rest
    };

    // Determine modal title based on action type
    const modalTitle = actionType === 'approve'
        ? `Reason for Approving Listing: ${listingId}`
        : `Reason for Rejecting Listing: ${listingId}`;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{modalTitle}</h3>
                <form onSubmit={handleSubmit}>
          <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter notes here..."
              rows="4"
              required // Notes are required for approve/reject actions
              style={{ width: '100%', boxSizing: 'border-box', marginBottom: '20px' }} // Ensure full width & spacing
              autoFocus // Automatically focus the textarea when modal opens
          />
                    <div className="modal-actions">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ActionModal;