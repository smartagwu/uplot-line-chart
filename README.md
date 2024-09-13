# uPlot Chart App

An app that renders a visual representation of an uploaded CSV file. This app also allows you to configure animate the chart.

To note, fields run validation on their values before storing in the app state. Start index can not have a value equal or greater than the size of window and the size of window can not be equal or smaller than the start index.

Fields can not be empty and a csv file must be uploaded before the chart can animate and increment.

## Sample Dataset
https://drive.google.com/file/d/1ko5tJqJaNzXKySf8HNKhOqO6gB9cnsN4/view?usp=sharing

## Downsampling

The prpject downsamples uploaded dataset at a threshold of 10,000 datapoints

### Install Project Dependencies

To install, clone the project and run

```bash
npm install
```

### Start Project

To start the project, run

```bash
npm run dev
```

Then go to http://localhost:4000 on your browser to view the app

### Building The Project

To bundle the project for production, run

```bash
npm run build
```

### Formatting The Project

The project requires Prettier and ESLint installed. It is generally recommended to format on save. To format run

```bash
npm run format
```

You wll be required to format the project before adding a commit.
