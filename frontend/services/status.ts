// import { BASE_URL } from "../constants/config";

// export async function getStudentStatus(studentId: string) {
//   const res = await fetch(`${BASE_URL}/student-status/${studentId}`);
//   return res.json();
// }

// export async function submitDailyCheckin(studentId: string, quiz: number, focus: number) {
//   const res = await fetch(`${BASE_URL}/daily-checkin`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       student_id: studentId,
//       quiz_score: quiz,
//       focus_minutes: focus
//     }),
//   });
//   return res.json();
// }

// export async function markTaskComplete(studentId: string) {
//   const res = await fetch(`${BASE_URL}/mark-complete/${studentId}`, {
//     method: "POST",
//   });
//   return res.json();
// }













// import { BASE_URL } from "../constants/config";

// export async function getStudentStatus(studentId: string) {
//   const res = await fetch(`${BASE_URL}/students/status/${studentId}`);
//   return res.json();
// }

// export async function submitDailyCheckin(studentId: string, quiz: number, focus: number) {
//   const res = await fetch(`${BASE_URL}/students/daily-checkin`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       student_id: studentId,
//       quiz_score: quiz,
//       focus_minutes: focus
//     }),
//   });
//   return res.json();
// }

// export async function markTaskComplete(studentId: string) {
//   const res = await fetch(`${BASE_URL}/interventions/complete/${studentId}`, {
//     method: "POST",
//   });
//   return res.json();
// }














import { BASE_URL } from "../constants/config";

export async function getStudentStatus(studentId: string) {
  const res = await fetch(`${BASE_URL}/students/status/${studentId}`);
  return res.json();
}

export async function submitDailyCheckin(studentId: string, quiz: number, focus: number) {
  const res = await fetch(`${BASE_URL}/students/daily-checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: studentId,
      quiz_score: quiz,
      focus_minutes: focus
    }),
  });
  return res.json();
}

export async function markTaskComplete(studentId: string) {
  const res = await fetch(`${BASE_URL}/interventions/complete/${studentId}`, {
    method: "POST",
  });
  return res.json();
}
