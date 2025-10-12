"use client";
import { useState } from 'react';

export default function CellsSection({ user }) {
  const [filterJoined, setFilterJoined] = useState(false);

  // Mock data for cells - in real app this would come from props or API
  const allCells = [
    {
      id: 1,
      title: "Développement Web",
      description: "Création d'applications web modernes avec React, Next.js, et technologies full-stack",
      chef: "Sarah Mohamed",
      chefImage: "/bureau/Salim.png",
      members: 24,
      technologies: ["React", "Next.js", "Node.js", "MongoDB"],
      isUserJoined: true,
      level: "Intermédiaire",
      color: "blue"
    },
    {
      id: 2,
      title: "Intelligence Artificielle",
      description: "Développement de solutions IA, machine learning et deep learning pour résoudre des problèmes complexes",
      chef: "Ahmed Alami",
      chefImage: "/bureau/Hamza.png",
      members: 18,
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
      isUserJoined: true,
      level: "Avancé",
      color: "purple"
    },
    {
      id: 3,
      title: "Développement Mobile",
      description: "Applications mobiles natives et cross-platform pour iOS et Android",
      chef: "Fatima Zahra",
      chefImage: "/bureau/Mona.png",
      members: 16,
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      isUserJoined: false,
      level: "Intermédiaire",
      color: "green"
    },
    {
      id: 4,
      title: "Cybersécurité",
      description: "Sécurité informatique, tests de pénétration et protection des systèmes",
      chef: "Youssef Bennani",
      chefImage: "/bureau/Yassine.png",
      members: 12,
      technologies: ["Kali Linux", "Metasploit", "Wireshark", "OWASP"],
      isUserJoined: false,
      level: "Avancé",
      color: "red"
    },
    {
      id: 5,
      title: "DevOps & Cloud",
      description: "Automatisation, déploiement continu et infrastructure cloud",
      chef: "Karim Idrissi",
      chefImage: "/bureau/Badr.png",
      members: 20,
      technologies: ["Docker", "Kubernetes", "AWS", "Jenkins"],
      isUserJoined: false,
      level: "Avancé",
      color: "orange"
    },
    {
      id: 6,
      title: "UI/UX Design",
      description: "Design d'interfaces utilisateur et expérience utilisateur moderne",
      chef: "Nadia Elkhalfi",
      chefImage: "/bureau/Houda.png",
      members: 14,
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle"],
      isUserJoined: true,
      level: "Débutant",
      color: "pink"
    }
  ];

  const displayedCells = filterJoined 
    ? allCells.filter(cell => cell.isUserJoined) 
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
    return baseClasses[color];
  };

  const getIconColor = (color) => {
    const colors = {
      blue: "text-blue-600",
      purple: "text-purple-600", 
      green: "text-green-600",
      red: "text-red-600",
      orange: "text-orange-600",
      pink: "text-pink-600"
    };
    return colors[color];
  };

  const getBadgeColor = (color) => {
    const colors = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500", 
      red: "text-red-500",
      orange: "bg-orange-500",
      pink: "bg-pink-500"
    };
    return colors[color];
  };
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
                {allCells.filter(cell => cell.isUserJoined).length}
              </div>
              <div className="text-xs text-base-content/60">Mes cellules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {allCells.reduce((acc, cell) => acc + cell.members, 0)}
              </div>
              <div className="text-xs text-base-content/60">Total membres</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cells Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {displayedCells.map((cell) => (
          <div
            key={cell.id}
            className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:scale-105 relative ${getColorClasses(cell.color, cell.isUserJoined)}`}
          >
            {/* Joined Badge */}
            {cell.isUserJoined && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Membre
                </div>
              </div>
            )}

            {/* Cell Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 ${getBadgeColor(cell.color)} rounded-xl flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.678-2.153-1.415-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-base-content mb-1">{cell.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${cell.level === 'Débutant' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : cell.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {cell.level}
                  </span>
                  <span className="text-xs text-base-content/60">{cell.members} membres</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-base-content/70 mb-4 leading-relaxed">
              {cell.description}
            </p>

            {/* Technologies */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-base-content mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {cell.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-base-content/10 text-base-content/80 rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Chef Section */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-white/30 dark:bg-black/20 rounded-lg">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-base-300">
                <img 
                  src={cell.chefImage} 
                  alt={cell.chef}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-base-content">Chef de cellule</div>
                <div className="text-sm text-base-content/70">{cell.chef}</div>
              </div>
            </div>

            {/* Action Button */}
            <button
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                cell.isUserJoined
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : `bg-${cell.color}-500 hover:bg-${cell.color}-600 text-white`
              }`}
            >
              {cell.isUserJoined ? 'Voir la cellule' : 'Rejoindre la cellule'}
            </button>
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