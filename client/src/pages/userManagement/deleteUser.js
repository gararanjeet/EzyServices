import axios from "../../components/axios";
const deleteUser = (id) => {
  axios.delete("/ServiceProvider/delete", { data: { id } });
  return true;
};

const onDelete = (cells) => {
  const user_id = cells[0].value;
  if (deleteUser(user_id)) {
    alert("Successfully Deleted");
  } else {
    alert("Unable to Delete");
  }
  window.location.reload();
};

export { onDelete };
