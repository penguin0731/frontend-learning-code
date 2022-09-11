import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import config from '@/store'
import { cloneDeep } from 'lodash'

describe("vuex", () => {
    
  it('mutations', () => {
    let localVue = createLocalVue();
    localVue.use(Vuex);
    // 为了不让各个测试影响到对方，将store的配置对象克隆再生成store
    const store = new Vuex.Store(cloneDeep(config));
    expect(store.state.count).toBe(1);
    store.commit('changeCount', 10);
    expect(store.state.count).toBe(11);
  })

  it('actions', () => {
    let localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(cloneDeep(config));
    expect(store.state.count).toBe(1);
    // 模拟定时器
    jest.useFakeTimers();
    store.dispatch('changeCount', 10);
    // ‘快进’时间，执行定时器的回调
    jest.runAllTimers();
  })
});
