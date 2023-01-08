import React from 'react';
import { Anchor, Badge, Space, Table, Title } from '@mantine/core';
import NextLink from 'next/link';
import { ShopLayout } from '../../components/Layouts';

const HistoryPage = () => {
  const rows = [
    {
      id: 1,
      order: 'ABC456',
      paid: true,
      fullName: 'Maynor Pineda',
    },
    {
      id: 1,
      order: 'ABC456',
      paid: true,
      fullName: 'Fernando Herrara',
    },
    {
      id: 1,
      order: 'ABC456',
      paid: false,
      fullName: 'Jose Pineda',
    },
    {
      id: 1,
      order: 'ABC456',
      paid: true,
      fullName: 'Bismarck Martínez',
    },
    {
      id: 1,
      order: 'ABC456',
      paid: true,
      fullName: 'Jared Castro',
    },
  ];
  const columns = ['ID', 'Fullname', 'Status', 'Order'];
  return (
    <ShopLayout title="Order history" description="Customer order history">
      <Title order={3}>Order history</Title>
      <Space h="md" />
      <Table highlightOnHover withBorder>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.order}>
              <td>{row.id}</td>
              <td>{row.fullName}</td>
              <td>
                {row.paid ? (
                  <Badge color="green" variant="outline">
                    Paid
                  </Badge>
                ) : (
                  <Badge color="red" variant="outline">
                    Not paid
                  </Badge>
                )}
              </td>
              <td>
                <Anchor component={NextLink} href={`/orders/${row.order}`} underline>
                  {row.order}
                </Anchor>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ShopLayout>
  );
};

export default HistoryPage;
