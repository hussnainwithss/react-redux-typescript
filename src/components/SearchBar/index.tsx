import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'elements/Form';
import useQuery from 'utils/useQuery';
import { AppRoutes } from 'routes';
import { useHistory } from 'react-router';

interface InitialValuesTypes {
    search: string;
}
const SearchBar = () => {
    const history = useHistory();
    const searchkeyword = useQuery().get('search');
    const initialValues = {
        search: searchkeyword || '',
    };
    const validationSchema = Yup.object({
        search: Yup.string().max(100).required('required'),
    });
    const handleSubmit = (
        values: InitialValuesTypes,
        { setSubmitting }: { setSubmitting: any }
    ) => {
        const { search } = values;
        history.push(`${AppRoutes.SEARCH.path}/?search=${search}`);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {(isSubmitting) => (
                <Form className='d-flex'>
                    <TextField
                        name='search'
                        type='text'
                        placeholder='Search UBook'
                        errorClassName='text-warning'
                        className='mb-0'
                        disabled={!isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default SearchBar;