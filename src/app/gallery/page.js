"use client";
import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PointerLockControls, 
  Text, 
  Box, 
  Plane, 
  Environment,
  useTexture,
  Html
} from '@react-three/drei';
import { useThemeStore } from '@/stores';
import * as THREE from 'three';
import Link from 'next/link';

// Mock gallery data
const galleryItems = [
  {
    id: 1,
    title: "Workshop Intelligence Artificielle",
    date: "4/20/2024",
    category: "Formations",
    type: "formation",
    imageUrl: "https://picsum.photos/id/1015/800/600",
    description: "Session intensive sur les fondamentaux de l'IA et machine learning"
  },
  {
    id: 2,
    title: "Hackathon Spring 2024",
    date: "3/15/2024", 
    category: "Competitions",
    type: "competition",
    imageUrl: "https://picsum.photos/id/1011/900/700",
    description: "Compétition de programmation de 48h avec des défis innovants"
  },
  {
    id: 3,
    title: "Conférence Cybersécurité",
    date: "2/28/2024",
    category: "Articles",
    type: "conference",
    imageUrl: "https://picsum.photos/id/1020/800/500",
    description: "Présentation des dernières tendances en sécurité informatique"
  },
  {
    id: 4,
    title: "Projet Fin d'Études - App Mobile",
    date: "4/10/2024",
    category: "Member Work",
    type: "project",
    imageUrl: "https://picsum.photos/id/1022/700/800",
    description: "Application mobile innovante développée par nos étudiants"
  },
  {
    id: 5,
    title: "Tech Talk - Cloud Computing",
    date: "3/25/2024",
    category: "Articles",
    type: "tech-talk",
    imageUrl: "https://picsum.photos/id/1023/800/600",
    description: "Exploration des technologies cloud et leur impact"
  },
  {
    id: 6,
    title: "Collaboration Entreprise",
    date: "4/05/2024",
    category: "Member Work",
    type: "collaboration",
    imageUrl: "https://picsum.photos/id/1024/900/600",
    description: "Partenariat avec des entreprises technologiques locales"
  },
  {
    id: 7,
    title: "Formation React Advanced",
    date: "3/20/2024",
    category: "Formations",
    type: "formation",
    imageUrl: "https://picsum.photos/id/1025/800/700",
    description: "Maîtrise avancée du framework React et ses écosystèmes"
  },
  {
    id: 8,
    title: "Innovation Lab Session",
    date: "4/15/2024",
    category: "Articles",
    type: "innovation",
    imageUrl: "https://picsum.photos/id/1026/700/600",
    description: "Laboratoire d'innovation pour développer des idées créatives"
  }
];

const categories = ["All", "Formations", "Competitions", "Articles", "Member Work"];

