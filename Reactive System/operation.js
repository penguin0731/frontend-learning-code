// 依赖收集的操作类型
export const TrackTypeMap = {
  GET: 'get', // 读取属性
  HAS: 'has', // 判断属性是否存在
  ITERATE: 'iterate' // 迭代
}

// 派发更新的操作类型
export const TriggerTypeMap = {
  SET: 'set', // 修改属性
  ADD: 'add', // 添加属性
  DELETE: 'delete' // 删除属性
}