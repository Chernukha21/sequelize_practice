import {
  useDeletePhoneMutation,
  useGetPhonesQuery,
  useUpdatePhoneMutation,
} from '../../store/phonesApi.js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PhoneCard from '../PhoneCard/PhoneCard.jsx';
import LinkButton from '../LinkButton/LinkButton.jsx';
import FilterForm from '../FilterForm/FilterForm.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import classes from './PhonesList.module.scss';

const PHONES_PER_PAGE = 6;

function PhonesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [updatingPhoneId, setUpdatingPhoneId] = useState(null);
  const [deletingPhoneId, setDeletingPhoneId] = useState(null);
  const pageFromUrl = Number(searchParams.get('page'));

  const page =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const brand = searchParams.get('brand') ?? '';

  const [brandInput, setBrandInput] = useState(brand);

  useEffect(() => {
    setBrandInput(brand);
  }, [brand]);

  const offset = (page - 1) * PHONES_PER_PAGE;

  const {
    data = {
      phones: [],
      pagination: null,
    },
    isLoading,
    isFetching,
    error: loadError,
  } = useGetPhonesQuery({
    limit: PHONES_PER_PAGE,
    offset,
    brand,
  });

  const { phones, pagination } = data;

  const [deletePhone, { isLoading: isDeleting }] = useDeletePhoneMutation();

  const [updatePhone, { isLoading: isUpdating }] = useUpdatePhoneMutation();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this phone?'
    );

    if (!confirmed) {
      return;
    }

    setDeletingPhoneId(id);

    try {
      await deletePhone(id).unwrap();
    } catch (error) {
      window.alert(error.data?.message ?? 'Failed to delete phone');
    } finally {
      setDeletingPhoneId(null);
    }
  };

  const handleEdit = async (phone) => {
    setUpdatingPhoneId(phone.id);

    try {
      await updatePhone({
        id: phone.id,
        changes: {
          hasNfc: !phone.hasNfc,
        },
      }).unwrap();
    } catch (error) {
      window.alert(error.data?.message ?? 'Failed to update phone');
    } finally {
      setUpdatingPhoneId(null);
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();

    const nextParams = new URLSearchParams();

    const preparedBrand = brandInput.trim();

    nextParams.set('page', '1');

    if (preparedBrand) {
      nextParams.set('brand', preparedBrand);
    }

    setSearchParams(nextParams);
  };

  const handleResetFilter = () => {
    setBrandInput('');

    setSearchParams({
      page: '1',
    });
  };

  const handlePageChange = (nextPage) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('page', String(nextPage));

    setSearchParams(nextParams);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <div className={classes.centerText}>
        <span className={classes.spinner} />
        Loading phones...
      </div>
    );
  }

  if (loadError) {
    return (
      <p className={classes.errorText}>
        Failed to load phones. Please try again later.
      </p>
    );
  }

  return (
    <div className={classes.container}>
      <nav>
        <LinkButton to="/" content="Back" />
      </nav>

      <div className={classes.header}>
        <h2 className={classes.title}>Stored Devices</h2>

        {isFetching && <span className={classes.updatingTag}>Updating...</span>}
      </div>

      <FilterForm
        handleSubmit={handleFilterSubmit}
        brandInput={brandInput}
        brand={brand}
        setBrandInput={setBrandInput}
        handleReset={handleResetFilter}
        isFetching={isFetching}
      />

      {phones.length === 0 ? (
        <p className={classes.noData}>
          {brand
            ? `No phones found for "${brand}"`
            : 'No phones found. Add your first device!'}
        </p>
      ) : (
        <div className={classes.grid}>
          {phones.map((phone) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={isDeleting && deletingPhoneId === phone.id}
              isUpdating={isUpdating && updatingPhoneId === phone.id}
            />
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 0 && (
        <Pagination
          page={page}
          pagination={pagination}
          onPageChange={handlePageChange}
          isFetching={isFetching}
        />
      )}
    </div>
  );
}

export default PhonesList;
