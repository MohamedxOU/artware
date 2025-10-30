"use client";
import { useState, useMemo, useEffect } from 'react';
import { getAllDocuments, getDocumentsByEvent } from '@/api/documents';
import { getUserAttendedEvents, getUserRegistredEvents } from '@/api/events';
import useAuthStore from '@/stores/authStore';

export default function DocumentsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'name'
  const [selectedField, setSelectedField] = useState('all');
  const [documents, setDocuments] = useState([]);
  const [recommendedDocuments, setRecommendedDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  // Fetch documents from API
  useEffect(() => {
    const fetchDocuments = async () => { 
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all documents
        const response = await getAllDocuments();
        
        // Transform API response to match component format
        const transformedDocuments = response.documents.map((doc) => ({
          id: doc.id,
          title: doc.title,
          file_path: doc.file_path,
          created_at: doc.created_at,
          event_id: doc.event_id,
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

        // Fetch recommended documents from user's events
        if (user?.user_id) {
          await fetchRecommendedDocuments();
        }
      } catch (err) {
        console.error('Failed to fetch documents:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [user?.user_id]);

  // Fetch recommended documents from attended and registered events
  const fetchRecommendedDocuments = async () => {
    try {
      const recommendedDocs = [];
      const processedEventIds = new Set();

      // Priority 1: Attended events
      try {
        const attendedEventsResponse = await getUserAttendedEvents(user.user_id);
        const attendedEvents = attendedEventsResponse.user || [];
        
        // Fetch documents from attended events
        for (const event of attendedEvents.slice(0, 4)) { // Limit to 4 attended events
          if (processedEventIds.has(event.id)) continue;
          processedEventIds.add(event.id);

          try {
            const docsResponse = await getDocumentsByEvent(event.id);
            const eventDocs = docsResponse.events || [];
            
            // Add documents from this event
            eventDocs.forEach(doc => {
              if (recommendedDocs.length < 6) {
                recommendedDocs.push({
                  id: doc.id,
                  title: doc.title,
                  file_path: doc.file_path,
                  type: getFileTypeFromPath(doc.file_path),
                  created_at: doc.created_at,
                  event_id: doc.event_id,
                  eventName: event.title,
                  source: 'attended' // Mark as from attended event
                });
              }
            });

            if (recommendedDocs.length >= 6) break;
          } catch (err) {
            console.warn(`Failed to fetch documents for attended event ${event.id}:`, err);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch attended events:', err);
      }

      // Priority 2: Registered events (if we don't have 6 yet)
      if (recommendedDocs.length < 6) {
        try {
          const registeredEventsResponse = await getUserRegistredEvents(user.user_id);
          const registeredEvents = registeredEventsResponse.user || [];
          
          // Fetch documents from registered events
          for (const event of registeredEvents) {
            if (processedEventIds.has(event.id)) continue;
            if (recommendedDocs.length >= 6) break;
            
            processedEventIds.add(event.id);

            try {
              const docsResponse = await getDocumentsByEvent(event.id);
              const eventDocs = docsResponse.events || [];
              
              // Add documents from this event
              eventDocs.forEach(doc => {
                if (recommendedDocs.length < 6) {
                  recommendedDocs.push({
                    id: doc.id,
                    title: doc.title,
                    file_path: doc.file_path,
                    type: getFileTypeFromPath(doc.file_path),
                    created_at: doc.created_at,
                    event_id: doc.event_id,
                    eventName: event.title,
                    source: 'registered' // Mark as from registered event
                  });
                }
              });
            } catch (err) {
              console.warn(`Failed to fetch documents for registered event ${event.id}:`, err);
            }
          }
        } catch (err) {
          console.warn('Failed to fetch registered events:', err);
        }
      }

      setRecommendedDocuments(recommendedDocs.slice(0, 6)); // Ensure max 6 documents
    } catch (err) {
      console.error('Failed to fetch recommended documents:', err);
    }
  };

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
    // Use the file_path directly as it's already a full URL from Supabase
    window.open(doc.file_path, '_blank');
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
      'other': { value: 'other', label: 'Others', count: 0 }
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
      { value: 'all', label: 'All types', count: documents.length },
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
        <div className="backdrop-blur-sm bg-base-100  rounded-2xl p-8 text-center border border-base-300  shadow-sm relative z-10">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-base-content ">Loading documents...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto relative min-h-full">
        <div className="backdrop-blur-sm bg-base-100  rounded-2xl p-8 text-center border border-base-300  shadow-sm relative z-10">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">Loading Error</h3>
          <p className="text-base-content  mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary hover:bg-primary  text-primary-content rounded-lg text-sm font-medium transition-colors"
          >
            Retry
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

  return (
    <div className="w-full max-w-7xl mx-auto relative min-h-full">
      {/* Search Bar - Keep at top as requested */}
      <div className="mb-6 relative z-10">
        <div className="backdrop-blur-sm bg-base-100  rounded-2xl p-4 border border-base-300 shadow-sm">
          <div className="relative max-w-md mx-auto">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-3 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder-base-content  focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Recommended Section - Only show if there are recommended documents */}
      {recommendedDocuments.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-base-content">
              {recommendedDocuments[0]?.source === 'attended' 
                ? 'Events you have attended'
                : 'Events you are registered for'}
            </h2>
            
          </div>

          {/* Recommended Documents Horizontal Scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {recommendedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="shrink-0 cursor-pointer group cursor-target"
                onClick={() => handleDownload(doc)}
              >
                {/* Document Card - Same design as main documents */}
                <div className="bg-base-100 rounded-lg p-4 border border-base-300 hover:shadow-lg transition-all duration-200 group-hover:border-primary w-40">
                  {/* Source Badge */}
                  {doc.source && (
                    <div className="mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        doc.source === 'attended' 
                          ? 'bg-success  text-success'
                          : 'bg-info  text-info'
                      }`}>
                        {doc.source === 'attended' ? (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Attended
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Registered
                          </>
                        )}
                      </span>
                    </div>
                  )}

                  {/* Document Icon */}
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-16 bg-base-200 rounded-lg flex items-center justify-center relative">
                      {/* File type badge - Default to PDF for recommended */}
                      <div className="absolute -top-2 -right-2 px-2 py-1 rounded text-xs font-bold text-white bg-error">
                        {doc.type === 'Word' ? 'DOC' : doc.type === 'Image' ? 'IMG' : doc.type || 'PDF'}
                      </div>
                      
                      {/* Document icon */}
                      <svg className="w-8 h-8 text-base-content " fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Document Info */}
                  <div className="text-center">
                    <h4 className="font-medium text-base-content text-sm mb-1 line-clamp-2">
                      {doc.title}
                    </h4>
                    {doc.eventName ? (
                      <p className="text-base-content  text-xs line-clamp-1">
                        {doc.eventName}
                      </p>
                    ) : (
                      <p className="text-base-content  text-xs">
                        {formatDate(doc.created_at)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Documents Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-base-content">All Documents</h2>
          <span className="text-sm text-base-content ">
            {filteredAndSortedDocuments.length} document{filteredAndSortedDocuments.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Documents Grid */}
        {filteredAndSortedDocuments.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredAndSortedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="cursor-pointer group cursor-target"
                onClick={() => handleDownload(doc)}
              >
                {/* Document Card */}
                <div className="bg-base-100 rounded-lg p-4 border border-base-300 hover:shadow-lg transition-all duration-200 group-hover:border-primary">
                  {/* Document Icon */}
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-16 bg-base-200 rounded-lg flex items-center justify-center relative">
                      {/* File type badge */}
                      <div className={`absolute -top-2 -right-2 px-2 py-1 rounded text-xs font-bold text-white ${
                        doc.type === 'PDF' 
                          ? 'bg-error' 
                          : doc.type === 'Image'
                          ? 'bg-success'
                          : doc.type === 'Word'
                          ? 'bg-info'
                          : doc.type === 'PowerPoint'
                          ? 'bg-warning'
                          : 'bg-base-content'
                      }`}>
                        {doc.type === 'Word' ? 'DOC' : doc.type === 'Image' ? 'IMG' : doc.type}
                      </div>
                      
                      {/* Document icon */}
                      <svg className="w-8 h-8 text-base-content " fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Document Info */}
                  <div className="text-center">
                    <h4 className="font-medium text-base-content text-sm mb-1 line-clamp-2">
                      {doc.title}
                    </h4>
                    <p className="text-base-content  text-xs">
                      {formatDate(doc.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-base-content " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">No documents found</h3>
            <p className="text-base-content  mb-4">
              No documents match your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-primary hover:bg-primary  text-primary-content rounded-lg text-sm font-medium transition-colors"
            >
              Reset search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}