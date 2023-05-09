function toValue(mix: any): string {
  if (typeof mix === 'string' || typeof mix === 'number') {
    return String(mix);
  }

  if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      return mix.filter(Boolean).map(toValue).join(' ');
    }

    return Object.keys(mix)
      .filter((k) => mix[k])
      .join(' ');
  }

  return '';
}

export function classNames(...args: any[]): string {
  return args.filter(Boolean).map(toValue).join(' ');
}
