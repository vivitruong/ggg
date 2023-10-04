import { useState } from "react";
import PlayListForm from "../components/PlayListForm";

const CreatePlayList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const playListToBeCreated = {
      name,
      description,
    };

    console.log(playListToBeCreated);

    setDescription("");
    setName("");
  };

  return (
    <div>
      CreatePlayList
      <PlayListForm
        submitHandler={submitHandler}
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
        btnText={"Create PlayList"}
      />
    </div>
  );
};

export default CreatePlayList;
