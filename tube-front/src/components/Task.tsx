interface TaskProps {
  task: {
    id?: string;
    title?: string;
    state?: string;
    updatedAt?: Date;
  };
  onArchiveTask: Function;
  onPinTask?: Function;
}

export default function Task({
  task: { id, title, state, updatedAt },
  onArchiveTask,
  onPinTask,
}: TaskProps) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          disabled={true}
          defaultChecked={state === "TASK_ARCHIVED"}
          name="clicked"
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          id={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
        />
      </label>
      <div className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
        />
      </div>

      <div className="actions" onClick={(event) => event.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={onPinTask !== undefined ? () => onPinTask(id) : undefined}
          >
            <span
              className={`icon-star`}
              id={`pinTask-${id}`}
              aria-label={`pinTask-${id}`}
            />
          </a>
        )}
      </div>
    </div>
  );
}
