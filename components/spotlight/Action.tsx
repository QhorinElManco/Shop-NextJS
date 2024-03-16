import { Group, Image, Text } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { IProduct } from 'interfaces';
import { fetcher } from 'utils/request';
import { Spotlight } from '@mantine/spotlight';

export const Action = ({ slug, onTrigger, image, title, description, price }: ActionData) => {
  const queryClient = useQueryClient();

  const prefetchProduct = () =>
    queryClient.prefetchQuery({
      queryKey: ['product', slug],
      queryFn: () => fetcher<IProduct>(`/api/products/${slug}`, {}),
    });

  return (
    <Spotlight.Action
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      onMouseEnter={slug === 'see_all_results' ? undefined : prefetchProduct}
    >
      <Group wrap="nowrap">
        <Image src={`/products/${image}`} alt={title} width={50} height={50} />

        {slug === 'see_all_results' ? (
          <div style={{ flex: 1 }}>
            <Text>{title}</Text>

            {description && (
              <Text size="sm" c="gray">
                {description}
              </Text>
            )}
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <Text>{title}</Text>

            {price && (
              <Text size="sm" c="gray">
                ${price}
              </Text>
            )}
          </div>
        )}
      </Group>
    </Spotlight.Action>
  );
};
