"use client";
import { useState, useMemo, useEffect } from 'react';
import { getAllDocuments } from '@/api/documents';

export default function DocumentsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'name'
  const [selectedField, setSelectedField] = useState('all');
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch documents from API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllDocuments();
        
        // Transform API response to match component format
        const transformedDocuments = response.documents.map((doc) => ({
          id: doc.id,
          title: doc.title,
          file_path: doc.file_path,
          created_at: doc.created_at,
          // Add derived fields for the UI
          type: getFileTypeFromPath(doc.file_path),
          size: "N/A", // Not provided by API
          dateAdded: doc.created_at,
          author: "Unknown", // Not provided by API
          authorImage: "/bureau/Salim.png", // Default image
          field: "general",
          fieldLabel: "Général",
          description: `Document: ${doc.title}`,
          downloads: Math.floor(Math.random() * 200), // Mock downloads since not in API
          tags: [getFileTypeFromPath(doc.file_path)]
        }));
        
        setDocuments(transformedDocuments);
      } catch (err) {
        console.error('Failed to fetch documents:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Helper function to get file type from file path
  const getFileTypeFromPath = (filePath) => {
    const extension = filePath.split('.').pop().toUpperCase();
    switch (extension) {
      case 'PDF': return 'PDF';
      case 'PNG': 
      case 'JPG': 
      case 'JPEG': return 'Image';
      case 'DOC': 
      case 'DOCX': return 'Word';
      case 'PPT': 
      case 'PPTX': return 'PowerPoint';
      default: return 'Document';
    }
  };

  // Helper function to handle file download
  const handleDownload = (doc) => {
    const downloadUrl = `http://localhost:3500/${doc.file_path}`;
    window.open(downloadUrl, '_blank');
  };

  // Helper function to generate random rating (since not in API)
  const getDocumentRating = (docId) => {
    // Generate consistent rating based on document ID
    const seed = docId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Math.floor((seed % 30) + 70); // Rating between 70-99%
  };

  // Calculate fields - must be before conditional returns to maintain hook order
  const fields = useMemo(() => {
    // Calculate fields based on file types from API data
    const typeGroups = {
      'pdf': { value: 'pdf', label: 'PDF', count: 0 },
      'image': { value: 'image', label: 'Images', count: 0 },
      'word': { value: 'word', label: 'Word', count: 0 },
      'powerpoint': { value: 'powerpoint', label: 'PowerPoint', count: 0 },
      'other': { value: 'other', label: 'Autres', count: 0 }
    };

    documents.forEach(doc => {
      const type = doc.type?.toLowerCase() || 'other';
      if (type === 'pdf') typeGroups.pdf.count++;
      else if (type === 'image') typeGroups.image.count++;
      else if (type === 'word') typeGroups.word.count++;
      else if (type === 'powerpoint') typeGroups.powerpoint.count++;
      else typeGroups.other.count++;
    });

    return [
      { value: 'all', label: 'Tous les types', count: documents.length },
      ...Object.values(typeGroups).filter(group => group.count > 0)
    ];
  }, [documents]);

  // Filter and sort documents
  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      const matchesSearch = doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return (a.title || '').localeCompare(b.title || '');
      } else {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
    });
  }, [documents, searchQuery, sortBy]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto relative min-h-full">
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-8 text-center border border-base-300/20 shadow-sm relative z-10">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-base-content/60">Chargement des documents...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto relative min-h-full">
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-8 text-center border border-base-300/20 shadow-sm relative z-10">
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

  const getFileIcon = (type) => {
    switch (type.toUpperCase()) {
      case 'PDF':
        return (
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'IMAGE':
        return (
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'WORD':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'POWERPOINT':
        return (
          <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  // Mock recommended documents
  const recommendedDocuments = [
    {
      id: 'rec-1',
      title: 'Psychologie & Money',
      author: 'Morgan Housel',
      image: '/mock/book-psychology-money.jpg',
      rating: 4.8,
      color: 'bg-green-100'
    },
    {
      id: 'rec-2', 
      title: 'How Innovation Works',
      author: 'Matt Ridley',
      image: '/mock/book-innovation.jpg',
      rating: 4.6,
      color: 'bg-yellow-400'
    },
    {
      id: 'rec-3',
      title: 'Company of One',
      author: 'Paul Jarvis', 
      image: '/mock/book-company-one.jpg',
      rating: 4.7,
      color: 'bg-gray-100'
    },
    {
      id: 'rec-4',
      title: 'Stupore E Tremori',
      author: 'Amélie Nothomb',
      image: '/mock/book-stupore.jpg',
      rating: 4.5,
      color: 'bg-amber-600'
    },
    {
      id: 'rec-5',
      title: 'Company of One',
      author: 'Paul Jarvis',
      image: '/mock/book-company-two.jpg', 
      rating: 4.8,
      color: 'bg-blue-900'
    }
  ];



  return (
    <div className="w-full max-w-7xl mx-auto relative min-h-full">
      {/* Search Bar - Keep at top as requested */}
      <div className="mb-6 relative z-10">
        <div className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
          <div className="relative max-w-md mx-auto">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher des livres..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommandés</h2>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1">
            Voir tout
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Recommended Books Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {recommendedDocuments.map((doc) => (
            <div key={doc.id} className="flex-shrink-0 w-40 cursor-pointer group" onClick={() => handleDownload(doc)}>
              <div className={`${doc.color} rounded-xl p-4 h-52 flex flex-col justify-between relative overflow-hidden mb-3 group-hover:shadow-lg transition-all duration-200`}>
                {doc.id === 'rec-5' ? (
                  // Special card for the blue one (Company of One)
                  <div className="text-white relative z-10">
                    <h3 className="font-bold text-lg mb-1">Company of One</h3>
                    <p className="text-blue-200 text-sm mb-3">Paul Jarvis</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(4)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs ml-1">4.8</span>
                    </div>
                    <div className="text-xs text-blue-200">
                      <div>320 Pages</div>
                      <div>643 Ratings</div>
                      <div>110 Reviews</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-800 relative z-10">
                    <div className="h-full flex flex-col justify-center">
                      <h3 className="font-bold text-base mb-1 leading-tight">{doc.title}</h3>
                      <p className="text-sm opacity-75">{doc.author}</p>
                    </div>
                  </div>
                )}
                
                {/* Book spine effect */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/10"></div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{doc.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{doc.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Documents Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tous les documents</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredAndSortedDocuments.length} document{filteredAndSortedDocuments.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredAndSortedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="cursor-pointer group"
              onClick={() => handleDownload(doc)}
            >
              {/* Book Cover */}
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-3 relative overflow-hidden group-hover:shadow-lg transition-all duration-200">
                {/* Book Cover Design */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 dark:text-white leading-tight">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {doc.author}
                    </p>
                  </div>
                  
                  {/* File Type Badge */}
                  <div className="self-end">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      doc.type === 'PDF' 
                        ? 'bg-red-100 text-red-800' 
                        : doc.type === 'Image'
                        ? 'bg-green-100 text-green-800'
                        : doc.type === 'Word'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {doc.type}
                    </span>
                  </div>
                </div>
                
                {/* Book spine effect */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/10"></div>
              </div>
              
              {/* Book Info */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate mb-1">
                  {doc.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                  {doc.author}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    {((getDocumentRating(doc.id) / 100) * 5).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Empty State */}
      {filteredAndSortedDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucun livre trouvé</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Aucun livre ne correspond à vos critères de recherche.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Réinitialiser la recherche
          </button>
        </div>
      )}
    </div>
  );
}