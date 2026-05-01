import "blastcss";
import { autoInit } from "blastcss/js";

autoInit();

export function BlastCard() {
  return (
    <article className="b-card">
      <div className="b-card-body b-stack">
        <span className="b-badge">React</span>
        <h2>BlastCSS component</h2>
        <button className="b-btn">Save</button>
      </div>
    </article>
  );
}
