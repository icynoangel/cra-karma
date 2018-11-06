import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('<App />', function() {
  this.getComponent = () => {
    return <App />;
  }

  beforeEach(() => {
    this.sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  it('should render <App /> header element', () => {
    const wrapper = shallow(this.getComponent());
    const header = wrapper.find('header');
    expect(header.length).to.equal(1);
  });

  it('should render <App /> img', () => {
    const wrapper = shallow(this.getComponent());
    const img = wrapper.find('img');
    expect(img.length).to.equal(1);
  });

  it('should render <App /> paragraph text', () => {
    const wrapper = shallow(this.getComponent());
    const p = wrapper.find('p');
    expect(p.text()).to.equal('Edit src/App.js and save to reload.');
  });

  it('should call onClick handler', () => {
    const clickSpy = this.sandbox.spy(App.prototype, 'onClick');
    const wrapper = shallow(this.getComponent());

    wrapper.simulate('click');

    expect(clickSpy.calledOnce).to.equal(true);
  });

});
