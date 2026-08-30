import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found</p>

      <Link to="/phones">Go to phones</Link>
    </main>
  );
}

export default NotFoundPage;
