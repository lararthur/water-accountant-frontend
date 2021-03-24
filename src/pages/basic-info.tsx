import React from 'react';
import styles from '../styles/basic-info.module.scss';

export default function basicInfoPage(): JSX.Element {
  return (
    <section className={`${styles.basicInfoContainer} wrapper wrapper--fullHeight wrapper--greyBg`}>
      <p className="title">Hello! You’ll be experiencing the Water Accountant. You must insert your name, weight and language.</p>

      <form className="form">
        <label
          htmlFor="name"
          className="label"
        >
          <span className="label__text">Name</span>
          <input
            type="text"
            name="name"
            id="name"
            className="input"
          />
        </label>

        <label
          htmlFor="weight"
          className="label"
        >
          <span className="label__text">Weight</span>
          <input
            type="number"
            name="weight"
            id="weight"
            className="input"
          />
        </label>

        <label
          htmlFor="language"
          className="label"
        >
          <span className="label__text">Language</span>
          <input
            type="text"
            name="language"
            id="language"
            className="input"
          />
        </label>

        <input
          className="button"
          type="button"
          value="Continue"
        />

      </form>
    </section>
  );
}
