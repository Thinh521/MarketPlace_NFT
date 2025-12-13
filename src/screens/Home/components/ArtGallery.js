import React from 'react';
import {View, StyleSheet} from 'react-native';

import ProductList from '~/components/Product/ProductList';
import SectionTitle from '~/components/SectionTitle/SectionTitle';

import {productsData} from '~/data/productsData';

const ArtGallery = () => {
  return (
    <View style={styles.container}>
      <SectionTitle leftText="OUR ARTWORK" rightText="GALLERY" />

      <View style={styles.featuredSection}>
        <ProductList products={productsData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ArtGallery;
