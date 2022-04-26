import { StyleSheet, Text, View, FlatList } from "react-native";
import React, {useState, useEffect} from "react";

export default function LibraryHours() {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch("http://brandaserver.herokuapp.com/getinfo/libraryHours/week")
        .then((response) => response.json( ))
        .then((json) => {
          setHours(json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData();
  },[]);

  const renderList1 = ({item}) => (
    <View style={styles}>
      <View style={styles.list1}>
        <Text style={{fontWeight:"bold",fontSize:20,color:"black"}}>{item.day}, {item.date}</Text>
      </View>
      <View style={styles.list2}>
        <FlatList
          data={item.hours}
          renderItem={renderList2}
          keyExtractor={item => item.location}
        />  
      </View>
    </View>
  );

  const renderList2 = ({item}) => (
    <View>
      <View style = {{flexDirection:"row",margin:6, padding:6}}>
        <View>
          <Text>{item.location}</Text>
        </View>
        <View style = {{flex:1, alignItems:"flex-end"}}>
          <Text>{item.times.hours == null ? "closed" : item.times.hours[0].from+" ~ "+item.times.hours[0].to}</Text>
        </View>
      </View>     
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hours}
        renderItem={renderList1}
        keyExtractor={item => item.date}
      />
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 8,
    margin: 8,
  },

  list1: {
    alignItems:"center",
    margin: 8,
  },

  list2: {
    backgroundColor: "#BBFFEE",
  },
});
