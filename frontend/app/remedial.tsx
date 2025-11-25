import { View, Text, Button } from "react-native";
import { markTaskComplete, getStudentStatus } from "../services/status";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Remedial() {
  const router = useRouter();
  const studentId = "123";
  const [task, setTask] = useState("");

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    const data = await getStudentStatus(studentId);
    setTask(data.task || "No task available");
  }

  async function handleComplete() {
    await markTaskComplete(studentId);
    router.push("/");
  }

  return (
    <View style={{ padding: 40 }}>
      <Text style={{ fontSize: 24 }}>Remedial Task</Text>
      <Text style={{ marginVertical: 20 }}>{task}</Text>
      <Button title="Mark Complete" onPress={handleComplete} />
    </View>
  );
}
