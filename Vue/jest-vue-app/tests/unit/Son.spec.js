import Son from '@/components/Son'
import { mount } from '@vue/test-utils'

describe('Son.vue', () => {
    it('测试name、age属性有没有正确显示', () => {
        const name = 'cxj';
        const age = 18;
        const wrapper = mount(Son);
        wrapper.setProps({name, age});
        expect(wrapper.findAll('h4').at(0).text()).toContain(name);
        expect(wrapper.findAll('h4').at(1).text()).toContain(age);
    })

    it('测试点击button后有没有正确执行传递的函数属性', () => {
        const wrapper = mount(Son);
        // const spy = sinon.spy();
        // wrapper.setProps({ fn: spy });
        // wrapper.findAll('button').at(1).trigger('click');
        // expect(spy.called).to.be.true;
        const mockFn = jest.fn();
        wrapper.setProps({ fn: mockFn });
        wrapper.findAll('button').at(1).trigger('click');
        expect(mockFn.mock.calls.length).toBe(2);
    })
})