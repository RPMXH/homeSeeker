import React, { useState, useEffect, useCallback } from 'react';
import AssessedListingTable from './components/AssessedListingTable';
import UnassessedListingTable from './components/UnassessedListingTable';
import ActionModal from './components/ActionModal';
import {
    fetchUnassessedListings,
    fetchInterestedListings,
    fetchNotInterestedListings,
    fetchMaybeListings,
    updateListing
} from './services/listingService';
import './App.css';

function App() {
    // State for listings in all categories
    const [unassessedListings, setUnassessedListings] = useState([]);
    const [interestedListings, setInterestedListings] = useState([]);
    const [notInterestedListings, setNotInterestedListings] = useState([]);
    const [maybeListings, setMaybeListings] = useState([]);

    // State for loading, errors, and modal
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ listing: null, actionType: null });

    // State for active tab
    const [activeTab, setActiveTab] = useState('unassessed'); // Default tab

    // Fetches data for all tabs using the service
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null); // Clear previous errors on new fetch
        console.log("App: Fetching data for ALL tabs...");
        try {
            // Use Promise.all with imported service functions
            const [unassessedData, interestedData, notInterestedData, maybeData] = await Promise.all([
                fetchUnassessedListings(),
                fetchInterestedListings(),
                fetchNotInterestedListings(),
                fetchMaybeListings()
            ]);

            // Update state for all categories
            setUnassessedListings(unassessedData);
            setInterestedListings(interestedData);
            setNotInterestedListings(notInterestedData);
            setMaybeListings(maybeData);

            console.log("App: Data fetched successfully for all tabs.");

        } catch (err) {
            // Errors thrown by the service will be caught here
            console.error("App: Error fetching data:", err);
            setError(`Failed to fetch listings: ${err.message}`);
            // Clear all lists on error
            setUnassessedListings([]);
            setInterestedListings([]);
            setNotInterestedListings([]);
            setMaybeListings([]);
        } finally {
            setLoading(false);
        }
    }, []); // useCallback dependency is empty

    // Fetch initial data on component mount
    useEffect(() => {
        fetchData();
    }, [fetchData]); // useEffect depends on fetchData

    // --- Action Handlers ---

    // Opens modal for approval ('I')
    const handleApproveClick = (listing) => {
        setModalData({ listing: listing, actionType: 'approve' });
        setIsModalOpen(true);
    };

    // Opens modal for rejection ('N')
    const handleRejectClick = (listing) => {
        setModalData({ listing: listing, actionType: 'reject' });
        setIsModalOpen(true);
    };

    // Marks as rejected ('N', notes='just nope') without modal
    const handleJustNope = async (listing) => {
        console.log(`App: Handling just nope click for ${listing.listingId}`);
        setError(null); // Clear previous errors
        try {
            await updateListing(listing, 'N', 'just nope'); // Call service directly
            console.log(`App: Just Nope update successful for ${listing.listingId}. Refreshing data...`);
            fetchData(); // Refresh data on success
        } catch (err) {
            console.error(`App: Error handling Just Nope click for ${listing.listingId}:`, err);
            setError(`Failed to mark listing ${listing.listingId} as Just Nope: ${err.message}`);
        }
    };

    // Marks as duplicate ('N', notes='duplicado') without modal
    const handleDuplicateClick = async (listing) => {
        console.log(`App: Handling duplicate click for ${listing.listingId}`);
        setError(null); // Clear previous errors
        try {
            await updateListing(listing, 'N', 'duplicado'); // Call service directly
            console.log(`App: Duplicate update successful for ${listing.listingId}. Refreshing data...`);
            fetchData(); // Refresh data on success
        } catch (err) {
            console.error(`App: Error handling duplicate click for ${listing.listingId}:`, err);
            setError(`Failed to mark listing ${listing.listingId} as duplicate: ${err.message}`);
        }
    };

    // Handles modal form submission (Approve -> 'I', Reject -> 'N')
    const handleModalSubmit = async (notes) => {
        const { listing, actionType } = modalData;

        if (!listing || !actionType) {
            console.error("App: handleModalSubmit called with invalid modal state");
            setError("Failed to update listing: Modal data missing.");
            setIsModalOpen(false);
            setModalData({ listing: null, actionType: null });
            return;
        };

        console.log(`App: Handling modal submit for ${listing.listingId}, action: ${actionType}`);
        setError(null); // Clear previous errors
        const assessment = actionType === 'approve' ? 'I' : 'N';

        try {
            await updateListing(listing, assessment, notes); // Call service directly
            console.log(`App: Modal update successful for ${listing.listingId}. Refreshing data...`);
            fetchData(); // Refresh data on success
            setIsModalOpen(false); // Close modal on success
            setModalData({ listing: null, actionType: null }); // Reset state on success
        } catch (err) {
            console.error(`App: Error handling modal submit for ${listing.listingId}:`, err);
            setError(`Failed to update listing ${listing.listingId}: ${err.message}`);
            // Close modal even on error
            setIsModalOpen(false);
            setModalData({ listing: null, actionType: null });
        }
    };

    // Closes the modal
    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalData({ listing: null, actionType: null });
    };

    // Resets assessment and notes to null without modal
    const handleResetAssessmentClick = async (listing) => {
        console.log(`App: Handling reset assessment click for ${listing.listingId}`);
        setError(null); // Clear previous errors

        // Optional Confirmation:
        // const confirmReset = window.confirm(`Reset assessment for listing ${listing.listingId}?`);
        // if (!confirmReset) return;

        try {
            // Call updateListing service with null for assessment and notes
            await updateListing(listing, null, null);
            console.log(`App: Reset update successful for ${listing.listingId}. Refreshing data...`);
            fetchData(); // Refresh data on success
        } catch (err) {
            console.error(`App: Error handling reset assessment click for ${listing.listingId}:`, err);
            setError(`Failed to reset assessment for listing ${listing.listingId}: ${err.message}`);
        }
    };


    // Renders the appropriate table based on the active tab
    const renderTabContent = () => {
        if (loading) {
            return <p>Loading listings...</p>;
        }
        // Display error within the content area if it exists
        if (error) {
            return <p className="error-message">{error}</p>;
        }

        switch (activeTab) {
            case 'unassessed':
                return (
                    <UnassessedListingTable
                        // title prop removed
                        listings={unassessedListings}
                        onApprove={handleApproveClick}
                        onReject={handleRejectClick}
                        onDuplicate={handleDuplicateClick}
                        onJustNope={handleJustNope}
                        onResetAssessment={handleResetAssessmentClick}
                    />
                );
            case 'I':
                return (
                    <AssessedListingTable
                        // title prop removed
                        listings={interestedListings}
                        onApprove={handleApproveClick}
                        onReject={handleRejectClick}
                        onDuplicate={handleDuplicateClick}
                        onJustNope={handleJustNope}
                        onResetAssessment={handleResetAssessmentClick}
                    />
                );
            case 'N':
                return (
                    <AssessedListingTable
                        // title prop removed
                        listings={notInterestedListings}
                        onApprove={handleApproveClick}
                        onReject={handleRejectClick}
                        onDuplicate={handleDuplicateClick}
                        onJustNope={handleJustNope}
                        onResetAssessment={handleResetAssessmentClick}
                    />
                );
            case 'M':
                return (
                    <AssessedListingTable
                        // title prop removed
                        listings={maybeListings}
                        onApprove={handleApproveClick}
                        onReject={handleRejectClick}
                        onDuplicate={handleDuplicateClick}
                        onJustNope={handleJustNope}
                        onResetAssessment={handleResetAssessmentClick}
                    />
                );
            default:
                return <p>Invalid tab selected.</p>;
        }
    };

    // Main component render structure
    return (
        <div className="app-wrapper">
            <h1>Listing Assessment Tool</h1>

            {/* Tab Navigation Bar */}
            <nav className="tab-nav">
                <button
                    className={`tab-button ${activeTab === 'unassessed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('unassessed')}
                    disabled={loading} // Disable tabs while loading
                >
                    Unassessed ({unassessedListings.length})
                </button>
                <button
                    className={`tab-button ${activeTab === 'I' ? 'active' : ''}`}
                    onClick={() => setActiveTab('I')}
                    disabled={loading}
                >
                    Interested (I) ({interestedListings.length})
                </button>
                <button
                    className={`tab-button ${activeTab === 'N' ? 'active' : ''}`}
                    onClick={() => setActiveTab('N')}
                    disabled={loading}
                >
                    Not Interested (N) ({notInterestedListings.length})
                </button>
                {/*<button*/}
                {/*    className={`tab-button ${activeTab === 'M' ? 'active' : ''}`}*/}
                {/*    onClick={() => setActiveTab('M')}*/}
                {/*    disabled={loading}*/}
                {/*>*/}
                {/*    Maybe (M) ({maybeListings.length})*/}
                {/*</button>*/}
            </nav>

            {/* Content Area for the Active Tab */}
            <main className="tab-content">
                {renderTabContent()}
            </main>

            {/* Modal Component (rendered conditionally) */}
            {isModalOpen && modalData.listing && (
                <ActionModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit} // onSubmit expects only notes
                    listing={modalData.listing} // Pass the full listing object
                    actionType={modalData.actionType}
                />
            )}
        </div>
    );
}

export default App;