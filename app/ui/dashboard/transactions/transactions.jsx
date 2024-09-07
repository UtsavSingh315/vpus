import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hospitals</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td></td>
            <td>Date</td>
            <td>beds</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="https://images.unsplash.com/photo-1509416277592-079634a2b868?q=80&w=18…"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Aarnav Anand
              </div>
            </td>
            <td>
            </td>
            <td>14.02.2024</td>
            <td>241</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                test
              </div>
            </td>
            <td>
            </td>
            <td>14.02.2024</td>
            <td>210</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                srv
              </div>
            </td>
            <td>
              
            </td>
            <td>14.02.2024</td>
            <td>112</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
