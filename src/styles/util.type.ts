import {FlattenInterpolation, ThemedStyledProps} from 'styled-components';
import {BasicTheme} from './theme.type';

export type StyledProps<T> = ThemedStyledProps<T, BasicTheme>;

export type StyledReturnType<T> = FlattenInterpolation<StyledProps<T>>;
