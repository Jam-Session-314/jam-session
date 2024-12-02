import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddSessionSchema = Yup.object({
  location: Yup.string().required(),
  time: Yup.date().required(),
  musicalType: Yup.string().required(),
  desiredCapabilities: Yup.string().required(),
  organizerContact: Yup.string().required(),
  owner: Yup.string().required(),
});

export const EditSessionSchema = Yup.object({
  id: Yup.number().required(),
  location: Yup.string().required(),
  time: Yup.date().required(),
  musicalType: Yup.string().required(),
  desiredCapabilities: Yup.string().required(),
  organizerContact: Yup.string().required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditUserSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  instruments: Yup.string().required('Instruments are required'),
  bio: Yup.string().required('Bio is required'),
  genre: Yup.string().required('Genre is required'),
});
