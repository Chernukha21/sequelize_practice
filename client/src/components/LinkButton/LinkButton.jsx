import { Link, useNavigate } from 'react-router-dom';
import classes from './LinkButton.module.scss';

function LinkButton({
  to = '/',
  back = false,
  content,
  children,
  icon = '←',
  replace = false,
}) {
  const navigate = useNavigate();

  const buttonContent = (
    <>
      {icon && <span className={classes.linkIcon}>{icon}</span>}

      <span>{children ?? content}</span>
    </>
  );

  if (back) {
    return (
      <button
        type="button"
        className={classes.linkButton}
        onClick={() => navigate(-1)}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <Link to={to} replace={replace} className={classes.linkButton}>
      {buttonContent}
    </Link>
  );
}

export default LinkButton;
