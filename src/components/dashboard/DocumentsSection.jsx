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
      
      // Filter by file type instead of field
      const matchesType = selectedField === 'all' || doc.type?.toLowerCase() === selectedField;
      return matchesSearch && matchesType;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return (a.title || '').localeCompare(b.title || '');
      } else {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
    });
  }, [documents, searchQuery, sortBy, selectedField]);

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
  return (
    <div className="w-full max-w-7xl mx-auto relative min-h-full">
      {/* Header */}
      <div className="mb-6 relative z-10">
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-4 lg:p-6 border border-base-300/20 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">Archive Documents</h1>
              <p className="text-base-content/60">
                Explorez et téléchargez les ressources partagées par la communauté
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{documents.length}</div>
                <div className="text-xs text-base-content/60">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {documents.reduce((acc, doc) => acc + doc.downloads, 0)}
                </div>
                <div className="text-xs text-base-content/60">Téléchargements</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 relative z-10">
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-4 lg:p-6 border border-base-300/20 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-5">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher par titre, auteur ou tag..."
                  className="w-full pl-10 pr-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Field Filter */}
            <div className="lg:col-span-4">
              <select
                className="w-full py-3 px-4 bg-base-200/50 border border-base-300/30 rounded-xl text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
              >
                {fields.map(field => (
                  <option key={field.value} value={field.value}>
                    {field.label} ({field.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="lg:col-span-3">
              <select
                className="w-full py-3 px-4 bg-base-200/50 border border-base-300/30 rounded-xl text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Trier par date</option>
                <option value="name">Trier par nom</option>
              </select>
            </div>
          </div>

          {/* Results Counter */}
          <div className="mt-4 pt-4 border-t border-base-300/30">
            <p className="text-sm text-base-content/60">
              {filteredAndSortedDocuments.length} document(s) trouvé(s)
              {searchQuery && ` pour "${searchQuery}"`}
              {selectedField !== 'all' && ` dans ${fields.find(f => f.value === selectedField)?.label}`}
            </p>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
        {filteredAndSortedDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => handleDownload(doc)}
          >
            {/* Document Preview/Icon */}
            <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative">
              {doc.type === 'PDF' ? (
                <div className="flex flex-col items-center">
                  {/* PDF Icon */}
                  <div className="w-16 h-20 bg-red-600 rounded-md flex items-center justify-center mb-2">
                    <span className="text-white font-bold text-sm">PDF</span>
                  </div>
                  {/* Document preview representation */}
                  <div className="w-full max-w-[120px] bg-white rounded shadow-sm p-2">
                    <div className="space-y-1">
                      <div className="h-1 bg-gray-300 rounded w-full"></div>
                      <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <div className="text-center mt-2 text-xs text-gray-600 font-medium">
                      [Titre du rapport de stage]
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {getFileIcon(doc.type)}
                </div>
              )}
            </div>

            {/* Document Info */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                {doc.title}
              </h3>
              
              {/* Author */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Ajouté par {doc.author}
              </p>

              {/* Rating and Bookmark */}
              <div className="flex items-center justify-between">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-6.55 8.18L10 18z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getDocumentRating(doc.id)}% ({doc.downloads})
                  </span>
                </div>

                {/* Bookmark */}
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedDocuments.length === 0 && (
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-8 text-center border border-base-300/20 shadow-sm relative z-10">
          <div className="w-16 h-16 bg-base-content/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">Aucun document trouvé</h3>
          <p className="text-base-content/60 mb-4">
            Aucun document ne correspond à vos critères de recherche.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedField('all');
            }}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-lg text-sm font-medium transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}