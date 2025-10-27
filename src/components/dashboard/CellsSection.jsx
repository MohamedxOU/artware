"use client";
import { useState, useEffect } from 'react';
import { getAllCells, getUserCells, joinCell, quitCell, getCellEvents } from '@/api/cells';
import useAuthStore from '@/stores/authStore';

export default function CellsSection({ user }) {
  // Get user from auth store as fallback
  const authUser = useAuthStore(state => state.user);
  const currentUser = user || authUser;
  
  const [filterJoined, setFilterJoined] = useState(false);
  const [allCells, setAllCells] = useState([]);
  const [userCells, setUserCells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningCell, setJoiningCell] = useState(null); // Track which cell is being joined
  const [quittingCell, setQuittingCell] = useState(null); // Track which cell is being quit
  const [selectedCell, setSelectedCell] = useState(null); // Track selected cell for events modal
  const [cellEvents, setCellEvents] = useState([]); // Store events for selected cell
  const [loadingEvents, setLoadingEvents] = useState(false); // Loading state for events

  // Add debugging
  useEffect(() => {
    console.log('CellsSection Debug Info:');
    console.log('- user prop:', user);
    console.log('- authUser:', authUser);
    console.log('- currentUser:', currentUser);
    console.log('- currentUser.user_id:', currentUser?.user_id);
  }, [user, authUser, currentUser]);

  // Fetch cells from API
  useEffect(() => {
    const fetchCells = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching cells for user:', currentUser?.user_id);
        
        // Get all cells with membership info
        const allCellsResponse = await getAllCells();
        console.log('All cells response:', allCellsResponse);
        
        // Map cells with color and use isInCell from API
        const cellsWithColor = allCellsResponse.cells.map((cell, index) => ({
          ...cell,
          color: getColorByIndex(index),
          isMember: cell.isInCell // Use the isInCell field from API
        }));
        
        console.log('Final cells with membership:', cellsWithColor);
        setAllCells(cellsWithColor);
        
        // Set user cells for stats
        const userCellsList = cellsWithColor.filter(cell => cell.isMember);
        setUserCells(userCellsList);
      } catch (err) {
        console.error('Failed to fetch cells:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCells();
  }, [currentUser?.user_id]);

  // Handle joining a cell
  const handleJoinCell = async (cellId, cellName) => {
    if (!currentUser?.user_id) {
      console.warn('No user ID available for joining cell');
      return;
    }

    try {
      setJoiningCell(cellId);
      console.log(`Attempting to join cell ${cellId}`);
      
      const result = await joinCell(cellId);
      console.log('Join cell result:', result);
      
      // Update the cell's membership status locally
      setAllCells(prevCells => 
        prevCells.map(cell => 
          cell.id === cellId 
            ? { ...cell, isMember: true, isInCell: true }
            : cell
        )
      );
      
      // Update userCells state
      const cellToAdd = allCells.find(cell => cell.id === cellId);
      if (cellToAdd) {
        setUserCells(prevUserCells => [...prevUserCells, { ...cellToAdd, isMember: true }]);
      }
      
      console.log(`✅ Successfully joined cell ${cellId}`);
      alert(`You have successfully joined the cell "${cellName}"!`);
    } catch (error) {
      console.error('Failed to join cell:', error);
      alert(`Error joining cell: ${error.message}`);
    } finally {
      setJoiningCell(null);
    }
  };

  // Handle quitting a cell
  const handleQuitCell = async (cellId, cellName) => {
    if (!currentUser?.user_id) {
      console.warn('No user ID available for quitting cell');
      return;
    }

    try {
      setQuittingCell(cellId);
      console.log(`Attempting to quit cell ${cellId}`);
      
      const result = await quitCell(cellId);
      console.log('Quit cell result:', result);
      
      // Update the cell's membership status locally
      setAllCells(prevCells => 
        prevCells.map(cell => 
          cell.id === cellId 
            ? { ...cell, isMember: false, isInCell: false }
            : cell
        )
      );
      
      // Remove from userCells state
      setUserCells(prevUserCells => 
        prevUserCells.filter(cell => cell.id !== cellId)
      );
      
      console.log(`✅ Successfully quit cell ${cellId}`);
      alert(`You have successfully left the cell "${cellName}"!`);
    } catch (error) {
      console.error('Failed to quit cell:', error);
      alert(`Error leaving cell: ${error.message}`);
    } finally {
      setQuittingCell(null);
    }
  };

  // Handle showing events for a cell
  const handleShowEvents = async (cellName) => {
    try {
      setLoadingEvents(true);
      setSelectedCell(cellName);
      console.log(`Fetching events for cell: ${cellName}`);
      
      const response = await getCellEvents(cellName);
      console.log('Cell events response:', response);
      
      setCellEvents(response.events || []);
    } catch (error) {
      console.error('Failed to fetch cell events:', error);
      alert(`Error loading events: ${error.message}`);
      setSelectedCell(null);
    } finally {
      setLoadingEvents(false);
    }
  };

  // Close events modal
  const closeEventsModal = () => {
    setSelectedCell(null);
    setCellEvents([]);
  };

  // Helper function to assign colors cyclically
  const getColorByIndex = (index) => {
    const colors = ['blue', 'purple', 'green', 'red', 'orange', 'pink'];
    return colors[index % colors.length];
  };

  const displayedCells = filterJoined 
    ? allCells.filter(cell => cell.isMember) 
    : allCells;

  const getColorClasses = (color, isJoined) => {
    const baseClasses = {
      blue: isJoined 
        ? "bg-blue-50/80 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" 
        : "bg-blue-50/40 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900",
      purple: isJoined 
        ? "bg-purple-50/80 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800" 
        : "bg-purple-50/40 border-purple-100 dark:bg-purple-900/10 dark:border-purple-900",
      green: isJoined 
        ? "bg-green-50/80 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
        : "bg-green-50/40 border-green-100 dark:bg-green-900/10 dark:border-green-900",
      red: isJoined 
        ? "bg-red-50/80 border-red-200 dark:bg-red-900/20 dark:border-red-800" 
        : "bg-red-50/40 border-red-100 dark:bg-red-900/10 dark:border-red-900",
      orange: isJoined 
        ? "bg-orange-50/80 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800" 
        : "bg-orange-50/40 border-orange-100 dark:bg-orange-900/10 dark:border-orange-900",
      pink: isJoined 
        ? "bg-pink-50/80 border-pink-200 dark:bg-pink-900/20 dark:border-pink-800" 
        : "bg-pink-50/40 border-pink-100 dark:bg-pink-900/10 dark:border-pink-900"
    };
    return baseClasses[color] || baseClasses.blue;
  };

  const getBadgeColor = (color) => {
    const colors = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500", 
      red: "bg-red-500",
      orange: "bg-orange-500",
      pink: "bg-pink-500"
    };
    return colors[color] || "bg-blue-500";
  };

  const getButtonClasses = (color, isJoined) => {
    if (isJoined) {
      return "hidden"; // Hide button if user is already a member
    }
    
    const buttonClasses = {
      blue: "bg-blue-500 hover:bg-blue-600 text-white",
      purple: "bg-purple-500 hover:bg-purple-600 text-white",
      green: "bg-green-500 hover:bg-green-600 text-white",
      red: "bg-red-500 hover:bg-red-600 text-white", 
      orange: "bg-orange-500 hover:bg-orange-600 text-white",
      pink: "bg-pink-500 hover:bg-pink-600 text-white"
    };
    
    return `w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${buttonClasses[color] || buttonClasses.blue}`;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto relative min-h-full">
        <div className="backdrop-blur-sm bg-base-100/70 rounded-2xl p-8 text-center border border-base-300/30 shadow-sm relative z-10">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-base-content/60">Loading cells...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto relative min-h-full">
        <div className="backdrop-blur-sm bg-base-100/70 rounded-2xl p-8 text-center border border-base-300/30 shadow-sm relative z-10">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">Loading Error</h3>
          <p className="text-base-content/60 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-lg text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto relative min-h-full">
      {/* Header */}
      <div className="mb-6 relative z-10">
        <div className="backdrop-blur-sm bg-base-100/70 rounded-2xl p-4 lg:p-6 border border-base-300/30 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">Cells</h1>
              <p className="text-base-content/60">
                Discover and join the club's various technical cells
              </p>
            </div>
            
            {/* Filter Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-base-content/70">My cells only</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={filterJoined}
                onChange={(e) => setFilterJoined(e.target.checked)}
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex gap-6 mt-4 pt-4 border-t border-base-300/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{allCells.length}</div>
              <div className="text-xs text-base-content/60">Available cells</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {allCells.filter(cell => cell.isMember).length}
              </div>
              <div className="text-xs text-base-content/60">My cells</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cells Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {displayedCells.map((cell) => (
          <div
            key={cell.id}
            className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              {cell.image_cell ? (
                <>
                  <img 
                    src={cell.image_cell} 
                    alt={cell.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="relative h-[420px] flex flex-col justify-between p-6">
              {/* Top Section - Badge */}
              <div className="flex justify-between items-start">
                {cell.isMember && (
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Member
                  </div>
                )}
              </div>

              {/* Center - Logo/Icon if no image */}
              {!cell.image_cell && (
                <div className="flex justify-center items-center flex-1">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30">
                    <span className="text-white font-bold text-5xl">{cell.abbreviation}</span>
                  </div>
                </div>
              )}

              {/* Bottom Section - Info */}
              <div className="space-y-4">
                {/* Cell Name */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {cell.name}
                    </h3>
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Abbreviation Badge */}
                  <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold rounded-md">
                    {cell.abbreviation}
                  </span>
                </div>

                {/* Domain/Description */}
                <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">
                  {cell.domain}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {/* Show Events Button */}
                  <button
                    onClick={() => handleShowEvents(cell.abbreviation)}
                    className="cursor-target w-full py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View events
                  </button>

                  {/* Join/Quit Button */}
                  {cell.isMember ? (
                    <button
                      onClick={() => handleQuitCell(cell.id, cell.name)}
                      disabled={quittingCell === cell.id}
                      className="cursor-target w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {quittingCell === cell.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Leaving...</span>
                        </div>
                      ) : (
                        'Leave cell'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinCell(cell.id, cell.name)}
                      disabled={joiningCell === cell.id}
                      className="cursor-target w-full py-3 bg-white/90 hover:bg-white text-gray-900 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md shadow-lg"
                    >
                      {joiningCell === cell.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full"></div>
                          <span>Joining...</span>
                        </div>
                      ) : (
                        'Join cell'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {displayedCells.length === 0 && (
        <div className="backdrop-blur-sm bg-base-100/70 rounded-2xl p-8 text-center border border-base-300/30 shadow-sm relative z-10">
          <div className="w-16 h-16 bg-base-content/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">No cells found</h3>
          <p className="text-base-content/60">
            {filterJoined 
              ? "You haven't joined any cells yet. Explore the available cells!" 
              : "No cells available at the moment."
            }
          </p>
        </div>
      )}

      {/* Events Modal */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-primary/10 border-b border-base-300/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-base-content mb-1">
                    Events - {selectedCell}
                  </h2>
                  <p className="text-base-content/60 text-sm">
                    {cellEvents.length} event{cellEvents.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <button
                  onClick={closeEventsModal}
                  className="btn btn-circle btn-ghost hover:bg-base-300/50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {loadingEvents ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                  <p className="text-base-content/60">Loading events...</p>
                </div>
              ) : cellEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-base-content/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-base-content mb-2">No events</h3>
                  <p className="text-base-content/60">
                    This cell has no scheduled events at the moment.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cellEvents.map((event, index) => (
                    <div
                      key={event.id || index}
                      onClick={() => event.id && window.open(`/event/${event.id}`, '_blank')}
                      className="border border-base-300/50 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200 bg-base-100 cursor-pointer hover:border-primary/50"
                    >
                      <div className="flex items-start gap-4">
                        {/* Event Icon/Image */}
                        {event.image_url ? (
                          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                            <img 
                              src={event.image_url} 
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}

                        {/* Event Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-lg font-bold text-base-content">
                              {event.title || 'Untitled'}
                            </h3>
                            {/* Type Badge */}
                            {event.type && (
                              <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium capitalize">
                                {event.type === 'training' ? 'Training' : 
                                 event.type === 'workshop' ? 'Workshop' : 
                                 event.type === 'competition' ? 'Competition' : 
                                 event.type}
                              </span>
                            )}
                          </div>
                          
                          {event.description && (
                            <p className="text-base-content/70 text-sm mb-3">
                              {event.description}
                            </p>
                          )}

                          {/* Responsable */}
                          {event.responsable && (
                            <div className="flex items-center gap-1.5 text-base-content/60 text-sm mb-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>Organizer: {event.responsable}</span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-3 text-sm">
                            {/* Date */}
                            {event.date && (
                              <div className="flex items-center gap-1.5 text-base-content/60">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{new Date(event.date).toLocaleDateString('fr-FR', { 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}</span>
                              </div>
                            )}

                            {/* Time */}
                            {(event.time_start || event.time_end) && (
                              <div className="flex items-center gap-1.5 text-base-content/60">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                  {event.time_start && event.time_start.substring(0, 5)}
                                  {event.time_start && event.time_end && ' - '}
                                  {event.time_end && event.time_end.substring(0, 5)}
                                </span>
                              </div>
                            )}

                            {/* Location */}
                            {event.location && (
                              <div className="flex items-center gap-1.5 text-base-content/60">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-base-300/30 p-4 bg-base-200/50">
              <button
                onClick={closeEventsModal}
                className="btn btn-primary w-full sm:w-auto sm:ml-auto sm:block"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}