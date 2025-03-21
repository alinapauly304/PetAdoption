# Pet Adoption Frontend

This is the frontend application for the Pet Adoption platform. It's built using React and Material-UI, providing a modern and responsive user interface for managing pet adoptions.

## Features

- Browse available pets
- View detailed information about each pet
- Search and filter pets by type and breed
- View shelter information
- Submit adoption requests
- User authentication (login/register)
- Protected routes for authenticated users
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend API running on `http://localhost:8080`

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized production build in the `build` directory.

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions and API
│   ├── App.js         # Main application component
│   └── index.js       # Application entry point
├── package.json
└── README.md
```

## API Integration

The frontend communicates with the backend API using Axios. The API configuration is centralized in `src/utils/api.js`.

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. The token is stored in localStorage and automatically included in API requests.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 