import React from 'react';

// --- Removed "assessment" from columnOrder ---
const columnOrder = [
    "listingId",
    // "assessment", // Removed
    "notes",
    "price",
    "listingLink",
    // "source" is hidden
    "Actions"
];

// Helper to format header text
const formatHeader = (key) => {
    if (key === 'listingId') return 'Listing ID';
    if (key === 'listingLink') return 'Link';
    // Simple capitalization for others
    return key.charAt(0).toUpperCase() + key.slice(1);
};

// Props remain the same (title was already removed)
function AssessedListingTable({ listings, onApprove, onReject, onDuplicate, onResetAssessment }) {
    // Display message if no listings
    if (!listings || listings.length === 0) {
        return (
            <p>No records found.</p>
        );
    }

    const headers = columnOrder; // Now uses the updated columnOrder

    return (
        // Table structure remains, but rendering will skip the assessment column
        <table className="listing-table">
            <thead>
            <tr>
                {/* Add classNames to headers */}
                {headers.map(header => (
                    // The loop automatically skips 'assessment' header now
                    <th key={header} className={`${header.toLowerCase()}-column`}>{formatHeader(header)}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {/* Map through listings to create table rows */}
            {listings.map((listing) => (
                <tr key={listing.listingId}>
                    {/* Add matching classNames to cells */}
                    {headers.map(headerKey => {
                        // The loop automatically skips 'assessment' cell now
                        const cellClassName = `${headerKey.toLowerCase()}-column`;
                        // Special handling for the Actions column
                        if (headerKey === "Actions") {
                            return (
                                // Use existing actions-cell class
                                <td key={`${listing.listingId}-actions`} className="actions-cell">
                                    <button onClick={() => onApprove(listing)} title="Approve">✔️</button>
                                    <button onClick={() => onReject(listing)} title="Reject">❌</button>
                                    <button onClick={() => onDuplicate(listing)} title="Mark as Duplicate">♊</button>
                                    <button onClick={() => onResetAssessment(listing)} title="Reset Assessment">🔄</button>
                                </td>
                            );
                        }
                        // Special handling for the listing link
                        if (headerKey === "listingLink") {
                            // Ensure the link exists before creating an anchor tag
                            const link = listing[headerKey];
                            return (
                                <td key={`${listing.listingId}-${headerKey}`} className={cellClassName}>
                                    {link ? (
                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                            {link}
                                        </a>
                                    ) : ''}
                                </td>
                            )
                        }
                        // Render standard data cell for other columns
                        return (
                            <td key={`${listing.listingId}-${headerKey}`} className={cellClassName}>
                                {/* Display the value, converting null/undefined to empty string */}
                                {listing[headerKey] !== null && listing[headerKey] !== undefined ? String(listing[headerKey]) : ''}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default AssessedListingTable;