export function tableSorter(item, property) {
  if (property === 'battery') {
    // IoTDevice table battery
    return item?.lorawanSettings?.deviceStatusBattery;
  } else if (property === 'active') {
    // IoTDevice table is active
    const arr = item?.receivedMessagesMetadata;
    return arr?.length > 0 ? arr[arr.length - 1].sentTime : null;
  } else if (property === 'login') {
    // user table is login
    return item?.lastLogin;
  } else if (property === 'latest-update') {
    // application table is latest-update
    return Date.parse(item.updatedAt).valueOf();
  } else if (property === 'last-seen') {
    if (item?.lastSeenAt == null) {
      return -1;
    }
    // gateway table is latest-seen
    return Date.parse(item.lastSeenAt).valueOf();
  } else if (property === 'organisations') {
    // permissions table is organization name
    return item?.organization?.name;
  } else if (property === 'members') {
    // permissions table member count
    return item?.users?.length;
  } else if (property === 'devices') {
    // applications table device count
    return item?.iotDevices?.length;
  } else if (property === 'payload-decoder-id') {
    // payload decoder table id
    return item?.id;
  } else {
    // Default string to be case-insensitive
    const val = item[property];
    if (typeof val == 'string') {
      return val.toLocaleLowerCase();
    }

    return val;
  }
}
