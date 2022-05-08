# Satellite Vu Test

This project is hosted here: <<< ADD NETLIFY LINK>>>

Or if you want to run this project locally use the command `yarn start` after installing the dependencies.

To run the tests use `yarn test`.

# If I had more time

- If I had more time I would have liked to add UX feedback to show when the button was active to the user and when it was not active.

- I would have also liked to expand error handling potentially using React Error Boundaries to more gracefully tell the user if some data comes back in a different format than I am expecting.

- Another option I would have liked to explore would have been using React Suspense for more incremental data fetching and to have "loading" UI when the specific parts of the data is being fetched.

- If I had more time I would also liked to have properly plugged the geoTIFF data in openlayers ad had it actually display, however I have never worked with geoTIFF data and didn't want to spend the fairly limited time I had available to just get that to display.

- Another extension to this project I would have added would have been to spend the time and properly type more of the API responses and have less `any`s.

- I would also, with more time, expand the testing to better test some of the OpenLayers components. This involces setting upsome fake classes and enabling certain features in jest which would have taken up a significant portion of time. I would have wanted to have test the drawend handler method inside DrawPolygon for example.

- I would want to use Overlays in OpenLayers to have people be able to hover over the map and it display a preview rather than them having to search to see the detail.

- I would have liked to use style-components or emotion or tailwind to remove the need to inline styles throughout the app.
