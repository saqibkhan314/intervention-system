// import { db } from "../config/db.js";
// import { triggerN8N } from "../services/n8nService.js";

// export const dailyCheckin = async (req, res) => {
//   const { student_id, quiz_score, focus_minutes } = req.body;

//   // Add log
//   await db.query(
//     "INSERT INTO daily_logs (student_id, quiz_score, focus_minutes) VALUES (?, ?, ?)",
//     [student_id, quiz_score, focus_minutes]
//   );

//   // Success condition
//   if (quiz_score > 7 && focus_minutes > 60) {
//     await db.query("UPDATE students SET status='Normal' WHERE id=?", [student_id]);
//     return res.json({ status: "On Track" });
//   }

//   // Failure → lock student
//   await db.query("UPDATE students SET status='Needs Intervention' WHERE id=?", [student_id]);

//   // Trigger n8n webhook
//   await triggerN8N({ student_id, quiz_score, focus_minutes });

//   return res.json({ status: "Pending Mentor Review" });
// };



// export const getStudentStatus = async (req, res) => {
//   const { id } = req.params;

//   const [data] = await db.query("SELECT * FROM students WHERE id=?", [id]);
//   const [task] = await db.query(
//     "SELECT * FROM interventions WHERE student_id=? AND is_completed=FALSE ORDER BY id DESC LIMIT 1",
//     [id]
//   );

//   res.json({
//     status: data[0].status,
//     task: task?.length ? task[0].task : null
//   });
// };












import { db } from '../config/db.js';
import { triggerN8N } from '../services/n8nService.js';

export async function dailyCheckin(req,res){
  try{
    const { student_id, quiz_score, focus_minutes } = req.body;
    if (!student_id) return res.status(400).json({error:'student_id required'});

    console.log('student_id ===>>>',student_id);

    console.log('quiz_score===>>>', quiz_score);
    console.log('focus_minutes===>>>', focus_minutes);
    
    

    // insert log
    await db.query(
      'INSERT INTO daily_logs (student_id, quiz_score, focus_minutes) VALUES (?, ?, ?)',
      [student_id, quiz_score, focus_minutes]
    );

    // check logic gate
    if (quiz_score > 7 && focus_minutes > 60){
      await db.query('UPDATE students SET status = ? WHERE id = ?', ['Normal', student_id]);
      return res.json({ status: 'On Track' });
    }

    // failure -> mark Needs Intervention
    await db.query('UPDATE students SET status = ? WHERE id = ?', ['Needs Intervention', student_id]);

    // fetch student row for context
    const [rows] = await db.query('SELECT id, name FROM students WHERE id = ?', [student_id]);
    const student = rows[0] || { id: student_id, name: null };

    // trigger n8n webhook
    await triggerN8N({ student_id, quiz_score, focus_minutes, student });

    return res.json({ status: 'Pending Mentor Review' });
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
}

export async function getStudentStatus(req,res){
  try{
    const id = req.params.id;
    const [students] = await db.query('SELECT id, name, status FROM students WHERE id = ?', [id]);
    const s = students[0];
    if(!s) return res.status(404).json({error:'student not found'});

    const [interv] = await db.query('SELECT * FROM interventions WHERE student_id = ? AND is_completed = FALSE ORDER BY id DESC LIMIT 1', [id]);
    const task = interv.length ? interv[0].task : null;

    return res.json({ status: s.status, task });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
}
