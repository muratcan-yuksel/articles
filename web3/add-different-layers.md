Say that you have the following configuration

```
const layerConfigurations = [
  {
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
  },
];
```

but you want to add another layer so that bottom lid will be of a different color, like gold. You have the relevant files and all.

What you'll down is easy: You'll just coype past the above config, replace the bottom lid part with bottom lid gold, and change the `growEditionSizeTo` to 20, or 15, or 11, anything bigger than the initial number so that it'll create the first one, and continue with creating the second one. As such =>

```
const layerConfigurations = [
  {
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
  },
   {
    growEditionSizeTo: 20,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
  },
];
```

If I added another layer, with bottom lid dark option, and wanted that layer to create, say, only 5 artworks, I'd have to give `growEditionSizeTo: 25` . This is because with each iteration, we add the new ones minus the old ones.

Like so =>

```
const layerConfigurations = [
  {
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
  },
   {
    growEditionSizeTo: 20,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid gold" },
      { name: "Top lid" },
    ],
  },
  {
    growEditionSizeTo: 25,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid dark" },
      { name: "Top lid" },
    ],
  },
];
```
