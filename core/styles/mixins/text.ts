export interface TextMixinProps {
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  size?:
    | 'main'
    | 'sub'
    | 'small'
    | 'smaller'
    | '1 rem'
    | '1.1rem'
    | '1.25rem'
    | '1.5rem'
    | '1.75rem'
    | '2rem';
}

export const textMixin = ({ weight = 400, size = 'main' }: TextMixinProps) => ({
  fontWeight: weight,
  fontSize: `${size}`,
});
