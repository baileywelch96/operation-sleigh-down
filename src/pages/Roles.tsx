import { teamIntro, teamRoles, trainerRoles } from "../content";

export default function Roles() {
  return (
    <>
      <div className="roles">
        {trainerRoles.map((r) => (
          <div className="role" key={r.name}>
            <span className="tag">{r.tag}</span>
            <h3>{r.name}</h3>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <h3>Member teams</h3>
      <p className="prose">{teamIntro}</p>
      <div className="chips">
        {teamRoles.map(([role, what]) => (
          <span className="chip" key={role}><b>{role}</b> {what}</span>
        ))}
      </div>
    </>
  );
}
