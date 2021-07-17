import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";

export default function ImageCarousel({ images }) {
  const windowWidth = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = useState('0');
  const onViewRef = React.useRef(({viewableItems}) => {
    setActiveIndex(viewableItems[0]?.index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.root}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth}
        decelerationRate="fast"
        snapToAlignment="center"
        data={images}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item }}
            key={(item) => `${item}-${index}`}
            style={[styles.image, { width: windowWidth - 20 }]}
          />
        )}
      />
      <View style={styles.dots}>
        {images?.map((image,index) => (
          <View style={[styles.dot,{backgroundColor: activeIndex === index?'#c9c9c9':'#ededed'}]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  image: {
    height: 250,
    resizeMode: "contain",
    margin: 10,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: "#ededed",
    borderColor: "#c9c9c9",
    margin: 5,
  },
});
