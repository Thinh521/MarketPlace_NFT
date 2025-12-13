import React from 'react';
import CustomHeader from '~/components/CustomNavigation/CustomHeader';

export const getHeader = ({title, subTitle = '', rightComponent = null}) => ({
  header: ({navigation}) => (
    <CustomHeader
      title={title}
      subTitle={subTitle}
      navigation={navigation}
      rightComponent={rightComponent}
    />
  ),
});
