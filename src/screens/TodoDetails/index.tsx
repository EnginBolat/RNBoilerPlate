import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useGetTodoByIdQuery } from '@store/slice/newRequestSlice';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainNavigationStackType } from '@stacks/MainNavigationStack';
import { styles } from './styles';

const TodoDetails = () => {
  const root = useRoute<RouteProp<MainNavigationStackType, 'TodoDetails'>>();
  const { id } = root.params;
  const { data, isLoading } = useGetTodoByIdQuery(id);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>{data?.id ?? 'id null'}</Text>
          <Text>{data?.title ?? 'title null'}</Text>
          <Text>{data?.completed.toString() ?? 'completed null'}</Text>
          <Text>{data?.userId ?? 'userId null'}</Text>
        </>
      )}
    </View>
  );
};

export default TodoDetails;
