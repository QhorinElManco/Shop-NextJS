import { Anchor, Badge, Space, Table, Title } from '@mantine/core';
import { dbOrders, dbUsers } from 'database';
import { IOrder } from 'interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { Session, getServerSession } from 'next-auth';
import NextLink from 'next/link';
import authOptions from 'pages/api/auth/[...nextauth]';
import { ShopLayout } from '../../components/Layouts';

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
      <Table highlightOnHover withBorder className="fade">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.order_id}>
              <td>{row.id}</td>
              <td>{row.fullName}</td>
              <td>
                {row.paid ? (
                  <Badge color="green" variant="filled">
                    Paid
                  </Badge>
                ) : (
                  <Badge color="red" variant="filled">
                    Not paid
                  </Badge>
                )}
              </td>
              <td>
                <Anchor component={NextLink} href={`/orders/${row.order_id}`} underline>
                  {row.order_id}
                </Anchor>
              </td>
            </tr>
          ))}
        </tbody>
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
