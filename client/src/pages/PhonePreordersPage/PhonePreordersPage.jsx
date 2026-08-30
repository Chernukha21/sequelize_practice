import { useParams } from 'react-router-dom';
import { useGetPhonePreordersQuery } from '../../store/phonesApi.js';
import LinkButton from '../../components/LinkButton/LinkButton.jsx';
import classes from './PhonePreordersPage.module.scss';

function PhonePreordersPage() {
  const { id } = useParams();

  const {
    data: preorders = [],
    isLoading,
    isFetching,
    error,
  } = useGetPhonePreordersQuery(id);

  if (isLoading) {
    return <p>Loading preorders...</p>;
  }

  if (error) {
    return <p>Failed to load preorders</p>;
  }

  return (
    <main>
      <LinkButton to="/phones" content="← Back to phones" />

      <h1>Preorders for phone #{id}</h1>

      {isFetching && <p>Updating...</p>}

      {preorders.length === 0 ? (
        <p>This phone has no preorders yet.</p>
      ) : (
        <div className={classes.list}>
          {preorders.map((preorder) => (
            <article key={preorder.id} className={classes.card}>
              <div className={classes.cardHeader}>
                <span className={classes.orderNumber}>
                  Preorder #{preorder.id}
                </span>

                <span
                  className={`${classes.status} ${
                    classes[preorder.status] ?? ''
                  }`}
                >
                  {preorder.status}
                </span>
              </div>

              <dl className={classes.details}>
                <div>
                  <dt>Customer phone</dt>
                  <dd>{preorder.customerPhone}</dd>
                </div>

                <div>
                  <dt>Quantity</dt>
                  <dd>{preorder.quantity}</dd>
                </div>

                <div>
                  <dt>Order date</dt>
                  <dd>{new Date(preorder.orderDate).toLocaleDateString()}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default PhonePreordersPage;
