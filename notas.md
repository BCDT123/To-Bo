
  /app                 → Rutas y páginas (Next.js App Router) // se enfoca en rutas y navegación , loading.tsx, error.tsx, not-found.tsx para manejar estados especiales.
  /components          → Componentes reutilizables
  /features            → Módulos funcionales (por dominio) // logica del negocio
    /users
      /components      → Componentes específicos de usuarios
      /services        → Servicios relacionados a usuarios
      /types.ts        → Tipos específicos
      /hooks.ts        → Custom hooks
      /usersPage.tsx   → Página o vista principal
  /services            → Servicios globales (fetch, auth, etc.)
  /lib                 → Utilidades generales (formateadores, validadores)
  /hooks               → Custom hooks globales
  /types               → Tipos globales (interfaces, enums)
  /constants           → Constantes compartidas
  /config              → Configuración de entorno, alias, etc.
  /styles              → Estilos globales (CSS, Tailwind, etc.)
  /middleware          → Middlewares (auth, logging, etc.)
  /tests               → Tests unitarios y de integración

      

//correr pruebas unitarias 
npm test

//instalar dependencias
npm install

//correr app
npm run dev

Base de datos	Instancia	Funciones principales
Realtime Database	getDatabase(app)=	ref(), set(), get()
Firestore	getFirestore(app)	= collection(), getDocs()


Usas Firestore directo para cosas en tiempo real (chat, notificaciones).
Usas tu API para operaciones sensibles (crear usuarios, pagos, etc.).

En mi codigo agrega con comentarios export, no borres los comentarios que hay, 
en cambio traducelos al ingles. Incluye parametros y que retorna, 
utiliza las mejores practicas para documentar codigo.(comentarios en ingles)

# Estructura

- app: se queda igual, estaria bien renombrar a routes.
- shared: todo lo que se usa en varios modules.
  - components
    - atoms
    - nav
  - mocks
  - hooks
  - types
  - services
    - firestore
    - user
  - utilities: este era lib antes.
- modules: secciones totalmente independientes.
  - auth
  - homeSettings
  - userSettings
    - components
    - hooks
    - services
    - types
- i18n
  - languages

# Notas

- /tests se crean en una carpeta en la misma carpeta del elemento que se testea
- /features se reordena en /modules
- las pages de /app deben de ser lo más simple posible