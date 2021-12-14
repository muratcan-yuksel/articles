<h2>The basic option to start with vue.js (is just like bootstrap)<h2>
they have a CDN in their installation page => <script src="https://unpkg.com/vue@next"></script>
You just add that as a script to yout html file
------------
Create a component with Vue.createApp as so:

const app = Vue.createApp({
// template: "<h2>I'm the template </h2>",
data() {
return {
title: "empire strikes back",
};
},
});
//mount that app to this html element with and id of "app"
app.mount("#app");
THe html element above is defined in index.html as a basic div with the id of app
Now, whatever we write inside the const app component, it'll be rendered to only that div with the id of app
and say, when I wish to include the title key in my code, I go to index.html and find the div with the ID of app

   <div id="app">
      <h1>I'm the template now</h1>
      <p>{{ title}}</p>
    </div>

As you see, I can include or exclude anything that's in the data() function (that returns an object) by simply integrating the object key into an html element with double curly brackets as I did in the like 22.
