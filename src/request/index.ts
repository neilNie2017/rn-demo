import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

const alovaInstace = createAlova({
  requestAdapter: adapterFetch,
  responded: response => response.json(),
});

export default alovaInstace;
