import { useSelector } from "react-redux";
import EditAdmin from "./EditAdmin";
import EditCustomer from "./EditCustomer";
function EditAccount() {
  const { edit } = useSelector((state) => state.edit);
  return (
    <div className="EditAccount">
      <h5>Edit Account</h5>
      <div className="edit_content">
        <form action="">
          {edit.type === "admin" ? (
            <EditAdmin edit={edit} />
          ) : (
            <EditCustomer edit={edit} />
          )}
        </form>
      </div>
    </div>
  );
}

export default EditAccount;
