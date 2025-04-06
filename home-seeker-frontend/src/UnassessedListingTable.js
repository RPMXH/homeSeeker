import React from 'react';

// Define the order of columns for Unassessed Listings
const columnOrder = [
    "listingId",
    // "assessment" is hidden
    // "notes" is hidden
    "price",
    "listingLink",
    "source", // Show source for unassessed
    "Actions"
];

// Helper to format header text
const formatHeader = (key) => {
    if (key === 'listingId') return 'Listing ID';
    if (key === 'listingLink') return 'Link';
    return key.charAt(0).toUpperCase() + key.slice(1);
};

// Removed 'title' from props
function UnassessedListingTable({listings, onApprove, onReject, onDuplicate, onResetAssessment}) {
    // Display message if no listings
    if (!listings || listings.length === 0) {
        return (
            // Removed h2 title
            <p>No records found.</p>
        );
    }

    const headers = columnOrder;

    return (
        // Removed outer div and h2 title
        <table className="listing-table">
            <thead>
            <tr>
                {/* Add classNames to headers */}
                {headers.map(header => (
                    <th key={header} className={`${header.toLowerCase()}-column`}>{formatHeader(header)}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {/* Map through listings */}
            {listings.map((listing) => (
                <tr key={listing.listingId}>
                    {/* Add matching classNames to cells */}
                    {headers.map(headerKey => {
                        const cellClassName = `${headerKey.toLowerCase()}-column`;
                        // Actions column
                        if (headerKey === "Actions") {
                            return (
                                <td key={`${listing.listingId}-actions`} className="actions-cell">
                                    <button onClick={() => onApprove(listing)} title="Approve">✔️</button>
                                    <button onClick={() => onReject(listing)} title="Reject">❌</button>
                                    <button onClick={() => onDuplicate(listing)} title="Mark as Duplicate">♊</button>
                                    <button onClick={() => onResetAssessment(listing)} title="Reset Assessment">🔄
                                    </button>
                                </td>
                            );
                        }
                        // Link column
                        if (headerKey === "listingLink") {
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
                        // Standard data cell
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

export default UnassessedListingTable;