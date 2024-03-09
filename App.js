import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  View,
  SafeAreaView,
} from "react-native";

const Demo = () => {
  return (
    <View style={styles.todoListItemContainer}>
      <Text>Hello</Text>
      <View style={styles.listItemButtons}>
        <Pressable>
          <Text style={{ color: "green", fontWeight: "bold" }}>Edit</Text>
        </Pressable>
        <Pressable>
          <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};
const ListItem = ({ item, index, editTask, deleteTask }) => {
  return (
    <View style={styles.todoListItemContainer}>
      <Text>{item}</Text>
      <View style={styles.listItemButtons}>
        <Pressable onPress={() => editTask(index, item)}>
          <Text style={{ color: "green", fontWeight: "bold" }}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => deleteTask(item)}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");
  const [taskEditCheck, setTaskEditCheck] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const addTask = () => {
    if (task && !taskEditCheck) {
      setTodoList([...todoList, task]);
      setTask("");
    } else if (taskEditCheck) {
      let tempArray = [...todoList];
      tempArray[editIndex] = task;
      setTodoList(tempArray);
      setTaskEditCheck(false);
      setEditIndex(-1);
      setTask("");
    }
  };
  const editTask = (index, task) => {
    setTaskEditCheck(true);
    setEditIndex(index);
    setTask(task);
  };
  const deleteTask = (task) => {
    setTodoList(todoList.filter((item) => item !== task));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "green", fontWeight: "bold", fontSize: 20 }}>
        ToDo App
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <Pressable style={styles.addUpdateBtn} onPress={addTask}>
          <Text style={styles.inputContainerText}>
            {taskEditCheck ? "Update Task" : "Add Task"}
          </Text>
        </Pressable>
      </View>
      {/* <Demo /> */}

      <FlatList
        data={todoList}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            index={index}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        )}
      />
      {/* {todoList.map((item, i) => (
        <Text key={i}>{item}</Text>
      ))} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    marginTop: 50,
    padding: 50,
    gap: 10,
  },
  inputContainer: {
    gap: 5,
  },
  input: {
    borderWidth: 2,
    borderRadius: 7,
    height: 40,
    paddingLeft: 10,
    borderColor: "skyblue",
  },
  addUpdateBtn: {
    backgroundColor: "green",
    height: 40,
    width: "100%",
    borderRadius: 5,
  },
  inputContainerText: {
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  todoListItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemButtons: {
    flexDirection: "row",
    gap: 5,
  },
});
export default App;
