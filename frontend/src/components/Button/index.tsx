import { ComponentPropsWithRef } from 'react';

import styled from '@emotion/styled';

import { ColorList, SizeList, VariantList } from 'type/style';

type Props = {
  variant?: VariantList;
  size?: SizeList;
  color?: ColorList;
} & ComponentPropsWithRef<'button'>;

export default function Button({
  variant = 'primary',
  size = 'medium',
  color = 'primary',
  children,
  ...rest
}: Props) {
  return (
    <S.Button variant={variant} size={size} color={color} {...rest}>
      {children}
    </S.Button>
  );
}

const S = {
  Button: styled.button<{ variant: VariantList; size: SizeList; color: ColorList }>`
    ${({ theme, size }) => theme.size.button[size]}
    border-radius: 4px;

    background-color: ${({ theme, variant }) => theme.colors.button[variant]};
    color: ${({ theme, color }) => theme.colors.button.text[color]};
    font-family: 'BMHANNApro';
  `,
};
