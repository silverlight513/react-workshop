const React = require('react');
const { renderToString } = require('react-dom/server');
const { ServerStyleSheet } = require('styled-components');
const App = require('../../client/App').default;
const createMarkup = require('./create-markup');

const render = (req, res) => {
  const sheet = new ServerStyleSheet();
  const html = renderToString(<App />); // Note this has to be passed as JSX
  const css = sheet.getStyleTags();
  const markup = createMarkup(html, css);

  res.send(markup);
};

module.exports = render;
