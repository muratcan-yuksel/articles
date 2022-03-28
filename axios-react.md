## basic example with react

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
