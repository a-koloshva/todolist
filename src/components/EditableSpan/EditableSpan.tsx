import React, { ChangeEvent, useState } from 'react';

type EditableSpanProps = {
  oldTitle: string;
  callback: (newTitle: string) => void;
};

export const EditableSpan = (props: EditableSpanProps) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(props.oldTitle);

  const editFoo = () => {
    setEdit(!edit);
    if (edit) {
      addTask();
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const addTask = () => {
    props.callback(newTitle);
  };

  return edit ? (
    <input value={newTitle} onBlur={editFoo} autoFocus onChange={onChangeHandler} />
  ) : (
    <span onDoubleClick={editFoo}>{props.oldTitle}</span>
  );
};
