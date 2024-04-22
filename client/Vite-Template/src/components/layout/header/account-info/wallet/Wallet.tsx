import { AccountButton } from '../account-button';
import styles from './Wallet.module.scss';

type Props = {
  balance: {
    value: string;
    unit: string;
  } | undefined;//Account['balance'];
  address: string;
  name: string | undefined;
  onClick: () => void;
};

function Wallet({ balance, address, name, onClick }: Props) {
  return (
    <div className={styles.wallet}>
      <AccountButton address={address} name={name} onClick={onClick} />
    </div>
  );
}

export { Wallet };
