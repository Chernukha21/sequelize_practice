import classes from './Pagination.module.scss';

function Pagination({ pagination, page, isFetching, onPageChange }) {
  return (
    <div className={classes.pagination}>
      <button
        type="button"
        disabled={page <= 1 || isFetching}
        onClick={() => {
          onPageChange(page - 1);
        }}
      >
        ← Previous
      </button>

      <div className={classes.pageInfo}>
        <span>
          Page {pagination.page} of {Math.max(pagination.totalPages, 1)}
        </span>

        <small>{pagination.total} phones</small>
      </div>

      <button
        type="button"
        disabled={page >= pagination.totalPages || isFetching}
        onClick={() => {
          onPageChange(page + 1);
        }}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
