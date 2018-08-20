# React Workshop instructions

### Prerequisits

- A modern browser
- NodeJS installed (nodejs.org)

### Setting up

open terminal

- `mkdir react-workshop`
- `cd react-workshop`
- `yarn init`
- `yarn add react react-dom express compression styled-components polished`
- `yarn add --dev webpack webpack-dev-middleware babel-core babel-loader babel-preset-env babel-preset-react-app`
- `mkdir client server`

Go to your editor and open up the react workshop folder. The first things we want to do is to get a simple html page showing for our react application to render inside. To do this we need to set up a nodeJS server that will give us a html page.

- Create an `index.js` file inside the server folder
- Create a controller that will render the html markup

Add a start command to the package.json

```
  "scripts": {
    "start": "node server"
  }
```

Now you can run the server by typing `yarn start` in your terminal. Go to http://localhost:3000 in your browser and if you inspect the page you'll see a html page with a div that has the id `react-container`.

Next we need to create a basic react application that'll render into that div. To do that we need to create an index file where we'll import our application and render it. We'll need to create a basic React app for now and then pass it to the render method in the index client file.

To render a React application you need to use the React-Dom package. This package is designed to be the link between React and the DOM hance its name. React-Dom has a function called render that takes two arguments, the first being the React Application and the second being a DOM element. This function renders our JSX into HTML.

Now we have some JS and we have a html page rendered but they're not connected. To connect them we need to turn the react application into a single file called a bundle. To create this bundle we need to include webpack. Webpack will convert our easy to read JS into code more easily read by the browser.

To do this we need to first create a webpack config file. We'll only have some basic setup to get us going, we can add more configuration as we need it. So that we can write nice new JS code we'll need a parser like babel to convert the JS for browsers. To set up babel all we need to do is create a .babelrc and provide it with the two presets; env and react. Now we've got webpack and babel configs, we can use the webpack-dev-middleware in our server to generate a JS bundle. This will produce a bundle at a url we provide. We can now add that url to the markup we server render.

Start the server and go to our web app, now you can see your application loading. If you go to see your page source (not dom inspector) you'll notice that the content of your app isn't there. This is because it's not being server rendered. The React is only being loaded once the javascript is read and executed. As your app gets bigger, it'll take longer for your application to load and then render. This will cause a flash of blank content on the screen after a reload of the page. Server rendering your application stops this.

To server render we need to go back to our render function on the server and utilize React-DOM's server rendering methods. We'll render our JSX to a html string instead of DOM elements. This html string can be directly injected into our markup to send to the client. This is the first time we'll be using JSX on our server. For our client side code we're using babel to transform the JSX in webpack. As you don't bundle node code we'll need to run babel at runtime. To do this, add the following line to the very top of your index file in the server folder `require('babel-register');`.

Now that we're server rendering we'll need to properly hydrate our React application. Only using render is slower as it has to rebuild the render tree. Hydrating only updates nodes that are required.

Restart the server and now we can see the application in the page source. There's one last little part of the server rendering we haven't set up yet. Loading in our css with the html. We're going to be using styled-components for our styling and luckily, it comes with some tools to help us extract the css we need for the app and add it to the rendered markup. To do this we'll use the ServerStyleSheet class and use it to extract the css from the rendered tree. Now we've got some css we can inject that into our createMarkup function and get the css to display in the page.

Now we've got all of our server code ready we can start working on building the app. Let's start by fleshing out the markup and styling so we've got something static.

Make a new component called Battery and two styled components. Import them into your App so that you'll have something like this:

```
<Fragment>
  <Title>What is my battery?</Title>
  <Battery />
  <Level>100%</Level>
</Fragment>
```

(Fragments are what's required when you're returning more than one React component)

If you don't know what styled-components are, they're the same as React components but you generate the elements styling when you create it. For example, the Title component we need to create for the App can be generated by doing the following:

```
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  font-size: 3.1rem;
  color: $dark-pale-blue;
  margin-bottom: 4.5rem;
`;

export default Title;
```

The Battery component at this point is just an empty React component so lets start working on that. We can build each of the elements for the battery using styled components. All together it should look something like this:

```
<Wrapper>
  <Contents />
  <Face>
    <Eye left />
    <Eye right />
    <Mouth />
  </Face>
</Wrapper>
```

If you load up your app you should see some sort of fleshed out app. Now we can start working on adding functionality to the application. We can start by getting the devices battery stats. To do this we'll want to use the `navigator.getBattery()`. This function returns a promise, this means that the result of the function can come at anytime. When adding data to a React component, we typically want to do it before the component mounts. Unfortunately this can cause side effects so instead we add the data once the compounent mounts. We do this by using the lifecycle method `componentDidMount`.

```
componentDidMount() {
  navigator.getBattery()
    .then(battery => {
      this.setState(battery);
    })
    .catch(err => {
      console.error('Unable to get battery information');
    })
}
```

In React, the only way to store data within a component is to use state. You can set state in two ways; the first being on creation of the component. This is done by adding a state object to the component within its constructor.

```
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0.0
    };
  }
}
```

Doing something like we have above will force the first render of the component to use the value `0.0` instead of `undefined`. When we get data from our call to `navigator.getBattery` we use `this.setState`, this function updates our state object and causes a re-render of the application with the new state object.

The battery object has the property `level` on it. We can use this value to show the the battery percentange. As it's in our state, we can pass it as a prop down to our contents and face components. This'll allow us to use one variable within multiple components of our application.

To pass a variable as props, you add it as an attribute to the component you want to receive it.

```
<Contents level={level} />
```

Now that our components have the data we needed to change our styling depending on the battery level. We can also show the value to our users if we want. To render a variable in our page we just need to wrap the variable in curly braces.

```
<Level>{level}</Level>
```

The last thing we need to learn is how to change the styling based on our `level` prop. As most of our components are styled-components it'll be quite simple to change CSS values based on the props. As an example, we can change the background color based on the level.

```
const Wrapper = styled.div`
  background-color: ${props => props.level > 50 ? 'green' : 'orange'};
`;
```

Styled-components uses tagged template literals. This means that all the CSS we add is just a string passed through a function. It also allows us to insert our own content using template literal injection. If we use a function in the template literal then styled-components adds the props of that component to the arguments. This allows us to access any data just like a normal React component.

Now you have all the building blocks you need to build on this app and make something amazing!
