# Sending emails with React using EmailJS

This is the library => https://www.emailjs.com/docs/examples/reactjs/

I need to sign up, they have free service.

Then I go to the admin panel => https://dashboard.emailjs.com/admin

I connect an email service (gmail in my case). Must allow "Send email on your behalf" permission during connection.

Then I go and create an email template (I'm still in the admin panel). I see it on the left bar.

The parameters I want to add and use in my application will go in mustache style => {{message}}

Example template =>

```
Hello {{to_name}},

You got a new message from {{from_name}} // {{from_email}}:

{{message}}

Best wishes,
EmailJS team
```

In order to use this service on my app, I need the following variables : `service id` , `template id` and `public key`.

I find the service id in email services section, connected to my mail address.

I find the template id in email templates section.

Lastly, I find the public key in my account section. I save all three somewhere safe. I generally use env variables for that.

## Application

In my application, I install the emailJs library with => `yarn add emailjs/browser` and

I create a form and get the following input from user: `name`, `message`,`email`.

I won't show a snippet of the form.

To the form's submit function I add the following snippet =>

```react
      emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        {
          to_name: "Murat",
          from_name: name,
          message: message,
          from_email: email,
        },
        process.env.REACT_APP_PUBLIC_KEY
      );
```

As you can see, the parameters I take are the same one's I've defined in EmailJs's email template.

That's it. I can receive 200 emails for free.
