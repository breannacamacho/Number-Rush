import { useRouteError, Link } from "react-router-dom";
import "./ErrorPage.css"; // Optionally add a CSS file for styles

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="error-page">
      <h1>UH-OH!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">
        <button className="btn btn-primary">Go Back Home</button>
      </Link>
    </div>
  );
}