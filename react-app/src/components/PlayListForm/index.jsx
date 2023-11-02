import Button from "../Button";
import InputField from "../InputField";
import * as userSongActions from '../../store/userSong'

const PlayListForm = ({
  submitHandler,
  name,
  description,
  setName,
  setDescription,
  btnText,
  userSongActions
}) => {
  return (
    <div>
      <form action="" onSubmit={submitHandler} className="form">
        <InputField
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          placeholder="Give this playlist a name..."
        />
        <InputField
          className="input"
          required
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          type="text"
          placeholder="Description...."
        />

        <Button iconOnly>{btnText}</Button>
      </form>
    </div>
  );
};

export default PlayListForm;
