// import React, { useState, useEffect } from "react";
// import { View, Text, Button, TextInput } from "react-native";
// import { useRouter } from "expo-router";
// import { submitDailyCheckin, getStudentStatus } from "../services/status";

// export default function HomeScreen() {
//   const router = useRouter();
//   const [quiz, setQuiz] = useState("");
//   const [focus, setFocus] = useState("");

//   const studentId = "123";

//   useEffect(() => {
//     checkStatus();
//   }, []);

//   async function checkStatus() {
//     const data = await getStudentStatus(studentId);

//     if (data.status === "Needs Intervention") router.push("/locked");
//     if (data.status === "Remedial") router.push("/remedial");
//   }

//   async function handleSubmit() {
//     const data = await submitDailyCheckin(studentId, Number(quiz), Number(focus));

//     if (data.status === "Pending Mentor Review") router.push("/locked");
//     else alert("Status: On Track!");
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 26 }}>Daily Check-In</Text>

//       <TextInput
//         placeholder="Quiz Score"
//         value={quiz}
//         onChangeText={setQuiz}
//         keyboardType="numeric"
//         style={{ borderWidth: 1, marginTop: 20, padding: 8 }}
//       />

//       <TextInput
//         placeholder="Focus Minutes"
//         value={focus}
//         onChangeText={setFocus}
//         keyboardType="numeric"
//         style={{ borderWidth: 1, marginTop: 20, padding: 8 }}
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// }
















import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { submitDailyCheckin, getStudentStatus } from "../services/status";

export default function Index() {
  const router = useRouter();
  const [quiz, setQuiz] = useState("");
  const [focus, setFocus] = useState("");

  const studentId = "123";

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    const data = await getStudentStatus(studentId);

    if (data.status === "Needs Intervention") router.push("/locked");
    if (data.status === "Remedial") router.push("/remedial");
  }

  async function handleSubmit() {
    const data = await submitDailyCheckin(studentId, Number(quiz), Number(focus));

    if (data.status === "Pending Mentor Review") router.push("/locked");
    else alert("Status: On Track!");
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26 }}>Daily Check-In</Text>

      <TextInput
        placeholder="Quiz Score"
        value={quiz}
        onChangeText={setQuiz}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginTop: 20, padding: 8 }}
      />

      <TextInput
        placeholder="Focus Minutes"
        value={focus}
        onChangeText={setFocus}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginTop: 20, padding: 8 }}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

