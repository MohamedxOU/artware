// Mock data for dashboard statistics and activities
export const mockDashboardStats = {
  totalMembers: 156,
  activeProjects: 23,
  upcomingEvents: 8,
  totalDocuments: 45
};

export const mockRecentActivities = [
  {
    id: 1,
    type: "event",
    title: "Hackathon 2025 créé",
    description: "Nouvel événement ajouté pour Mars 2025",
    timestamp: "2025-09-28T08:30:00Z",
    user: "Admin User",
    icon: "calendar",
    color: "purple"
  },
  {
    id: 2,
    type: "member",
    title: "Nouveau membre",
    description: "Marie Martin a rejoint le club",
    timestamp: "2025-09-27T14:20:00Z",
    user: "System",
    icon: "user-plus",
    color: "blue"
  },
  {
    id: 3,
    type: "document",
    title: "Guide React mis à jour",
    description: "Documentation technique mise à jour",
    timestamp: "2025-09-26T16:45:00Z",
    user: "John Doe",
    icon: "document",
    color: "green"
  },
  {
    id: 4,
    type: "project",
    title: "Projet E-commerce lancé",
    description: "Nouveau projet collaboratif démarré",
    timestamp: "2025-09-25T10:15:00Z",
    user: "Marie Martin",
    icon: "code",
    color: "orange"
  },
  {
    id: 5,
    type: "event",
    title: "Workshop JavaScript complété",
    description: "25 participants ont assisté au workshop",
    timestamp: "2025-09-24T18:00:00Z",
    user: "Admin User",
    icon: "academic-cap",
    color: "purple"
  }
];

export const mockUpcomingEvents = [
  {
    id: 1,
    title: "Hackathon 2025",
    date: "2025-10-15T09:00:00Z",
    location: "Campus Principal",
    participants: 45,
    status: "confirmed"
  },
  {
    id: 2,
    title: "Workshop React Advanced",
    date: "2025-10-08T14:00:00Z",
    location: "Salle Info A",
    participants: 20,
    status: "confirmed"
  },
  {
    id: 3,
    title: "Conférence IA & Web",
    date: "2025-10-22T10:00:00Z",
    location: "Amphithéâtre",
    participants: 80,
    status: "pending"
  }
];

export const mockProjects = [
  {
    id: 1,
    name: "Site Web Club",
    description: "Refonte du site officiel du club",
    status: "active",
    progress: 75,
    team: ["John Doe", "Marie Martin"],
    technologies: ["Next.js", "TailwindCSS", "Vercel"],
    startDate: "2025-08-01T00:00:00Z",
    endDate: "2025-10-31T00:00:00Z"
  },
  {
    id: 2,
    name: "App Mobile Events",
    description: "Application mobile pour les événements",
    status: "active",
    progress: 45,
    team: ["Admin User", "John Doe"],
    technologies: ["React Native", "Firebase", "Expo"],
    startDate: "2025-09-01T00:00:00Z",
    endDate: "2025-12-15T00:00:00Z"
  },
  {
    id: 3,
    name: "Bot Discord",
    description: "Bot pour automatiser la gestion Discord",
    status: "completed",
    progress: 100,
    team: ["Marie Martin"],
    technologies: ["Node.js", "Discord.js", "MongoDB"],
    startDate: "2025-07-01T00:00:00Z",
    endDate: "2025-08-30T00:00:00Z"
  }
];

export const mockNotifications = [
  {
    id: 1,
    type: "info",
    title: "Réunion équipe",
    message: "Réunion prévue demain à 14h",
    timestamp: "2025-09-28T09:00:00Z",
    read: false
  },
  {
    id: 2,
    type: "success",
    title: "Projet validé",
    message: "Votre projet a été approuvé",
    timestamp: "2025-09-27T15:30:00Z",
    read: false
  },
  {
    id: 3,
    type: "warning",
    title: "Deadline approche",
    message: "Projet à rendre dans 3 jours",
    timestamp: "2025-09-26T08:45:00Z",
    read: true
  }
];