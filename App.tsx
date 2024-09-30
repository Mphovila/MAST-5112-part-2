import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct Picker import

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  course: string;
}

const App = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [course, setCourse] = useState<string>('Starters');

  // Add menu item to the list
  const addMenuItem = () => {
    if (name && description && price && course) {
      const newItem: MenuItem = {
        id: menuItems.length + 1,
        name,
        description,
        price: parseFloat(price),
        course,
      };
      setMenuItems([...menuItems, newItem]);
      // Reset input fields
      setName('');
      setDescription('');
      setPrice('');
      setCourse('Starters');
    }
  };

  // Remove menu item from the list
  const removeMenuItem = (id: number) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('./img/olivia cooks (1).png')} // Make sure the logo image is located in the assets folder
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.header}>Prepared Menu</Text>

      {/* Display the total number of menu items */}
      <Text style={styles.totalMenuItems}>
        Total Menu Items: {menuItems.length}
      </Text>

      {/* ScrollView to avoid layout issues with overflowing content */}
      <ScrollView>
        {/* Display menu items */}
        {menuItems.length === 0 ? (
          <Text style={styles.noItemsText}>No menu items yet. Add some below!</Text>
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Course: {item.course}</Text>
                <Text>Price: ${item.price.toFixed(2)}</Text>
                {/* Remove button for each item */}
                <TouchableOpacity style={styles.removeButton} onPress={() => removeMenuItem(item.id)}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>

      {/* Add New Menu Item Section */}
      <Text style={styles.header}>Add New Menu Item</Text>
      <TextInput
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Predefined list of courses using Picker */}
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalMenuItems: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noItemsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#ff3333',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;

