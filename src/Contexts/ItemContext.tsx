import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import { FeatureCollection, featureCollection } from "@turf/helpers";

const ItemContext = createContext<any>({});

export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FeatureCollection>();

  useEffect(() => {
    const fetchData = async () => {
      const { data: collection } = await axios.get(
        "https://stac.satellitevu.com/satellitevu-public/collection.json"
      );

      const items = collection.links.filter((link: any) => link.rel === "item");
      const features = await Promise.all(
        items.map(async (item: any) => {
          const { data: feature } = await axios.get(item.href);
          feature.properties.title = item.title; // title is not available on the individual item href so copy it from the collection item
          feature.properties.assets = item.assets; // when converting between geoJSON here -> OL for the map -> geojson at the other side assets is being stripped by OL
          return feature;
        })
      );

      features.forEach(
        (feature) => (feature.properties.assets = feature.assets) // when converting between geoJSON here -> OL for the map -> geojson at the other side assets is being stripped by OL
      );

      setData(featureCollection(features));
    };

    fetchData();
  }, []);

  return <ItemContext.Provider value={data}>{children}</ItemContext.Provider>;
};

export const useItems = () => {
  const items = useContext(ItemContext);
  return items;
};
