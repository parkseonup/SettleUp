export default function getFilteredProps(props: { [key: string]: any }, filterList: string[]) {
  const filteredProps: { [key: string]: any } = {};

  Object.entries(props).forEach(([key, value]) => {
    if (!filterList.includes(key)) filteredProps[key] = value;
  });

  return filteredProps;
}
