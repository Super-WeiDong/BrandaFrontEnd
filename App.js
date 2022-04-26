import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity,FlatList } from 'react-native';
import { Button,Provider as PaperProvider,Checkbox } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "./components/About";
import ItemDetail from "./components/ItemDetail";
import LibraryHours from "./components/LibraryHours";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import {useState,useEffect} from "react";
import moment from 'moment';



let Root = createNativeStackNavigator();
const Home = () =>{
  const todoJson = require("./todo.json").todo;
  const [num, setNum] = useState(0);
  const [todoData, setTodoData] = useState([]);
  const [fresh,setFresh] = useState(false);
  const result = todoData.filter(todo => todo.done === false);
  const [mark,setMark] = useState(false);

  useEffect(() => {
    setTodoData(todoJson)
  }, []);

  function markItemDone(index){
    let todoCopy = todoData;
    todoCopy[index].done = !todoCopy[index].done;
    setTodoData(todoCopy);
    setFresh(!fresh);
  }
  const renderItem = ({ item }) => (
    <View style = {styles.line}>
      <Checkbox
      status={item.done? "checked" : "unchecked"}
        onPress={() => {
          markItemDone(todoData.indexOf(item));
        }}
      />
      <Text>{item.name}</Text>
      <Text>  {moment(item.due).format("ddd, MM Do YYYY")}</Text>
      <Text>  {moment(item.due).fromNow()}</Text>
    </View>
  );

  
  return (
    <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={mark?todoData:result}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            extraData = {fresh}
          />
        </View>
        
        <Button mode={"contained"} onPress={() => setMark(!mark)}>
          Show or Hide Checked-off Items
        </Button>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <Text>Num is {num}</Text>
        <View style={styles.buttons}>
          <Button mode={"contained"} onPress={() => setNum(num +1 )}>
            Increase num by 1.
          </Button>
          <Text></Text>
          <Button mode={"contained"} onPress={() => setNum(num -2 )}>
            Decrease num by 2.
          </Button>
          <Text></Text>
          <Button mode={"contained"} onPress={() => setNum(num *2 )}>
            Double.
          </Button>
        </View>
    </View>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen name={"Home"} 
                        component={Home}
                        options={({ navigation }) => ({
                          headerRight: () => (
                            <View style = {styles.right}>
                              <TouchableOpacity style = {styles.right} onPress={() => navigation.navigate('About')}>
                                <Text style = {styles.text}>About</Text>
                                <Ionicons name="md-checkmark-circle" size={32} color="green"/>
                              </TouchableOpacity>
                            </View>
                          )
                        })
                      }
                      />
          <Root.Screen name={"About"} 
                       component={About}
                       options={({ navigation }) => ({
                        headerRight: () => (
                          <View style = {styles.right}>
                            <TouchableOpacity style = {styles.right} onPress={() => navigation.navigate('LibraryHours')}>
                              <Text style = {styles.text}>LibraryHours</Text>
                              <Ionicons name="md-checkmark-circle" size={32} color="green"/>
                            </TouchableOpacity>
                          </View>
                        )
                      })
                    }
                    />
          <Root.Screen name={"Item Detail"} component={ItemDetail}/>
          <Root.Screen name={"LibraryHours"} component={LibraryHours}/>
        </Root.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  right:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  text:{
    letterSpacing: 2,
    fontSize: 18,
  },
  buttons:{
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: "center",
  },
  line:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  list:{
    height:150,
  }
});
