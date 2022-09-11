import Count from '@/components/Count'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
// 防止污染Vue
let localVue = createLocalVue();
localVue.use(Vuex)

describe('Count.vue', () => {
    let state, 
        store, 
        getters,
        mutations,
        actions;
    // 在每一个测试执行之前会执行一次beforeEach
    beforeEach(() => {
        state = { count: 1 };
        getters = {
            doubleCount: () => state.count * 2,
        }
        mutations = {
            // mock一个函数
            changeCount: jest.fn()
        },
        actions = {
            changeCount: jest.fn()
        }
        store = new Vuex.Store({ 
            state, 
            getters,
            mutations,
            actions
        });
    })
    it('state', () => {
        const wrapper = mount(Count, { localVue, store });
        expect(wrapper.findAll('h4').at(0).text()).toContain(1)
    })

    it('getters', () => {
        const wrapper = mount(Count, { localVue, store });
        expect(wrapper.findAll('h4').at(1).text()).toContain(getters.doubleCount())
    })

    it('mutations', () => {
        const wrapper = mount(Count, { localVue, store });
        wrapper.findAll('button').at(0).trigger('click');
        // mock的函数是否被调用过一次
        // expect(mutations.changeCount.mock.calls.length).toBe(1);
        // 或
        // mock的函数是否至少被调用一次
        expect(mutations.changeCount).toHaveBeenCalled();
    })

    it('actions', () => {
        const wrapper = mount(Count, { localVue, store });
        wrapper.findAll('button').at(1).trigger('click');
        expect(actions.changeCount).toHaveBeenCalled();
    })
})