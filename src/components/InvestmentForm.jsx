// src/components/InvestmentForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  lump_sum: yup
    .number()
    .typeError('Lump sum must be a number')
    .required('Lump sum is required')
    .positive('Lump sum must be positive'),
  cagr: yup
    .number()
    .typeError('CAGR must be a number')
    .required('CAGR is required')
    .positive('CAGR must be positive'),
  years: yup
    .number()
    .typeError('Years must be a number')
    .required('Number of years is required')
    .integer('Years must be an integer')
    .positive('Years must be positive'),
  yearly_addition: yup
    .number()
    .typeError('Yearly addition must be a number')
    .required('Yearly addition is required')
    .positive('Yearly addition must be positive'),
});

const InvestmentForm = ({ onCalculate }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // Validate on change for real-time feedback
  });

  const onSubmit = (data) => {
    onCalculate(data);
  };

  // Real-time calculation (optional)
  const watchAllFields = watch();

  React.useEffect(() => {
    // Only trigger onCalculate if the form is valid and all fields are filled
    if (isValid && Object.values(watchAllFields).every(value => value !== '')) {
      onCalculate(watchAllFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchAllFields, isValid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-gray-700 dark:text-gray-200">Lump Sum Amount:</label>
        <input
          type="number"
          step="0.01"
          {...register('lump_sum')}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.lump_sum
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700`}
        />
        {errors.lump_sum && <p className="text-red-500 text-sm mt-1">{errors.lump_sum.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200">CAGR (%):</label>
        <input
          type="number"
          step="0.1"
          {...register('cagr')}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.cagr
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700`}
        />
        {errors.cagr && <p className="text-red-500 text-sm mt-1">{errors.cagr.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200">Number of Years:</label>
        <input
          type="number"
          {...register('years')}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.years
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700`}
        />
        {errors.years && <p className="text-red-500 text-sm mt-1">{errors.years.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200">Yearly Addition:</label>
        <input
          type="number"
          step="0.01"
          {...register('yearly_addition')}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.yearly_addition
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700`}
        />
        {errors.yearly_addition && <p className="text-red-500 text-sm mt-1">{errors.yearly_addition.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Calculate
      </button>
    </form>
  );
};

export default InvestmentForm;
