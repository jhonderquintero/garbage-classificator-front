import { serverFetch } from "./fetch";

export const getClassification = async (ip: string, image: Blob | File) : Promise<'metal' | 'paper' | 'plastic' | 'cardboard'> => {
  const url = `${ip}`;
  const formData = new FormData();
  formData.append('image', image);

  const { classification, array } = await serverFetch(
    url,
    'POST',
    { image: formData },
    { 'Content-Type': 'multipart/form-data' } // The one that multer expects on the server
  );

  console.log('Prop array:', array);
  return classification;
}