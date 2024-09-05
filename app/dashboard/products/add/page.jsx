import { addProduct } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

const AddProductPage = () => {
  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <input type="text" placeholder="Department" name="Department" required />
        <input type="text" placeholder="Price" name="price" required />
        <input type="number" placeholder="Units" name="Units" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;
