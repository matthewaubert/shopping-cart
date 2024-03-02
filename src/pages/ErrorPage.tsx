import { Link } from 'react-router-dom';
import '../styles/ErrorPage.css';

function ErrorPage() {
  return (
    <div className="error-page">
      <Link to="/" className="logo">
        <h1>shopping app</h1>
      </Link>
      <h2>Oops!</h2>
      <h3>We can&apos;t seem to find the page you&apos;re looking for.</h3>
      <Link to="/">Click here to go back to the homepage</Link>
    </div>
  );
}

export default ErrorPage;
