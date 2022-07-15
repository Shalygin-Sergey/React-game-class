import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Какое число?',
      userNumber: '',
      randomNumber: Math.round(Math.random() * this.props.max - this.props.min + this.props.min),
      inputValue: '',
      btnReload: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.randomNumber);
    // изменить инпут на пустой после нажатия кнопки
    this.setState({
      inputValue: '',
    });

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber}`,
        btnReload: true,
      };
    });
  };

  handleClear = (e) => {
    e.preventDefault();

    this.setState({
      result: 'Какое число?',
      btnReload: false,
      randomNumber: Math.floor(Math.random() * this.props.max - this.props.min + this.props.min),
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });

    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    const isShow = this.state.btnReload;

    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>
          <input
            className={style.input}
            type="number"
            id="user_number"
            onChange={this.handleChange}
            value={this.state.inputValue}
          />
          <button className={style.btn}>Угадать</button>
          <div>
            {isShow ? (
              <button
                onClick={this.handleClear}
                style={{
                  display: 'block',
                }}
                className={style.btn}>
                Еще разок
              </button>
            ) : (
              <button
                style={{
                  display: 'none',
                }}
                className={style.btn}>
                Еще разок
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
