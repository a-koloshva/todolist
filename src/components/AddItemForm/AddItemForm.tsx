import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBox from '@mui/icons-material/AddBox';

type AddItemFormProps = {
  callback: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormProps) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItem = () => {
    if (title.trim() !== '') {
      props.callback(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addItem();
    }
  };

  return (
    <div>
      {/* <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      /> */}
      <TextField
        variant="outlined"
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        label="Title"
        helperText={error}
      />
      {/* <button onClick={addTask}>+</button> */}
      <IconButton
        color="primary"
        onClick={addItem}
        style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}>
        <AddBox />
      </IconButton>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
};
