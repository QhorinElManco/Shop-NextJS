import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { IShippingAddress } from '@/interfaces';

export const getCookieValue = (cookieName: string): string => {
  const value = getCookie(cookieName);
  return typeof value === 'string' ? value : '';
};

export const getAddressFromCookies = (): IShippingAddress => ({
  firstName: getCookieValue('firstName'),
  lastName: getCookieValue('lastName'),
  address: getCookieValue('address'),
  address2: getCookieValue('address2'),
  country: getCookieValue('country'),
  postalCode: getCookieValue('postalCode'),
  phoneNumber: getCookieValue('phoneNumber'),
});

export const saveAddressToCookies = (address: IShippingAddress) => {
  setCookie('firstName', address.firstName);
  setCookie('lastName', address.lastName);
  setCookie('address', address.address);
  setCookie('address2', address.address2);
  setCookie('country', address.country);
  setCookie('postalCode', address.postalCode);
  setCookie('phoneNumber', address.phoneNumber);
};

export const clearAddressCookies = () => {
  deleteCookie('firstName');
  deleteCookie('lastName');
  deleteCookie('address');
  deleteCookie('address2');
  deleteCookie('country');
  deleteCookie('postalCode');
  deleteCookie('phoneNumber');
};
