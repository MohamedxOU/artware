"use client";
import { useState, useMemo } from 'react';

export default function DocumentsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'name'
  const [selectedField, setSelectedField] = useState('all');

  // Mock documents data - in real app this would come from props or API
  const documents = [
    {
      id: 1,
      title: "Guide des bonnes pratiques React",
      author: "Sarah Mohamed",
      authorImage: "/bureau/Salim.png",
      field: "dev",
      fieldLabel: "Développement",
      type: "PDF",
      size: "2.4 MB",
      dateAdded: "2024-11-01",
      description: "Guide complet pour développer des applications React modernes et performantes",
      downloads: 156,
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Introduction au Machine Learning",
      author: "Ahmed Alami",
      authorImage: "/bureau/Hamza.png",
      field: "ai",
      fieldLabel: "Intelligence Artificielle",
      type: "PDF",
      size: "5.1 MB",
      dateAdded: "2024-10-28",
      description: "Concepts fondamentaux du machine learning avec exemples pratiques",
      downloads: 243,
      tags: ["ML", "Python", "AI"]
    },
    {
      id: 3,
      title: "Sécurité des Applications Web",
      author: "Youssef Bennani",
      authorImage: "/bureau/Yassine.png",
      field: "cs",
      fieldLabel: "Cybersécurité",
      type: "PDF",
      size: "3.7 MB",
      dateAdded: "2024-10-25",
      description: "Techniques de sécurisation et tests de pénétration pour applications web",
      downloads: 89,
      tags: ["Security", "OWASP", "WebApp"]
    },
    {
      id: 4,
      title: "Design System et UI Components",
      author: "Nadia Elkhalfi",
      authorImage: "/bureau/Houda.png",
      field: "design",
      fieldLabel: "UI/UX Design",
      type: "Figma",
      size: "15.2 MB",
      dateAdded: "2024-10-20",
      description: "Système de design complet avec composants réutilisables",
      downloads: 178,
      tags: ["Design", "Figma", "UI"]
    },
    {
      id: 5,
      title: "Conteneurisation avec Docker",
      author: "Karim Idrissi",
      authorImage: "/bureau/Badr.png",
      field: "devops",
      fieldLabel: "DevOps",
      type: "PDF",
      size: "4.3 MB",
      dateAdded: "2024-10-15",
      description: "Guide pratique pour containeriser vos applications avec Docker",
      downloads: 134,
      tags: ["Docker", "DevOps", "Container"]
    },
    {
      id: 6,
      title: "Architecture Microservices",
      author: "Fatima Zahra",
      authorImage: "/bureau/Mona.png",
      field: "dev",
      fieldLabel: "Développement",
      type: "PDF",
      size: "6.8 MB",
      dateAdded: "2024-10-12",
      description: "Patterns et bonnes pratiques pour architectures microservices",
      downloads: 201,
      tags: ["Microservices", "Architecture", "Backend"]
    },
    {
      id: 7,
      title: "Flutter pour débutants",
      author: "Omar Bennani",
      authorImage: "/bureau/Salim.png",
      field: "mobile",
      fieldLabel: "Mobile",
      type: "PDF",
      size: "3.2 MB",
      dateAdded: "2024-10-08",
      description: "Développement d'applications mobiles cross-platform avec Flutter",
      downloads: 167,
      tags: ["Flutter", "Dart", "Mobile"]
    },
    {
      id: 8,
      title: "Analyse de données avec Python",
      author: "Laila Amrani",
      authorImage: "/bureau/Mona.png",
      field: "ai",
      fieldLabel: "Intelligence Artificielle",
      type: "Jupyter",
      size: "2.9 MB",
      dateAdded: "2024-10-05",
      description: "Techniques d'analyse et visualisation de données avec pandas et matplotlib",
      downloads: 112,
      tags: ["Python", "Data", "Analytics"]
    }
  ];

  const fields = [
    { value: 'all', label: 'Tous les domaines', count: documents.length },
    { value: 'dev', label: 'Développement', count: documents.filter(d => d.field === 'dev').length },
    { value: 'ai', label: 'Intelligence Artificielle', count: documents.filter(d => d.field === 'ai').length },
    { value: 'cs', label: 'Cybersécurité', count: documents.filter(d => d.field === 'cs').length },
    { value: 'design', label: 'UI/UX Design', count: documents.filter(d => d.field === 'design').length },
    { value: 'devops', label: 'DevOps', count: documents.filter(d => d.field === 'devops').length },
    { value: 'mobile', label: 'Mobile', count: documents.filter(d => d.field === 'mobile').length }
  ];

  // Filter and sort documents
  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesField = selectedField === 'all' || doc.field === selectedField;
      return matchesSearch && matchesField;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
    });
  }, [searchQuery, sortBy, selectedField]);

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return (
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'Figma':
        return (
          <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'Jupyter':
        return (
          <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {filteredAndSortedDocuments.map((doc) => (
          <div
            key={doc.id}
            className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-6 border border-base-300/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {/* Document Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                {getFileIcon(doc.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-base-content mb-1 line-clamp-2">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                    {doc.fieldLabel}
                  </span>
                  <span className="text-xs text-base-content/60">
                    {doc.type} • {doc.size}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-base-content/70 mb-4 line-clamp-3 leading-relaxed">
              {doc.description}
            </p>

            {/* Tags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {doc.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-base-content/10 text-base-content/80 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Section */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-white/30 dark:bg-black/20 rounded-lg">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-base-300">
                <img 
                  src={doc.authorImage} 
                  alt={doc.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-base-content">{doc.author}</div>
                <div className="text-xs text-base-content/60">{formatDate(doc.dateAdded)}</div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-base-content/60">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs">{doc.downloads} téléchargements</span>
              </div>
              <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-lg text-sm font-medium transition-colors">
                Télécharger
              </button>
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