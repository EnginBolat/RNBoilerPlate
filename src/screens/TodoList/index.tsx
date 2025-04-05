import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { useGetTodosQuery } from '@store/slice/newRequestSlice';
import { styles } from './styles';
import { Todo } from '@models/todo-model';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainNavigationStackType } from '@stacks/MainNavigationStack';

const TodoList = () => {
  const { data, isLoading } = useGetTodosQuery();
  const navigation = useNavigation<NativeStackNavigationProp<MainNavigationStackType>>();
  const navigateToDetails = (id: string) => navigation.navigate('TodoDetails', { id: id });

  const renderItem = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      style={{ borderWidth: 1, paddingHorizontal: 12, paddingVertical: 18 }}
      onPress={() => navigateToDetails(item.id.toString())}>
      <Text>{item?.id ?? 'id null'}</Text>
      <Text>{item?.title ?? 'title null'}</Text>
      <Text>{item?.completed.toString() ?? 'completed null'}</Text>
      <Text>{item?.userId ?? 'userId null'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={20}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default TodoList;
