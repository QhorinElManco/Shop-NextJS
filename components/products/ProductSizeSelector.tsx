import { Chip, ChipGroupProps } from '@mantine/core';
import { FC } from 'react';

import { IProductSize } from '@/interfaces';
import { isValidProductSize } from '@/utils/typeValidations';
import { ValidationError } from '@/utils/errors';

interface Props {
  selectedSize?: IProductSize;
  sizes: IProductSize[];
  onSelectedSize: (size: IProductSize) => void;
}

export const SizeSelector: FC<Props & ChipGroupProps> = ({
  selectedSize,
  sizes,
  onSelectedSize,
  ...chipGroupProps
}) => {
  const onChange = (value: string) => {
    if (!isValidProductSize(value)) {
      throw new ValidationError(`Invalid size: ${value}`);
    }
    onSelectedSize(value);
  };

  return (
    <Chip.Group value={selectedSize} onChange={onChange} {...chipGroupProps}>
      {sizes.map((size) => (
        <Chip value={size} key={size} display="inline" mr="xs" variant="filled">
          {size}
        </Chip>
      ))}
    </Chip.Group>
  );
};