// 3D Picture Component for museum walls
function Picture({ position, rotation, imageUrl, title, description, scale = [2, 1.5, 0.1] }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  
  // Load texture safely
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (loadedTexture) => {
        setTexture(loadedTexture);
        setTextureLoaded(true);
      },
      undefined,
      (error) => {
        console.log('Texture failed to load, using fallback');
        setTextureLoaded(true); // Still set to true to proceed
      }
    );
  }, [imageUrl]);
  
  useFrame((state) => {
    if (meshRef.current && textureLoaded) {
      meshRef.current.rotation.y += hovered ? 0.005 : 0;
    }
  });

  if (!textureLoaded) {
    return null; // Don't render until texture is processed
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Picture Frame */}
      <Box
        ref={meshRef}
        args={scale}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          map={texture}
          color={texture ? "white" : "#cccccc"}
        />
      </Box>
      
      {/* Frame Border */}
      <Box args={[scale[0] + 0.2, scale[1] + 0.2, 0.05]} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Info Panel (appears when hovered) */}
      {hovered && (
        <Html position={[0, -scale[1]/2 - 0.5, 0]} center>
          <div className="bg-black/80 text-white p-4 rounded-lg max-w-xs backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// Museum Room Component
function Museum({ galleryItems }) {
  const { camera } = useThree();
  
  useEffect(() => {
    try {
      camera.position.set(0, 1.6, 5); // Eye level height
      console.log('Museum component loaded successfully');
    } catch (error) {
      console.error('Error setting up museum:', error);
    }
  }, [camera]);

  const wallHeight = 5;
  const roomSize = 20;

  return (
    <>
      {/* Room Walls */}
      {/* Front Wall */}
      <Plane args={[roomSize, wallHeight]} position={[0, wallHeight/2, -roomSize/2]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#f5f5f5" />
      </Plane>
      
      {/* Back Wall */}
      <Plane args={[roomSize, wallHeight]} position={[0, wallHeight/2, roomSize/2]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial color="#f5f5f5" />
      </Plane>
      
      {/* Left Wall */}
      <Plane args={[roomSize, wallHeight]} position={[-roomSize/2, wallHeight/2, 0]} rotation={[0, Math.PI/2, 0]}>
        <meshStandardMaterial color="#f0f0f0" />
      </Plane>
      
      {/* Right Wall */}
      <Plane args={[roomSize, wallHeight]} position={[roomSize/2, wallHeight/2, 0]} rotation={[0, -Math.PI/2, 0]}>
        <meshStandardMaterial color="#f0f0f0" />
      </Plane>

      {/* Floor */}
      <Plane args={[roomSize, roomSize]} position={[0, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#ddd" />
      </Plane>

      {/* Ceiling */}
      <Plane args={[roomSize, roomSize]} position={[0, wallHeight, 0]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#fff" />
      </Plane>

      {/* Gallery Pictures on Walls */}
      {galleryItems.slice(0, 8).map((item, index) => {
        const wallPositions = [
          // Front wall pictures
          { position: [-4, 2.5, -9.8], rotation: [0, 0, 0] },
          { position: [0, 2.5, -9.8], rotation: [0, 0, 0] },
          { position: [4, 2.5, -9.8], rotation: [0, 0, 0] },
          // Left wall pictures
          { position: [-9.8, 2.5, -4], rotation: [0, Math.PI/2, 0] },
          { position: [-9.8, 2.5, 0], rotation: [0, Math.PI/2, 0] },
          // Right wall pictures
          { position: [9.8, 2.5, -4], rotation: [0, -Math.PI/2, 0] },
          { position: [9.8, 2.5, 0], rotation: [0, -Math.PI/2, 0] },
          // Back wall picture
          { position: [0, 2.5, 9.8], rotation: [0, Math.PI, 0] },
        ];

        const pos = wallPositions[index];
        
        return (
          <Picture
            key={item.id}
            position={pos.position}
            rotation={pos.rotation}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            scale={[2.5, 2, 0.1]}
          />
        );
      })}

      {/* Museum Title in 3D */}
      <Text
        position={[0, 4, -9]}
        fontSize={1}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        ARTWARE GALLERY
      </Text>

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 4, 0]} intensity={1} />
      <pointLight position={[-5, 3, -5]} intensity={0.8} />
      <pointLight position={[5, 3, -5]} intensity={0.8} />
    </>
  );
}

// First Person Controls with Movement
function FirstPersonControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(true);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(true);
          break;
        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(true);
          break;
        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(true);
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(false);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(false);
          break;
        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(false);
          break;
        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (controlsRef.current) {
      velocity.current.x -= velocity.current.x * 10.0 * delta;
      velocity.current.z -= velocity.current.z * 10.0 * delta;

      direction.current.z = Number(moveForward) - Number(moveBackward);
      direction.current.x = Number(moveRight) - Number(moveLeft);
      direction.current.normalize(); // this ensures consistent movements in all directions

      if (moveForward || moveBackward) velocity.current.z -= direction.current.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.current.x -= direction.current.x * 400.0 * delta;

      const controls = controlsRef.current;
      controls.moveRight(-velocity.current.x * delta);
      controls.moveForward(-velocity.current.z * delta);

      // Boundary constraints (keep player inside the room)
      const position = camera.position;
      const boundary = 8;
      position.x = Math.max(-boundary, Math.min(boundary, position.x));
      position.z = Math.max(-boundary, Math.min(boundary, position.z));
      position.y = Math.max(1.6, Math.min(3, position.y)); // Keep at eye level
    }
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping={false}
    />
  );
}

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [has3DError, setHas3DError] = useState(false);
  
  const { theme, isDarkMode, setTheme: setGlobalTheme, isInitialized } = useThemeStore();

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    // Shorter loading for 3D scene
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = galleryItems;
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [selectedCategory]);

  // Determine logo source based on theme
  const getLogoSource = () => {
    if (!isMounted || !isInitialized) {
      return "/logos/ArtwareLogo.png";
    }
    
    return isDarkMode ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png";
  };

  // Theme switcher handler
  const handleTheme = (t) => {
    setGlobalTheme(t);
  };

  // Handle 3D errors
  const handle3DError = () => {
    setHas3DError(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Initialisation du musée 3D...</p>
          <p className="mt-2 text-sm text-base-content/50">Chargement de l&apos;expérience immersive</p>
          <button 
            onClick={() => setIsLoading(false)}
            className="mt-4 px-4 py-2 bg-primary text-primary-content rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            Passer le chargement
          </button>
        </div>
      </div>
    );
  }

  if (has3DError) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-base-content mb-4">Erreur 3D</h1>
          <p className="text-base-content/70 mb-4">
            Le musée 3D ne peut pas se charger. Cela peut être dû à votre navigateur ou votre matériel.
          </p>
          <Link 
            href="/gallery-2d" 
            className="px-6 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
          >
            Voir la galerie classique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative">
      {/* 3D Museum Controls Instructions */}
      <div className="absolute top-4 left-4 z-20 bg-black/80 text-white p-4 rounded-lg backdrop-blur-sm">
        <h3 className="font-bold mb-2">🎮 Contrôles du Musée</h3>
        <div className="text-sm space-y-1">
          <p><kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Clic</kbd> pour verrouiller la souris</p>
          <p><kbd className="px-2 py-1 bg-gray-700 rounded text-xs">WASD</kbd> ou <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">↑↓←→</kbd> pour se déplacer</p>
          <p><kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Souris</kbd> pour regarder autour</p>
          <p><kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Echap</kbd> pour déverrouiller</p>
        </div>
      </div>

      {/* Top UI Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-4">
        {/* Category Filter */}
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent text-white text-sm outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-black">{cat}</option>
            ))}
          </select>
        </div>

        {/* Theme Switcher */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-circle btn-ghost text-white hover:bg-white/20">
            {theme === "acid" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-2">
            <li>
              <button
                className={theme === "acid" ? "active text-primary flex items-center gap-2" : "flex items-center gap-2"}
                onClick={() => handleTheme("acid")}
              >
                Light
              </button>
            </li>
            <li>
              <button
                className={theme === "synthwave" ? "active text-primary flex items-center gap-2" : "flex items-center gap-2"}
                onClick={() => handleTheme("synthwave")}
              >
                Dark
              </button>
            </li>
          </ul>
        </div>

        {/* Go Back Button */}
        <Link
          href="/"
          className="bg-black/80 hover:bg-black text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Retour</span>
        </Link>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-screen relative">
        <Canvas
          className="w-full h-screen"
          camera={{ position: [0, 1.6, 5], fov: 75 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#1a1a1a');
            console.log('3D Canvas initialized successfully');
          }}
          onError={(error) => {
            console.error('3D Canvas error:', error);
            handle3DError();
          }}
        >
          <Suspense fallback={
            <Html center>
              <div className="text-white text-xl animate-pulse">
                Chargement du musée...
              </div>
            </Html>
          }>
            <Museum galleryItems={filteredItems} />
            <FirstPersonControls />
          </Suspense>
        </Canvas>
        
        {/* Emergency Exit Button */}
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={handle3DError}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            Sortir du mode 3D
          </button>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/80 text-white px-6 py-3 rounded-full backdrop-blur-sm">
          <p className="text-sm">
            🖼️ {filteredItems.length} œuvres exposées • Survolez les tableaux pour plus d&apos;infos
          </p>
        </div>
      </div>
    </div>
  );
}
