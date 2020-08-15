const base = process.env.REACT_APP_BASE_URL;
module.exports = {
  LINK: base + 'common/companies/:companyId/images/:imgId',
  BASE_URL: process.env.REACT_APP_BASE_URL,
  IMAGE_URL: process.env.REACT_APP_BASE_URL + 'common/companies/',
};
