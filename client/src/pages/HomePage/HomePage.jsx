import { Link } from 'react-router-dom';
import classes from './HomePage.module.scss';

function HomePage() {
  return (
    <main className={classes.page}>
      <section className={classes.hero}>
        <span className={classes.badge}>Phone Manager</span>

        <h1 className={classes.title}>Manage your devices</h1>

        <p className={classes.description}>
          Add new phones, view their specifications and manage preorders.
        </p>

        <div className={classes.actions}>
          <Link
            to="/phones/new"
            className={`${classes.actionCard} ${classes.createCard}`}
          >
            <span className={classes.icon}>＋</span>

            <span className={classes.actionContent}>
              <strong>Add new phone</strong>
              <small>Create a device with specifications and an image</small>
            </span>

            <span className={classes.arrow}>→</span>
          </Link>

          <Link
            to="/phones"
            className={`${classes.actionCard} ${classes.listCard}`}
          >
            <span className={classes.icon}>◫</span>

            <span className={classes.actionContent}>
              <strong>View phones</strong>
              <small>Browse and manage stored devices</small>
            </span>

            <span className={classes.arrow}>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
