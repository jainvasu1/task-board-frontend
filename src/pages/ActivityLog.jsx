import { useBoard } from "../context/BoardContext";

function getRelativeTime(timestamp) {
  if (!timestamp) return "";   

  const now = new Date();
  const past = new Date(timestamp);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default function ActivityLog() {
  const { state } = useBoard();

  // 👇 Remove invalid/empty logs
  const validLogs = state.activityLog.filter(
    (log) => log && log.message && log.time
  );

  return (
    <div className="activity-page">
      <h2 className="activity-title">Activity Log</h2>

      {validLogs.length === 0 && (
        <p className="no-activity">No activity yet</p>
      )}

      <div className="activity-list">
        {validLogs.map((log, index) => (
          <div key={index} className={`activity-item ${log.type}`}>
            <span>{log.message}</span>
            <small className="activity-time">
              🕒 {getRelativeTime(log.time)}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
