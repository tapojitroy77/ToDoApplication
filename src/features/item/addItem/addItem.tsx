
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
        <h3>Add Item</h3>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.divInput}>
            <label htmlFor="name">Name</label>
            <input id="name" {...register("name", { required: true })}/>
            {errors.name && <p className={styles.error}>Please enter an Item Name</p>}
        </div>
        <div>
          <button type="submit" className={styles.btn}>Submit</button>
          <button onClick={() => props.onClose()} className={styles.btn}>Close</button>
        </div>
        </form>
        </div>
    </div>
    
  );
};
export default AddItem;