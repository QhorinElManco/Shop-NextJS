import { hasLength, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

import { cookieHelper } from '@/utils';
import { useCartContext } from '@/hooks';
import { IShippingAddress } from '@/interfaces';

export const useAddressForm = () => {
  const router = useRouter();
  const { updateShippingAddress } = useCartContext();

  const form = useForm<IShippingAddress>({
    validateInputOnChange: true,
    initialValues: cookieHelper.getAddressFromCookies(),

    validate: {
      firstName: hasLength({ min: 2 }, 'First name must be at least 2 characters long'),
      lastName: hasLength({ min: 2 }, 'Last name must be at least 2 characters long'),
      address: hasLength({ min: 1 }, 'Address is required'),
      country: hasLength({ min: 2 }, 'Select a country'),
      postalCode: hasLength({ min: 5 }, 'Postal code is required'),
    },
  });

  const handleSubmit = async (values: IShippingAddress) => {
    cookieHelper.saveAddressToCookies(values);
    updateShippingAddress(values);
    await router.push('/checkout/summary');
  };

  const handleError = () =>
    notifications.show({
      id: 'address-form',
      message: 'Be sure to fill out the form',
      color: 'red',
    });

  return { form, handleSubmit, handleError };
};
