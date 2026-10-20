import { rolesNote, teamRoles, trainerRoles } from "../content";

export default function Roles() {
  return (
    <>
      <h3>Trainers</h3>
      <div className="roles">
        {trainerRoles.map((r) => (
          <div className="role" key={r.name}>
            <h3>{r.name}</h3>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <h3>In each team</h3>
      <div className="chips">
        {teamRoles.map(([role, what]) => (
          <span className="chip" key={role}><b>{role}</b> {what}</span>
        ))}
      </div>
      <p className="note">{rolesNote}</p>
    </>
  );
}
