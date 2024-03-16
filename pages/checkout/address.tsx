import { Button, Container, Grid, Select, Space, TextInput, Title } from '@mantine/core';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { ShopLayout } from '@/components/layouts';
import { dbCountries } from '@/database';
import { useAddressForm, useCountry } from '@/hooks';

type SelectType = {
  value: string;
  label: string;
};

export const AddressPage = () => {
  const countryQuery = useCountry();
  const { form, handleError, handleSubmit } = useAddressForm();

  return (
    <ShopLayout title="Address" description="Confirm your address">
      <Title order={3}>Address</Title>
      <Space h="md" />
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <Container size="sm">
          <Grid>
            <Grid.Col span={12}>
              <TextInput label="First name" required {...form.getInputProps('firstName')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Last name" required {...form.getInputProps('lastName')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Address" required {...form.getInputProps('address')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Address 2 (Optional)" {...form.getInputProps('address2')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                required
                searchable
                label="Country"
                defaultValue={countryQuery?.data?.[0]?.code ?? ''}
                data={
                  countryQuery?.data?.map(
                    (country): SelectType => ({
                      value: country.code,
                      label: country.name,
                    })
                  ) ?? []
                }
                {...form.getInputProps('country')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Postal code" required {...form.getInputProps('postalCode')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Phone number" required {...form.getInputProps('phoneNumber')} />
            </Grid.Col>
            <Grid.Col span={12} mt="xl" className="grid-content-center">
              <Button type="submit">Review order</Button>
            </Grid.Col>
          </Grid>
        </Container>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ['countries'],
    queryFn: () => dbCountries.getAllCountries(),
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default AddressPage;
