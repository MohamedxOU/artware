"use client";
import { useState, useEffect } from 'react';
import { getAllCells, getUserCells, joinCell, quitCell } from '@/api/cells';
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
        
        // Step 1: Get all cells
        const allCellsResponse = await getAllCells();
        console.log('All cells response:', allCellsResponse);
        
        // Step 2: Get user cells if user ID is available
        let userCellsResponse = { cells: [] };
        if (currentUser?.user_id) {
          try {
            console.log('Fetching user cells for ID:', currentUser.user_id);
            userCellsResponse = await getUserCells(currentUser.user_id);
            console.log('User cells response:', userCellsResponse);
            setUserCells(userCellsResponse.cells);
          } catch (userCellsError) {
            console.warn('Failed to fetch user cells:', userCellsError);
          }
        } else {
          console.warn('No user ID available, skipping user cells fetch');
        }
        
        // Step 3: Compare IDs and mark cells where user is member
        const cellsWithMembership = allCellsResponse.cells.map((cell, index) => {
          // Check if this cell ID exists in user cells
          let isMember = false;
          for (let i = 0; i < userCellsResponse.cells.length; i++) {
            if (userCellsResponse.cells[i].id === cell.id) {
              isMember = true;
              console.log(`✅ User IS member of cell ${cell.id} (${cell.name})`);
              break;
            }
          }
          if (!isMember) {
            console.log(`❌ User is NOT member of cell ${cell.id} (${cell.name})`);
          }
          
          return {
            ...cell,
            color: getColorByIndex(index),
            isMember: isMember  // Add this flag
          };
        });
        
        console.log('Final cells with membership:', cellsWithMembership);
        setAllCells(cellsWithMembership);
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

    // Confirmation alert
    const confirmJoin = window.confirm(`Êtes-vous sûr de vouloir rejoindre la cellule "${cellName}" ?`);
    if (!confirmJoin) {
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
            ? { ...cell, isMember: true }
            : cell
        )
      );
      
      // Also update userCells state
      const cellToAdd = allCells.find(cell => cell.id === cellId);
      if (cellToAdd) {
        setUserCells(prevUserCells => [...prevUserCells, cellToAdd]);
      }
      
      console.log(`✅ Successfully joined cell ${cellId}`);
      alert(`Vous avez rejoint la cellule "${cellName}" avec succès !`);
    } catch (error) {
      console.error('Failed to join cell:', error);
      alert(`Erreur lors de l'adhésion à la cellule: ${error.message}`);
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

    // Confirmation alert
    const confirmQuit = window.confirm(`Êtes-vous sûr de vouloir quitter la cellule "${cellName}" ?`);
    if (!confirmQuit) {
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
            ? { ...cell, isMember: false }
            : cell
        )
      );
      
      // Remove from userCells state
      setUserCells(prevUserCells => 
        prevUserCells.filter(cell => cell.id !== cellId)
      );
      
      console.log(`✅ Successfully quit cell ${cellId}`);
      alert(`Vous avez quitté la cellule "${cellName}" avec succès !`);
    } catch (error) {
      console.error('Failed to quit cell:', error);
      alert(`Erreur lors de la sortie de la cellule: ${error.message}`);
    } finally {
      setQuittingCell(null);
    }
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
          <p className="text-base-content/60">Chargement des cellules...</p>
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
          <h3 className="text-xl font-semibold text-base-content mb-2">Erreur de chargement</h3>
          <p className="text-base-content/60 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-lg text-sm font-medium transition-colors"
          >
            Réessayer
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
              <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">Cellules</h1>
              <p className="text-base-content/60">
                Découvrez et rejoignez les différentes cellules techniques du club
              </p>
            </div>
            
            {/* Filter Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-base-content/70">Mes cellules uniquement</span>
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
              <div className="text-xs text-base-content/60">Cellules disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {allCells.filter(cell => cell.isMember).length}
              </div>
              <div className="text-xs text-base-content/60">Mes cellules</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cells Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {displayedCells.map((cell) => (
          <div
            key={cell.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            {/* Logos/Images Section */}
            <div className="h-32 bg-gray-50 dark:bg-gray-700 flex items-center justify-center relative">
              {cell.image_cell ? (
                <img 
                  src={cell.image_cell} 
                  alt={cell.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="grid grid-cols-3 gap-2 w-full h-full p-4">
                  {/* Mock logos grid */}
                  <div className="bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{cell.abbreviation}</span>
                  </div>
                  <div className="bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-300 font-bold text-xs">FST</span>
                  </div>
                  <div className="bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">★</span>
                  </div>
                  <div className="bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">ENSA</span>
                  </div>
                  <div className="bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">UI</span>
                  </div>
                  <div className="bg-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">DEV</span>
                  </div>
                </div>
              )}
              
              {/* Member Status Badge */}
              {cell.isMember && (
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Membre
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Group Name */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {cell.name}
              </h3>

              {/* Stats */}
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                  <span>{Math.floor(Math.random() * 50) + 10},6 K membres</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>{Math.floor(Math.random() * 20) + 5} publications par jour</span>
                </div>
              </div>

              {/* Action Button */}
              {cell.isMember ? (
                <button
                  onClick={() => handleQuitCell(cell.id, cell.name)}
                  disabled={quittingCell === cell.id}
                  className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-200"
                >
                  {quittingCell === cell.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full"></div>
                      <span>Sortie en cours...</span>
                    </div>
                  ) : (
                    'Quitter le groupe'
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleJoinCell(cell.id, cell.name)}
                  disabled={joiningCell === cell.id}
                  className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {joiningCell === cell.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Adhésion...</span>
                    </div>
                  ) : (
                    'Rejoindre le groupe'
                  )}
                </button>
              )}
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
          <h3 className="text-xl font-semibold text-base-content mb-2">Aucune cellule trouvée</h3>
          <p className="text-base-content/60">
            {filterJoined 
              ? "Vous n'avez rejoint aucune cellule pour le moment. Explorez les cellules disponibles !" 
              : "Aucune cellule disponible pour le moment."
            }
          </p>
        </div>
      )}
    </div>
  );
}