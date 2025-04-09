// src/ActionModal.js
import React, { useState, useEffect, useRef } from 'react'; // Import useRef

function ActionModal({ isOpen, onClose, onSubmit, listing, actionType }) {
    const [notes, setNotes] = useState('');
    // Create a ref for the textarea element
    const textareaRef = useRef(null);

    // Effect to clear notes and focus the textarea when modal opens
    useEffect(() => {
        if (isOpen) {
            setNotes(''); // Clear previous notes
            // Focus the textarea shortly after the modal becomes visible
            // Use setTimeout to ensure the element is rendered and focusable
            const timer = setTimeout(() => {
                textareaRef.current?.focus(); // Use optional chaining and focus method
            }, 100); // Small delay (adjust if needed)

            // Cleanup function to clear the timer if the modal closes quickly
            return () => clearTimeout(timer);
        }
    }, [isOpen]); // Dependency array includes isOpen

    // Use optional chaining for safety in case listing is briefly null
    const listingId = listing?.listingId;

    // Don't render if not open or essential data is missing
    if (!isOpen || !listing) {
        return null;
    }

    // Handle form submission via button click
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onSubmit(notes); // Submit only the notes; parent (App.js) handles the rest
    };

    // --- Add KeyDown Handler for Enter key ---
    const handleKeyDown = (event) => {
        // Check if Enter key was pressed WITHOUT the Shift key
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent adding a newline character
            // Manually trigger the submit logic (ensure notes state is current)
            onSubmit(notes);
        }
    };

    // Determine modal title based on action type
    const modalTitle = actionType === 'approve'
        ? `Reason for Approving Listing: ${listingId}`
        : `Reason for Rejecting Listing: ${listingId}`;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{modalTitle}</h3>
                {/* We use the form's onSubmit for the button click */}
                <form onSubmit={handleSubmit}>
          <textarea
              ref={textareaRef} // Attach the ref here
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onKeyDown={handleKeyDown} // Add the keydown listener here
              placeholder="Enter notes here..."
              rows="4"
              required // Notes are required for approve/reject actions
              style={{ width: '100%', boxSizing: 'border-box', marginBottom: '20px' }} // Ensure full width & spacing
              // autoFocus prop can sometimes be unreliable depending on render timing,
              // using ref and useEffect provides more control. Remove autoFocus if added previously.
              // autoFocus
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