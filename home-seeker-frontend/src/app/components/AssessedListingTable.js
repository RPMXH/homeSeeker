import React from 'react';

// Column order remains the same
const columnOrder = [
    "listingId",
    "notes",
    "price",
    "listingLink", // This column's rendering will change
    "Actions"
];

// Helper to format header text
const formatHeader = (key) => {
    if (key === 'listingId') return 'Listing ID';
    if (key === 'listingLink') return 'Link';
    return key.charAt(0).toUpperCase() + key.slice(1);
};

// Props remain the same
function AssessedListingTable({ listings, onApprove, onReject, onDuplicate, onResetAssessment, onJustNope }) {
    if (!listings || listings.length === 0) {
        return ( <p>No records found.</p> );
    }

    const headers = columnOrder;

    return (
        <table className="listing-table">
            <thead>
            <tr>
                {headers.map(header => (
                    <th key={header} className={`${header.toLowerCase()}-column`}>{formatHeader(header)}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {listings.map((listing) => (
                <tr key={listing.listingId}>
                    {headers.map(headerKey => {
                        const cellClassName = `${headerKey.toLowerCase()}-column`;
                        if (headerKey === "Actions") {
                            return (
                                <td key={`${listing.listingId}-actions`} className="actions-cell">
                                    <button onClick={() => onApprove(listing)} title="Approve">✔️</button>
                                    <button onClick={() => onReject(listing)} title="Reject with Reasoning">❌</button>
                                    <button onClick={() => onJustNope(listing)} title="Just Nope">👎</button>
                                    <button onClick={() => onDuplicate(listing)} title="Mark as Duplicate">♊</button>
                                    <button onClick={() => onResetAssessment(listing)} title="Reset Assessment">🔄</button>
                                </td>
                            );
                        }
                        // --- Updated rendering for listingLink ---
                        if (headerKey === "listingLink") {
                            const link = listing[headerKey]; // Get the URL
                            return (
                                <td key={`${listing.listingId}-${headerKey}`} className={cellClassName}>
                                    {/* Check if link exists */}
                                    {link ? (
                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                            Click to Visit Listing {/* Display static text */}
                                        </a>
                                    ) : (
                                        '' // Render nothing if no link
                                    )}
                                </td>
                            )
                        }
                        // --- End of updated rendering ---
                        // Standard cell rendering for other columns
                        return (
                            <td key={`${listing.listingId}-${headerKey}`} className={cellClassName}>
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