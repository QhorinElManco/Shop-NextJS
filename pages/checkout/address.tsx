import { Button, Container, Grid, Select, Space, TextInput, Title } from '@mantine/core';
import { ShopLayout } from 'components/Layouts';

const countries = [
  {
    value: 'Honduras',
    label: 'Honduras',
  },
  {
    value: 'El Salvador',
    label: 'El Salvador',
  },
  {
    value: 'Guatemala',
    label: 'Guatemala',
  },
  {
    value: 'Nicaragua',
    label: 'Nicaragua',
  },
  {
    value: 'Costa Rica',
    label: 'Costa Rica',
  },
];

const regions = [
  {
    value: 'Francisco Morazán',
    label: 'Francisco Morazán',
  },
  {
    value: 'Cortés',
    label: 'Cortés',
  },
];
const cities = [
  {
    value: 'Tegucigalpa',
    label: 'Tegucigalpa',
  },
  {
    value: 'San Pedro Sula',
    label: 'San Pedro Sula',
  },
];

export const AddressPage = () => (
  <ShopLayout title="Address" description="Confirm your address">
    <Title order={3}>Address</Title>
    <Space h="md" />
    <Container size="sm">
      <Grid>
        <Grid.Col xs={12} sm={6}>
          <TextInput label="First name" withAsterisk />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput label="Last name" withAsterisk />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput label="Address" withAsterisk />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput label="Address 2 (optional)" />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <Select label="Country" withAsterisk value="Honduras" data={countries} />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <Select label="Region" withAsterisk value="Francisco Morazán" data={regions} />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <Select label="City" withAsterisk value="Tegucigalpa" data={cities} />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput label="Postal Code" withAsterisk />
        </Grid.Col>

        <Grid.Col xs={12} sm={6}>
          <TextInput label="Phone number" withAsterisk />
        </Grid.Col>

        <Grid.Col xs={12} mt="xl" className="grid-content-center">
          <Button>Review order</Button>
        </Grid.Col>
      </Grid>
    </Container>
  </ShopLayout>
);

export default AddressPage;
