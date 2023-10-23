"use strict";

var _createRepRev = _interopRequireDefault(require("./createRepRev.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('createRepRev', () => {
  it('creates a RepRev', () => {
    const replace = () => {};
    const revive = () => {};
    const testee = (0, _createRepRev.default)(replace, revive);
    expect(testee).toBeTruthy();
  });
});