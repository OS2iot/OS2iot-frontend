export function tableSorter(item, property) {
  if (property === 'battery') {
    // IoTDevice table battery
    return item?.lorawanSettings?.deviceStatusBattery;
  } else if (property === 'active') {
    // IoTDevice table is active
    const arr = item?.receivedMessagesMetadata;
    return arr?.length > 0 ? arr[arr.length - 1].sentTime : null;
  } else {
    // Default string to be case-insensitive
    const val = item[property];
    if (typeof val == 'string') {
      return val.toLocaleLowerCase();
    }

    return val;
  }
}
