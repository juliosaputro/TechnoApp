import React from 'react';
import {FlatList, View, Text, StyleSheet, Image} from 'react-native';

const ListMenu = ({items, category}) => {
  const renderMenuItem = ({item, index}) => {
    const isLastItem = index === items.length - 1;

    const itemStyle = [styles.menuItem, !isLastItem && styles.notLastMenuItem];

    return (
      <View style={itemStyle}>
        <Image
          source={{uri: item.photo}}
          style={styles.itemImage}
          onError={e =>
            console.log('Item image load error:', e.nativeEvent.error)
          }
        />

        <View style={styles.itemContent}>
          <Text style={styles.itemText} numberOfLines={1}>
            {item.name || item.title || 'Menu Item'}
          </Text>
          {item.description && (
            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>

        {item.price !== undefined && (
          <Text style={styles.itemPrice}>{item.price}</Text>
        )}
      </View>
    );
  };

  if (!items || items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.infoText}>No items in this category.</Text>
      </View>
    );
  }

  return (
    <>
      <Text style={styles.titleCategory} numberOfLines={1}>
        {category}
      </Text>
      <FlatList
        data={items}
        renderItem={renderMenuItem}
        keyExtractor={(item, index) => item.id || item.sku || index.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E5E5E5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },
  notLastMenuItem: {
    borderBottomWidth: 0.3,
    color: '#000',
    borderStyle: 'dashed',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  titleCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    padding: 12,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  itemPrice: {
    position: 'absolute',
    top: 17,
    right: 12,
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  infoText: {
    color: 'gray',
    textAlign: 'center',
  },
});

export default ListMenu;
