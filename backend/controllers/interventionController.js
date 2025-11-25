// export const assignIntervention = async (req, res) => {
//   const { student_id, task } = req.body;

//   await db.query(
//     "INSERT INTO interventions (student_id, task) VALUES (?, ?)",
//     [student_id, task]
//   );

//   await db.query("UPDATE students SET status='Remedial' WHERE id=?", [student_id]);

//   res.json({ message: "Intervention Assigned" });
// };


// export const markTaskComplete = async (req, res) => {
//   const { id } = req.params;

//   await db.query(
//     "UPDATE interventions SET is_completed=TRUE WHERE student_id=?",
//     [id]
//   );

//   await db.query("UPDATE students SET status='Normal' WHERE id=?", [id]);

//   res.json({ message: "Task Completed" });
// };


















import { db } from '../config/db.js';

export async function assignIntervention(req,res){
  try{
    const { student_id, task } = req.body;
    if (!student_id || !task) return res.status(400).json({ error: 'student_id and task required' });

    await db.query('INSERT INTO interventions (student_id, task) VALUES (?, ?)', [student_id, task]);
    await db.query('UPDATE students SET status = ? WHERE id = ?', ['Remedial', student_id]);

    return res.json({ ok: true });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
}

export async function markTaskComplete(req,res){
  try{
    const student_id = req.params.id;
    // mark latest incomplete intervention complete
    await db.query('UPDATE interventions SET is_completed = TRUE, completed_at = NOW() WHERE student_id = ? AND is_completed = FALSE', [student_id]);
    await db.query('UPDATE students SET status = ? WHERE id = ?', ['Normal', student_id]);
    return res.json({ ok: true });
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
}
