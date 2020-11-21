/* eslint-disable no-extend-native */
const extendError = () => {
  if (!('toJSON' in Error.prototype)) {
    Object.defineProperty(Error.prototype, 'toJSON', {
      value() {
        const alt = {};
        // eslint-disable-next-line func-names
        Object.getOwnPropertyNames(this).forEach(function (key) {
          alt[key] = this[key];
        }, this);

        return alt;
      },
      configurable: true,
      writable: true,
    });
  }
};

export default extendError;
