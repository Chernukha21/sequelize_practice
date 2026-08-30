import LinkButton from '../../components/LinkButton/LinkButton.jsx';
import classes from './NotFoundPage.module.scss';

function NotFoundPage() {
  return (
    <main className={classes.container}>
      <h1>404</h1>
      <p>Page not found</p>
      <LinkButton to="/phones" content="Go to phones" />
    </main>
  );
}

export default NotFoundPage;
