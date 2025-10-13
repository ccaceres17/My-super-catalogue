# Super Catálogo — Tienda Online con React + Bootstrap

![Logo del Proyecto](./src/assets/logo.png)

> Proyecto final de Frontend — desarrollado por **Camila Andrea Cáceres Reyes**  
> Consumo de API, manejo de rutas, contexto global y diseño responsive.

---

## 🌐 **Demo en línea**
👉 [Abrir proyecto en GitHub Pages](https://ccaceres17.github.io/My-super-catalogue/)

---

## 🧠 **Descripción del proyecto**

**Super Catálogo** es una tienda online desarrollada con **React + Vite**, que consume datos en tiempo real desde la **Fake Store API**.  
El objetivo del proyecto es aplicar conceptos fundamentales del desarrollo frontend moderno, incluyendo:

- Ruteo dinámico con React Router.  
- Estados globales mediante Context API.  
- Manejo de autenticación y sesiones simuladas.  
- Carrito de compras con persistencia local.  
- Comunicación con una API REST.  
- Diseño responsive con **Bootstrap 5**.

---

## 🧩 **Características principales**

✅ Catálogo de productos con filtros por categoría.  
✅ Vista detallada de cada producto.  
✅ Sistema de carrito (localStorage + sincronización al iniciar sesión).  
✅ Registro e inicio de sesión con Fake Store API.  
✅ Proceso de compra (checkout) simulado.  
✅ Perfil de usuario con historial de pedidos.  
✅ Totalmente responsive (adaptado a móvil y escritorio).  

---

 **Tecnologías utilizadas**

| Tecnología | Uso principal |
|-------------|----------------|
| ⚛️ **React** | Construcción de la interfaz y componentes |
| 🧭 **React Router DOM** | Manejo de rutas y navegación SPA |
| 💾 **Context API** | Gestión de estado global (auth + carrito) |
| 💅 **Bootstrap 5** | Estilos y diseño responsive |
| 🌐 **Axios** | Consumo de la Fake Store API |
| ⚡ **Vite** | Empaquetador y servidor de desarrollo |
| 🧰 **JavaScript (ES6+)** | Lógica de negocio y manejo de datos |

---

## 🧱 **Estructura del proyecto**

my-super-catalogue/
├─ public/
├─ src/
│ ├─ api/ → conexión con Fake Store API
│ ├─ assets/ → imágenes y logo
│ ├─ components/ → Navbar, ProductCard, CartItem, etc.
│ ├─ contexts/ → AuthContext y CartContext
│ ├─ pages/ → Home, Catalog, ProductPage, Cart, Login, Register, Checkout, Profile
│ ├─ App.jsx → rutas principales
│ └─ main.jsx → punto de entrada
└─ package.json


---

## 🧾 **Fake Store API utilizada**

> https://fakestoreapi.com

Ejemplos de endpoints usados:
- `GET /products` → Listar productos  
- `GET /products/categories` → Filtros  
- `GET /products/:id` → Detalle  
- `POST /auth/login` → Login simulado  
- `POST /carts` → Checkout  

---

## 🚀 **Instrucciones de instalación**

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/ccaceres17/My-super-catalogue.git

2. Entrar a la carpeta:

cd My-super-catalogue
Instalar dependencias:
npm install


Ejecutar el proyecto:
npm run dev

📦 Comandos disponibles
Comando	Descripción
npm run dev	Ejecuta el servidor de desarrollo
npm run build	Genera la versión optimizada para producción
npm run preview	Visualiza la versión final antes del despliegue

👩‍💻 Autora
Camila Andrea Cáceres Reyes
💼 Desarrolladora Frontend en formación
📧 camilaandreacaceresreyes@gmail.com