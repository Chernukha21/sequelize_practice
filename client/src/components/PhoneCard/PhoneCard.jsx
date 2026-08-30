import classes from './PhoneCard.module.scss';
import phonePhoto from '../../assets/old_phone.jpg';
import { Link } from 'react-router-dom';

const SERVER_URL = 'http://localhost:5000';

function PhoneCard({ phone, onEdit, onDelete, isDeleting, isUpdating }) {
  const imageUrl = phone.phoneImage
    ? `${SERVER_URL}/static/images/${phone.phoneImage}`
    : phonePhoto;

  return (
    <article className={classes.phoneCard}>
      <Link to={`/phones/${phone.id}/preorders`}>
        <div className={classes.infoWrapper}>
          <div className={classes.imageWrapper}>
            <img
              src={imageUrl}
              alt={`${phone.brand} ${phone.model}`}
              className={classes.phoneImage}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.src = phonePhoto;
              }}
            />
          </div>
          <h3 className={classes.phoneName}>
            <span className={classes.brand}>{phone.brand}</span> {phone.model}
          </h3>

          <div className={classes.specs}>
            <span>Production year: {phone.productionYear}</span>

            <span>RAM: {phone.ramSize} GB</span>

            <span>CPU: {phone.processor}</span>

            <span>Screen: {phone.screenDiagonal}″</span>

            <span>Color: {phone.color}</span>

            {isUpdating ? (
              'Updating...'
            ) : (
              <span>NFC: {phone.hasNfc ? 'Supported' : 'Not supported'}</span>
            )}
          </div>
        </div>
      </Link>
      <div className={classes.actions}>
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(phone)}
            className={`${classes.btn} ${classes.btnEdit}`}
            title="Edit device"
          >
            Change nfc support
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(phone.id)}
          className={`${classes.btn} ${classes.btnDelete}`}
          title="Delete device"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : '🗑️ Delete'}
        </button>
      </div>
    </article>
  );
}

export default PhoneCard;
