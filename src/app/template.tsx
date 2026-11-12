/**
 * Re-mounts on every navigation, so its CSS entrance animation replays as a quiet page transition.
 * Pure CSS: content is visible even before (or without) JavaScript.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
