// Mock user data for testing
export const mockUsers = [
  {
    id: 1,
    email: "admin@artware.com",
    password: "admin123", // In real app, this would be hashed
    first_name: "Admin",
    last_name: "User",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    created_at: "2024-01-15T10:00:00Z",
    last_login: "2025-09-28T08:30:00Z",
    is_active: true,
    phone: "+33 6 12 34 56 78",
    bio: "Administrator du club Artware",
    skills: ["JavaScript", "React", "Node.js", "Management"],
    github: "https://github.com/admin",
    linkedin: "https://linkedin.com/in/admin"
  },
  {
    id: 2,
    email: "john.doe@student.com",
    password: "password123",
    first_name: "John",
    last_name: "Doe",
    role: "member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    created_at: "2024-02-10T14:30:00Z",
    last_login: "2025-09-27T16:45:00Z",
    is_active: true,
    phone: "+33 6 23 45 67 89",
    bio: "Étudiant passionné de développement web",
    skills: ["Python", "Django", "Vue.js", "Design"],
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe"
  },
  {
    id: 3,
    email: "marie.martin@student.com",
    password: "marie2024",
    first_name: "Marie",
    last_name: "Martin",
    role: "member",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=150&h=150&fit=crop&crop=face",
    created_at: "2024-03-05T09:15:00Z",
    last_login: "2025-09-28T07:20:00Z",
    is_active: true,
    phone: "+33 6 34 56 78 90",
    bio: "Designer UI/UX et développeuse frontend",
    skills: ["Figma", "React", "TypeScript", "CSS"],
    github: "https://github.com/mariemartin",
    linkedin: "https://linkedin.com/in/mariemartin"
  },
  {
    id: 4,
    email: "test@test.com",
    password: "test123",
    first_name: "Test",
    last_name: "User",
    role: "member",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    created_at: "2024-01-01T12:00:00Z",
    last_login: "2025-09-28T10:00:00Z",
    is_active: true,
    phone: "+33 6 00 00 00 00",
    bio: "Utilisateur de test pour le développement",
    skills: ["Testing", "QA", "JavaScript"],
    github: "https://github.com/testuser",
    linkedin: "https://linkedin.com/in/testuser"
  }
];

// Mock authentication function
export const authenticateUser = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    // Return user without password for security
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      token: `mock-jwt-token-${user.id}` // Mock JWT token
    };
  }
  return {
    success: false,
    error: "Email ou mot de passe incorrect"
  };
};

// Mock function to get user by token
export const getUserByToken = (token) => {
  const userId = token?.replace('mock-jwt-token-', '');
  const user = mockUsers.find(u => u.id === parseInt(userId));
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

// Test credentials for easy access
export const testCredentials = {
  admin: {
    email: "admin@artware.com",
    password: "admin123"
  },
  member: {
    email: "test@test.com", 
    password: "test123"
  },
  john: {
    email: "john.doe@student.com",
    password: "password123"
  },
  marie: {
    email: "marie.martin@student.com",
    password: "marie2024"
  }
};