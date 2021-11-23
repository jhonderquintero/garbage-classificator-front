import { serverFetch } from "./fetch";

export const getClassification = async (ip: string, image: Blob | File) : Promise<'metal' | 'paper' | 'plastic' | 'cardboard'> => {
  const url = `${ip}`;
  const formData = new FormData();
  formData.append('image', image);

  const { classification, array } = await fetch(url, {
    method: 'POST',
    body: formData,
  }).then((data) => data.json());

  console.log('Prop array:', array);
  return classification;
}