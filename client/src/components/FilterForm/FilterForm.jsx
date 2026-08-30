import classes from './FilterForm.module.scss';

const FilterForm = ({
  handleSubmit,
  brandInput,
  setBrandInput,
  brand,
  handleReset,
  isFetching,
}) => {
  return (
    <form className={classes.filters} onSubmit={handleSubmit}>
      <label htmlFor="brand-filter" className={classes.filterLabel}>
        Filter by brand
      </label>

      <div className={classes.filterControls}>
        <input
          id="brand-filter"
          type="search"
          value={brandInput}
          placeholder="Samsung, Apple..."
          className={classes.filterInput}
          onChange={(event) => {
            setBrandInput(event.target.value);
          }}
        />

        <button
          type="submit"
          className={classes.filterButton}
          disabled={isFetching}
        >
          Apply
        </button>

        {brand && (
          <button
            type="button"
            className={classes.resetButton}
            disabled={isFetching}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
    </form>
  );
};

export default FilterForm;
