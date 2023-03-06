import { Chip, ChipGroupProps } from '@mantine/core';
import { FC, useState } from 'react';

import { IProductSize } from '../../interfaces';

interface Props {
  selectedSize: IProductSize;
  sizes: IProductSize[];
}

export const SizeSelector: FC<Props & ChipGroupProps> = ({
  selectedSize,
  sizes,
  ...chipGroupProps
}) => {
  const [selected, setSelected] = useState(selectedSize);
  return (
    <Chip.Group
      value={selected}
      onChange={(value) => setSelected(value as IProductSize)}
      {...chipGroupProps}
    >
      {sizes.map((size) => (
        <Chip value={size} key={size} display="inline" mr="xs" variant="filled">
          {size}
        </Chip>
      ))}
    </Chip.Group>
  );
};
