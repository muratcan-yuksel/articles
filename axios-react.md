## get request with react

```

const FirstRequest = () => {
  const fetchData = async () => {
    try {
      const response = await axios(url);
      // console.log(response);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h2 className="text-center">first request</h2>;
};
```

=> it's that simple. just response will give us everything we can look for about the request, and response.data will only give us the data requested. We also use useEffect hook to recall th fetchData function everytime the component re-renders.

---

## setting headers

### if we're posting a get request:

we'll pass a second argument like so:
axios.get(url, {})

### if we're using any other methods such as post

we'll pass the data as second argument and headers in third argument like so:
axios.post(url, {data}, {})

---

### adding headers in get request might be necessary in some APIs

we'd do it like so:

```
headers: {
  Accept: 'application/json',
}
```

PS: headers should start with a minuscule letter

## post request

it is like the get request, but after the url, we'll need to provide the actual data we want to post to the server in an object. Check this example:

```
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(url, { name: name, email: email });
      console.log(res.data);
    } catch (error) {
      console.log(error.repsonse);
    }
    console.log(name, email);
  };
```
