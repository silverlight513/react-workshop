module.exports = (html, css) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Workshop</title>
  ${css}
</head>
<body>
  <div id="react-container">${html}</div>
  <script src="/static/bundle.js"></script>
</body>
</html>
`;
