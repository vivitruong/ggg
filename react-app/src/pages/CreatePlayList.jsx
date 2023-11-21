import { useState } from "react";
import PlayListForm from "../components/PlayListForm";
import { createNewPLaylist } from "../store/playlist";
import { useDispatch } from "react-redux";
import ActionBar from "../components/ActionBar";
import Divider from '../components/Divider'
const CreatePlayList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const playListToBeCreated = {
      name,
      description,
    };

    // console.log(playListToBeCreated);
    dispatch(createNewPLaylist(playListToBeCreated));

    setDescription("");
    setName("");
  };

  return (
    <>

    <div>
    <Divider />
      <ActionBar />
      <Divider />

       <h4 style={{padding:'10px'}}>Time to create your new playlist! 🎶 Let's rock 'n' roll! 🕺💃</h4>
       <Divider />
      <PlayListForm
        submitHandler={submitHandler}
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
        btnText={"Create PlayList"}
      />
    </div>
    </>
  );
};

export default CreatePlayList;
