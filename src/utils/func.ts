export const isEmptyArray = (arr: []) => {
  if (!Array.isArray(arr)) {
    return false;
  }
  return arr.length === 0;
};

export const isEmptyObj = (obj: {[index: string | number] : any}) => Object.keys(obj).length === 0;

export const deletePropsFromObj = (
  obj: {[index: string | number] : any},
  ...props: Array<string | number>
) => {
  const ret: {[index: string | number] : any} = { ...obj };
  props.forEach((prop) => delete ret[prop]);

  return ret;
};

// URL to File object
export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};
