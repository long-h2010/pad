import { format, getTime, formatDistanceToNow } from 'date-fns';

export function fDate(date: Date | number | string | null | undefined, newFormat?: string): string {
    const fm = newFormat || 'dd MMM yyyy';
    return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: Date | number | string | null | undefined, newFormat?: string): string {
    const fm = newFormat || 'dd MMM yyyy p';
    return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: Date | number | string | null | undefined): number | string {
    return date ? getTime(new Date(date)) : '';
}

export function fTime(date: Date | number | string | null | undefined, newFormat?: string): string {
    const fm = newFormat || 'hh:mm';
    return date ? format(new Date(date), fm) : '';
}

export function fToNow(date: Date | number | string | null | undefined): string {
    return date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : '';
}
