import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.render = render;

global.sinon = sinon;

global.expect = chai.expect;

var context = require.context('./src', true, /\.test\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);