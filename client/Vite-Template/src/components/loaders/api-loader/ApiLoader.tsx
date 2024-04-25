import styles from './ApiLoader.module.css';

function ApiLoader() {
  return (
    <div className='absolute bg-black w-full h-full top-0 left-0 flex items-center justify-center'><div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.content__container}>
        <p className={styles.content__container__text}>
          Hello
        </p>
      
        <ul className={styles.content__container__list}>
          <li className={styles.content__container__list__item}>runner !</li>
          <li className={styles.content__container__list__item}>world !</li>
          <li className={styles.content__container__list__item}>users !</li>
          <li className={styles.content__container__list__item}>uiverse</li>
        </ul>
      </div>
    </div>
  </div>
    </div>
  )
}

export { ApiLoader };
