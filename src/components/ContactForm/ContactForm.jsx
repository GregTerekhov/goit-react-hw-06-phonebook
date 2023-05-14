import PropTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  FormContainer,
  FormEl,
  FormLabel,
  FormInput,
  ErrorMessageForUser,
  FormButton,
} from './ContactForm.styled';

export const ContactForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit({ ...values });
      resetForm();
    },
    validationSchema: validationSchema,
  });

  return (
    <FormContainer>
      <Formik>
        <FormEl onSubmit={formik.handleSubmit}>
          <FormLabel htmlFor="name">
            Name
            <FormInput
              type="text"
              name="name"
              placeholder="Please enter name..."
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <ErrorMessageForUser name="name" component="div" />
          </FormLabel>
          <FormLabel htmlFor="number">
            Number
            <FormInput
              type="tel"
              name="number"
              placeholder="Please enter a phone number..."
              value={formik.values.number}
              onChange={formik.handleChange}
            />
            <ErrorMessageForUser name="number" component="div" />
          </FormLabel>
          <FormButton type="submit" disabled={formik.isSubmitting}>
            Add contact
          </FormButton>
        </FormEl>
      </Formik>
    </FormContainer>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
