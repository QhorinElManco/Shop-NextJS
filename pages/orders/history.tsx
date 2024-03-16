import { Anchor, Badge, Space, Table, Title } from '@mantine/core';
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession, Session } from 'next-auth';
import NextLink from 'next/link';

import authOptions from '@/pages/api/auth/[...nextauth]';
import { IOrder } from '@/interfaces';
import { dbOrders, dbUsers } from '@/database';
import { ShopLayout } from '@/components/layouts';

interface HistoryPageProps {
  orders: IOrder[];
}

const HistoryPage: NextPage<HistoryPageProps> = ({ orders }) => {
  const columns = ['ID', 'Fullname', 'Status', 'Order'];

  const rows = orders.map((order, index) => ({
    id: index + 1,
    order_id: order._id,
    paid: order.isPaid,
    fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
  }));

  return (
    <ShopLayout title="Order history" description="Customer order history">
      <Title order={3}>Order history</Title>
      <Space h="md" />
      <Table className="fade" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={column}>{column}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((row) => (
            <Table.Tr key={row.order_id}>
              <Table.Td>{row.id}</Table.Td>
              <Table.Td>{row.fullName}</Table.Td>
              <Table.Td>
                {row.paid ? (
                  <Badge color="green" variant="filled">
                    Paid
                  </Badge>
                ) : (
                  <Badge color="red" variant="filled">
                    Not paid
                  </Badge>
                )}
              </Table.Td>
              <Table.Td>
                <Anchor component={NextLink} href={`/orders/${row.order_id}`} underline="always">
                  {row.order_id}
                </Anchor>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };
  }

  const user = await dbUsers.getUserByEmail(session.user!.email!);
  const orders = await dbOrders.getOrdersByUserId(user?.id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
