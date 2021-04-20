import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import getLoggedUser from '../utils';
import styles from '../styles/water-accountant.module.scss';
import MenuComponent from '../components/common/MenuComponent';
import RecipientsComponent from '../components/pagesComponents/RecipientsComponent';
import ProgressBarComponent from '../components/pagesComponents/ProgressBarComponent';

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { loggedUser: getLoggedUser(context) }, // will be passed to the page component as props
});

export default function WaterAccountant({ loggedUser }): JSX.Element {
  const router = useRouter();
  if (process.browser && !loggedUser) {
    router.push('/');
    // in order to this early return work, take a look at the @TODO
    return (<p>404</p>);
  }
  if (process.browser && loggedUser && !loggedUser.name) {
    router.push('/basic-info');
    // in order to this early return work, take a look at the @TODO
    return (<p>404</p>);
  }

  /*
  @TODO
  -> CHANGE THE COOKIES DATA TO FIREBASE OR REAL DB ASAP!!!...
  -> ...in order to fix the stuck progressBar, the 'did not mach Server x Browser' issue.
   */

  const [dailyProgress] = useState(loggedUser);

  return (
    <section className={`wrapper wrapper--fullHeight wrapper--greyBg ${styles.waterAccountantContainer}`}>
      <MenuComponent />

      <div className={styles.infoBox}>
        {loggedUser && (<ProgressBarComponent />)}

        {loggedUser && (
          <div className={styles.counter}>
            <span className={styles.counter__greeter}>
              Hi,
              {` ${loggedUser && loggedUser.name}`}
              ! Today, you drank:
            </span>
            <span className={styles.counter__numbers}>
              <span className={styles.counter__drank}>
                {dailyProgress.drank || '0'}
                ml
              </span>
              {' '}
              / 3800ml
            </span>
          </div>
        )}

      </div>

      <RecipientsComponent />
    </section>
  );
}
