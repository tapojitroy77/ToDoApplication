
import { useForm } from "react-hook-form";
import styles from './addItem.module.css';
type addItemPops = {
  onClose: () => void;
  onSave: (itemName: string) => void;
}

export type addItemData = {
  name: string
}

export const AddItem = (props: addItemPops) => {
  const { register, handleSubmit, formState: { errors } } = useForm<addItemData>();
  const onSubmit = (data: addItemData) => {
    props.onSave(data.name);
  }
  return (
    <div className={styles.popup}>
        <div className={styles.popup_inner}>
        <h1>Add Item</h1>
        <button onClick={() => props.onClose()}>close me</button>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" id="name" {...register("name", { required: true })}/>
            {errors.name && <p className="error">Please enter an Item Name</p>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        </form>
        </div>
    </div>
    
  );
};
export default AddItem;