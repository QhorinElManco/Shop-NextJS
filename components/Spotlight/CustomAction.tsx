import { Group, Image, rem, Text, UnstyledButton } from '@mantine/core';
import { SpotlightActionProps } from '@mantine/spotlight';
import { useQueryClient } from '@tanstack/react-query';
import { IProduct } from 'interfaces';
import { fetcher } from 'utils/request';

export const CustomActionComponent = ({
  action,
  styles,
  hovered,
  onTrigger,
  ...others
}: SpotlightActionProps) => {
  const queryClient = useQueryClient();

  const prefetchProduct = () =>
    queryClient.prefetchQuery(['product', action.slug], () =>
      fetcher<IProduct>(`/api/products/${action.slug}`, {})
    );

  return (
    <UnstyledButton
      sx={(theme) => ({
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: `${rem(10)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        ...theme.fn.hover({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
        }),

        '&[data-hovered]': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
        },
      })}
      data-hovered={hovered || undefined}
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      onMouseEnter={action?.slug === 'slug_temporal' ? undefined : prefetchProduct}
      {...others}
    >
      <Group noWrap>
        <Image src={`/products/${action.image}`} alt={action.title} width={50} height={50} />

        {action?.slug === 'see_all_results' ? (
          <div style={{ flex: 1 }}>
            <Text>{action.title}</Text>

            {action.description && (
              <Text size="sm" color="gray">
                {action.description}
              </Text>
            )}
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <Text>{action.title}</Text>

            {action.price && (
              <Text size="sm" color="gray">
                ${action.price}
              </Text>
            )}
          </div>
        )}
      </Group>
    </UnstyledButton>
  );
};
