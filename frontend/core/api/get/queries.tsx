import { getPage } from '~/api/get/index';

export const usePage = (pageEndpoint: string) => {
  return getPage(pageEndpoint);
};
