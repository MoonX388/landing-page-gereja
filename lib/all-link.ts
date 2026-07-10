import axios from 'axios';

const demo = axios.create({
  baseURL: 'https://demo.gerejapintar.id',
});

const docs = axios.create({
  baseURL: 'https://docs.gerejapintar.id',
});

export { demo, docs };
