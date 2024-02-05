import { Link } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Oh no, this route doesn&apos;t exist!</h1>
      <Link to="/">Click here to go back to the homepage</Link>
    </div>
  );
}

export default ErrorPage;
