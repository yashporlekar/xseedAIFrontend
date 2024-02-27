type MessagesType = any;

export function flattenMessages(nestedMessages: any, prefix = ''): MessagesType {
  return Object.keys(nestedMessages).reduce((flattened, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      flattened[prefixedKey] = value;
    } else {
      Object.assign(flattened, flattenMessages(value, prefixedKey));
    }
    return flattened;
  }, {} as MessagesType)}